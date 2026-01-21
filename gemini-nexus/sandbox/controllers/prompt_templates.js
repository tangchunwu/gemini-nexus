// sandbox/controllers/prompt_templates.js

/**
 * Prompt Templates Manager - Manage and quickly access saved prompt templates
 */
export class PromptTemplatesController {
       constructor(callbacks) {
              this.callbacks = callbacks || {};
              this.templates = [];
              this.isOpen = false;

              this.elements = {};
              this.bindElements();
              this.bindEvents();
              this.loadTemplates();
       }

       bindElements() {
              this.elements = {
                     btn: document.getElementById('prompt-templates-btn'),
                     dropdown: document.getElementById('prompt-templates-dropdown'),
                     list: document.getElementById('templates-list'),
                     addBtn: document.getElementById('add-template-btn')
              };
       }

       bindEvents() {
              const { btn, dropdown, addBtn } = this.elements;

              // Toggle dropdown
              if (btn) {
                     btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.toggle();
                     });
              }

              // Close on outside click
              document.addEventListener('click', (e) => {
                     if (this.isOpen && dropdown && !dropdown.contains(e.target) && e.target !== btn) {
                            this.close();
                     }
              });

              // Add new template
              if (addBtn) {
                     addBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.showEditModal();
                     });
              }
       }

       async loadTemplates() {
              try {
                     const result = await new Promise(resolve => {
                            window.parent.postMessage({ action: 'GET_PROMPT_TEMPLATES' }, '*');
                            // Listen for response
                            const handler = (event) => {
                                   if (event.data.action === 'RESTORE_PROMPT_TEMPLATES') {
                                          window.removeEventListener('message', handler);
                                          resolve(event.data.payload || []);
                                   }
                            };
                            window.addEventListener('message', handler);
                            // Timeout fallback
                            setTimeout(() => resolve([]), 1000);
                     });

                     this.templates = result;
                     this.render();
              } catch (e) {
                     console.warn('Failed to load prompt templates:', e);
                     this.templates = [];
                     this.render();
              }
       }

       saveTemplates() {
              window.parent.postMessage({
                     action: 'SAVE_PROMPT_TEMPLATES',
                     payload: this.templates
              }, '*');
       }

       toggle() {
              if (this.isOpen) {
                     this.close();
              } else {
                     this.open();
              }
       }

       open() {
              const { btn, dropdown } = this.elements;
              if (dropdown) {
                     dropdown.style.display = 'block';
                     this.isOpen = true;
                     if (btn) btn.classList.add('active');
              }
       }

       close() {
              const { btn, dropdown } = this.elements;
              if (dropdown) {
                     dropdown.style.display = 'none';
                     this.isOpen = false;
                     if (btn) btn.classList.remove('active');
              }
       }

       render() {
              const { list } = this.elements;
              if (!list) return;

              if (this.templates.length === 0) {
                     list.innerHTML = `
                <div class="templates-empty">
                    <p>No saved prompts yet</p>
                    <p style="font-size: 12px; margin-top: 4px;">Click + to add your first template</p>
                </div>
            `;
                     return;
              }

              list.innerHTML = this.templates.map((t, index) => `
            <div class="template-item" data-index="${index}">
                <div class="template-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div class="template-item-content">
                    <div class="template-item-name">${this.escapeHtml(t.name)}</div>
                    <div class="template-item-preview">${this.escapeHtml(t.content.substring(0, 50))}${t.content.length > 50 ? '...' : ''}</div>
                </div>
                <div class="template-item-actions">
                    <button class="template-action-btn edit" data-action="edit" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                    <button class="template-action-btn delete" data-action="delete" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        `).join('');

              // Bind click events
              list.querySelectorAll('.template-item').forEach(item => {
                     item.addEventListener('click', (e) => {
                            const index = parseInt(item.dataset.index);
                            const action = e.target.closest('[data-action]')?.dataset.action;

                            if (action === 'edit') {
                                   e.stopPropagation();
                                   this.showEditModal(index);
                            } else if (action === 'delete') {
                                   e.stopPropagation();
                                   this.deleteTemplate(index);
                            } else {
                                   this.applyTemplate(index);
                            }
                     });
              });
       }

       applyTemplate(index) {
              const template = this.templates[index];
              if (template && this.callbacks.onApply) {
                     this.callbacks.onApply(template.content);
              }
              this.close();
       }

       showEditModal(index = null) {
              const isEdit = index !== null;
              const template = isEdit ? this.templates[index] : { name: '', content: '' };

              const modal = document.createElement('div');
              modal.className = 'template-edit-modal';
              modal.innerHTML = `
            <div class="template-edit-content">
                <div class="template-edit-title">${isEdit ? 'Edit Prompt' : 'New Prompt'}</div>
                <div class="template-edit-field">
                    <label>Name</label>
                    <input type="text" id="template-name-input" value="${this.escapeHtml(template.name)}" placeholder="e.g. Translate to English">
                </div>
                <div class="template-edit-field">
                    <label>Prompt Content</label>
                    <textarea id="template-content-input" placeholder="Enter your prompt...">${this.escapeHtml(template.content)}</textarea>
                </div>
                <div class="template-edit-actions">
                    <button class="template-cancel-btn">Cancel</button>
                    <button class="template-save-btn">Save</button>
                </div>
            </div>
        `;

              document.body.appendChild(modal);

              // Focus name input
              setTimeout(() => modal.querySelector('#template-name-input')?.focus(), 100);

              // Cancel
              modal.querySelector('.template-cancel-btn').addEventListener('click', () => {
                     modal.remove();
              });

              // Click outside to close
              modal.addEventListener('click', (e) => {
                     if (e.target === modal) modal.remove();
              });

              // Save
              modal.querySelector('.template-save-btn').addEventListener('click', () => {
                     const name = modal.querySelector('#template-name-input').value.trim();
                     const content = modal.querySelector('#template-content-input').value.trim();

                     if (!name || !content) {
                            alert('Please fill in both name and content');
                            return;
                     }

                     if (isEdit) {
                            this.templates[index] = { name, content };
                     } else {
                            this.templates.push({ name, content });
                     }

                     this.saveTemplates();
                     this.render();
                     modal.remove();
              });
       }

       deleteTemplate(index) {
              if (confirm('Delete this prompt template?')) {
                     this.templates.splice(index, 1);
                     this.saveTemplates();
                     this.render();
              }
       }

       escapeHtml(str) {
              const div = document.createElement('div');
              div.textContent = str;
              return div.innerHTML;
       }
}
