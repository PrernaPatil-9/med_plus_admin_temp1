// Preview Module - Generates live preview
const Preview = {
    // Generate preview HTML from current data
    generate(data) {
        const theme = data.theme;
        const header = data.header;
        const footer = data.footer;
        const pages = data.pages;

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: ${theme.background};
                    color: ${theme.text};
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }
                .preview-card {
                    background: ${theme.cardBg};
                    border: 1px solid ${theme.border};
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    box-shadow: ${theme.shadow};
                    margin-bottom: 1.5rem;
                }
                .text-primary { color: ${theme.primary}; }
                .bg-primary { background: ${theme.primary}; }
                .btn {
                    background: ${theme.buttonBg};
                    color: ${theme.buttonText};
                    padding: 0.6rem 1.8rem;
                    border-radius: 2rem;
                    border: none;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .btn:hover { background: ${theme.hoverBg}; }
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }
                .card {
                    background: ${theme.cardBg};
                    border: 1px solid ${theme.border};
                    border-radius: 1rem;
                    padding: 1.5rem;
                    box-shadow: ${theme.shadow};
                }
                .badge {
                    background: ${theme.accent};
                    color: white;
                    padding: 0.2rem 0.8rem;
                    border-radius: 2rem;
                    font-size: 0.7rem;
                    font-weight: 500;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="preview-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 class="text-primary" style="font-size: 1.5rem; font-weight: 700;">${header.logoText}</h2>
                        <nav style="display: flex; gap: 1.5rem;">
                            ${header.menu.map(item => `<a href="#" style="color: ${theme.text}; text-decoration: none;">${item}</a>`).join('')}
                        </nav>
                        <button class="btn">${header.cta}</button>
                    </div>
                </div>

                <!-- Pages -->
                <div class="preview-card">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Pages</h3>
                    <div class="grid">
                        ${pages.map(page => `
                            <div class="card">
                                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">${Utils.capitalize(page)}</h4>
                                <p style="color: #64748b; font-size: 0.875rem;">
                                    ${data.sections[page]?.length || 0} sections
                                </p>
                                <span class="badge">Active</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Theme Info -->
                <div class="preview-card">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Theme Settings</h3>
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                        <div><span style="font-weight: 500;">Primary:</span> <span style="color: ${theme.primary};">${theme.primary}</span></div>
                        <div><span style="font-weight: 500;">Accent:</span> <span style="color: ${theme.accent};">${theme.accent}</span></div>
                        <div><span style="font-weight: 500;">Background:</span> ${theme.background}</div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="preview-card" style="text-align: center; color: #64748b; font-size: 0.875rem;">
                    <p>&copy; ${new Date().getFullYear()} ${footer.copyright}</p>
                    <p>${footer.contact.phone} · ${footer.contact.email}</p>
                    <p>${footer.contact.address}</p>
                </div>

                <div style="text-align: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid ${theme.border}; font-size: 0.75rem; color: #94a3b8;">
                    Preview generated from CMS data · ${new Date().toLocaleString()}
                </div>
            </div>
        </body>
        </html>
        `;
    },

    // Update preview iframe
    updatePreview(iframe, data) {
        if (iframe) {
            iframe.srcdoc = this.generate(data);
        }
    },

    // Get preview status element
    getStatusElement() {
        return document.getElementById('previewStatus');
    },

    // Update preview status
    updateStatus(message, isSuccess = true) {
        const status = this.getStatusElement();
        if (status) {
            const icon = isSuccess ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-rose-500';
            status.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
        }
    }
};