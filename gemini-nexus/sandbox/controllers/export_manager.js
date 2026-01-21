// sandbox/controllers/export_manager.js

/**
 * Handles exporting chat sessions to various formats
 */
export class ExportManager {
       constructor() {
       }

       /**
        * Export session to a file
        * @param {Object} session - The session object
        * @param {string} format - 'markdown' or 'json'
        */
       export(session, format) {
              if (!session) return;

              const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
              const filename = `chat-${timestamp}.${format === 'markdown' ? 'md' : 'json'}`;
              let content = '';
              let mimeType = 'text/plain';

              if (format === 'json') {
                     content = JSON.stringify(session, null, 2);
                     mimeType = 'application/json';
              } else {
                     content = this._convertToMarkdown(session);
                     mimeType = 'text/markdown';
              }

              this._download(content, filename, mimeType);
       }

       _convertToMarkdown(session) {
              let md = `# ${session.title || 'Untitled Chat'}\n\n`;
              md += `*Date: ${new Date(session.timestamp).toLocaleString()}*\n`;
              md += `*Model: ${session.model || 'Unknown'}*\n\n---\n\n`;

              session.messages.forEach(msg => {
                     const role = msg.role === 'user' ? 'User' : 'Gemini';
                     const icon = msg.role === 'user' ? '👤' : '🤖';

                     md += `### ${icon} ${role}\n\n`;

                     if (msg.image) {
                            md += `*[User uploaded an image]*\n\n`;
                     }

                     if (msg.thoughts) {
                            md += `<details><summary>Thought Process</summary>\n\n${msg.thoughts}\n\n</details>\n\n`;
                     }

                     md += `${msg.text}\n\n`;

                     if (msg.generatedImages && msg.generatedImages.length > 0) {
                            md += `*[Generated ${msg.generatedImages.length} images]*\n\n`;
                     }

                     md += `---\n\n`;
              });

              return md;
       }

       _download(content, filename, mimeType) {
              const blob = new Blob([content], { type: mimeType });
              const url = URL.createObjectURL(blob);

              const a = document.createElement('a');
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();

              setTimeout(() => {
                     document.body.removeChild(a);
                     URL.revokeObjectURL(url);
              }, 100);
       }
}
