// Theme Module - Manages global theme settings
const ThemeManager = {
    render(container, data) {
        const theme = data.theme;
        
        let html = `
            <div class="card-admin p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-bold text-lg">
                        <i class="fas fa-palette text-pink-600 mr-2"></i>Theme Manager
                    </h3>
                    <div class="flex gap-2">
                        <button onclick="ThemeManager.exportTheme()" class="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition">
                            <i class="fas fa-download mr-1"></i> Export
                        </button>
                        <button onclick="ThemeManager.importTheme()" class="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition">
                            <i class="fas fa-upload mr-1"></i> Import
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${this.renderColorGroup('Primary Colors', ['primary', 'secondary', 'accent'], theme)}
                    ${this.renderColorGroup('Text Colors', ['text', 'heading', 'background'], theme)}
                    ${this.renderColorGroup('UI Elements', ['cardBg', 'border', 'shadow'], theme)}
                    ${this.renderColorGroup('Buttons', ['buttonBg', 'buttonText', 'hoverBg'], theme)}
                    ${this.renderColorGroup('Gradients', ['gradientStart', 'gradientEnd'], theme)}
                </div>
                
                <div class="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h5 class="font-semibold text-gray-700 mb-3">Theme Preview</h5>
                    <div class="flex flex-wrap gap-4">
                        <div class="p-4 rounded-lg" style="background:${theme.primary}; color:${theme.buttonText}">
                            <span>Primary</span>
                        </div>
                        <div class="p-4 rounded-lg" style="background:${theme.secondary}; color:${theme.buttonText}">
                            <span>Secondary</span>
                        </div>
                        <div class="p-4 rounded-lg" style="background:${theme.accent}; color:${theme.buttonText}">
                            <span>Accent</span>
                        </div>
                        <div class="p-4 rounded-lg border" style="background:${theme.background}; color:${theme.text}">
                            <span>Background</span>
                        </div>
                        <div class="p-4 rounded-lg" style="background:${theme.buttonBg}; color:${theme.buttonText}">
                            <span>Button</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 text-xs text-gray-400 flex justify-between">
                    <span><i class="fas fa-info-circle mr-1"></i> Theme tokens are used as CSS variables</span>
                    <span>${Object.keys(theme).length} tokens configured</span>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    renderColorGroup(title, keys, theme) {
        let html = `
            <div class="border rounded-xl p-4 bg-gray-50">
                <h5 class="font-semibold text-gray-700 mb-3">${title}</h5>
                <div class="space-y-3">
        `;
        
        keys.forEach(key => {
            if (theme[key] !== undefined) {
                html += `
                    <div>
                        <label class="block text-xs font-medium text-gray-500 capitalize">${key.replace(/([A-Z])/g, ' $1')}</label>
                        <div class="flex items-center gap-2">
                            <input type="color" value="${theme[key]}" 
                                   onchange="ThemeManager.updateTheme('${key}', this.value)" 
                                   class="w-12 h-10 p-1 border rounded" />
                            <input type="text" value="${theme[key]}" 
                                   onchange="ThemeManager.updateTheme('${key}', this.value)" 
                                   class="flex-1 text-sm" />
                            <span class="text-xs text-gray-400 font-mono">${theme[key]}</span>
                        </div>
                    </div>
                `;
            }
        });
        
        html += `</div></div>`;
        return html;
    },
    
    updateTheme(key, value) {
        App.data.theme[key] = value;
        Storage.save(App.data);
    },
    
    exportTheme() {
        const theme = App.data.theme;
        const json = JSON.stringify(theme, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `theme-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },
    
    importTheme() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const theme = JSON.parse(event.target.result);
                    App.data.theme = { ...App.data.theme, ...theme };
                    Storage.save(App.data);
                    alert('Theme imported successfully!');
                    App.loadPage('theme');
                } catch (err) {
                    alert('Invalid theme file. Please check the JSON format.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
};