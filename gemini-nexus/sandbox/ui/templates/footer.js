
export const FooterTemplate = `
    <!-- FOOTER -->
    <div class="footer">
        <div id="status"></div>
        
        <div class="tools-container">
            <button id="tools-scroll-left" class="scroll-nav-btn left" aria-label="Scroll Left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            <div class="tools-row" id="tools-row">
                <button id="browser-control-btn" class="tool-btn" data-i18n-title="browserControlTooltip" title="Allow model to control browser">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                        <path d="m13 13 6 6"></path>
                    </svg>
                    <span data-i18n="browserControl">Control</span>
                </button>
                <button id="page-context-btn" class="tool-btn context-aware" data-i18n-title="pageContextTooltip" title="Toggle chat with page content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                    <span data-i18n="pageContext">Page</span>
                </button>
                <button id="quote-btn" class="tool-btn context-aware" data-i18n-title="quoteTooltip" title="Quote selected text from page">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                    </svg>
                    <span data-i18n="quote">Quote</span>
                </button>
                <button id="ocr-btn" class="tool-btn context-aware" data-i18n-title="ocrTooltip" title="Capture area and extract text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 7V4h3"></path>
                        <path d="M20 7V4h-3"></path>
                        <path d="M4 17v3h3"></path>
                        <path d="M20 17v3h-3"></path>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                    <span data-i18n="ocr">OCR</span>
                </button>
                <button id="screenshot-translate-btn" class="tool-btn context-aware" data-i18n-title="screenshotTranslateTooltip" title="Capture area and translate text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path>
                    </svg>
                    <span data-i18n="screenshotTranslate">Translate</span>
                </button>
                <button id="snip-btn" class="tool-btn context-aware" data-i18n-title="snipTooltip" title="Capture area to input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2v14a2 2 0 0 0 2 2h14"></path>
                        <path d="M18 22V8a2 2 0 0 0-2-2H2"></path>
                    </svg>
                    <span data-i18n="snip">Snip</span>
                </button>
            </div>

            <button id="tools-scroll-right" class="scroll-nav-btn right" aria-label="Scroll Right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>

        <div class="input-wrapper">
            <!-- Dynamic Image Preview Container -->
            <div id="image-preview" class="image-preview"></div>
            
            <!-- Prompt Templates Dropdown -->
            <div id="prompt-templates-dropdown" class="prompt-templates-dropdown" style="display: none;">
                <div class="templates-header">
                    <span data-i18n="myPrompts">My Prompts</span>
                    <button id="add-template-btn" class="add-template-btn" title="Add new template">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
                <div class="templates-list" id="templates-list">
                    <!-- Templates will be populated dynamically -->
                </div>
            </div>
            
            <div class="input-row">
                <label id="upload-btn" data-i18n-title="uploadImageTooltip" title="Upload File">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                    <input type="file" id="image-input" multiple accept="image/*, .pdf, .txt, .js, .py, .html, .css, .json, .csv, .md" style="display: none;">
                </label>
                <button id="prompt-templates-btn" class="prompt-templates-btn" data-i18n-title="promptTemplates" title="Prompt Templates">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                </button>
                <textarea id="prompt" data-i18n-placeholder="askPlaceholder" placeholder="Ask Gemini..." rows="1"></textarea>
                <button id="send" data-i18n-title="sendMessageTooltip" title="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    </div>
`;