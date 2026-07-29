// Settings Module - Global settings and configuration
const SettingsManager = {
    currentTab: 'general',
    
    render(container, data) {
        container.innerHTML = `
            <div class="card-admin p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-bold text-lg">
                        <i class="fas fa-cog text-pink-600 mr-2"></i>Settings
                    </h3>
                </div>
                
                <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    <button class="tab-btn ${this.currentTab === 'general' ? 'active' : ''}" onclick="SettingsManager.switchTab('general')">
                        <i class="fas fa-globe mr-1"></i> General
                    </button>
                    <button class="tab-btn ${this.currentTab === 'header' ? 'active' : ''}" onclick="SettingsManager.switchTab('header')">
                        <i class="fas fa-header mr-1"></i> Header
                    </button>
                    <button class="tab-btn ${this.currentTab === 'footer' ? 'active' : ''}" onclick="SettingsManager.switchTab('footer')">
                        <i class="fas fa-copyright mr-1"></i> Footer
                    </button>
                    <button class="tab-btn ${this.currentTab === 'responsive' ? 'active' : ''}" onclick="SettingsManager.switchTab('responsive')">
                        <i class="fas fa-mobile-alt mr-1"></i> Responsive
                    </button>
                    <button class="tab-btn ${this.currentTab === 'backup' ? 'active' : ''}" onclick="SettingsManager.switchTab('backup')">
                        <i class="fas fa-database mr-1"></i> Backup
                    </button>
                </div>
                
                <div id="settingsTabContent">
                    ${this.renderTabContent(this.currentTab, data)}
                </div>
            </div>
        `;
    },
    
    renderTabContent(tab, data) {
        switch(tab) {
            case 'general': return this.renderGeneral(data);
            case 'header': return this.renderHeader(data);
            case 'footer': return this.renderFooter(data);
            case 'responsive': return this.renderResponsive(data);
            case 'backup': return this.renderBackup(data);
            default: return '<p class="text-gray-500">Select a tab</p>';
        }
    },
    
    renderGeneral(data) {
        const global = data.global;
        return `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-globe text-blue-600 mr-2"></i>General Settings
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Site Name</label>
                        <input type="text" value="${global.siteName || ''}" 
                               onchange="SettingsManager.updateGlobal('siteName', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Favicon URL</label>
                        <input type="text" value="${global.favicon || ''}" 
                               placeholder="/favicon.ico" 
                               onchange="SettingsManager.updateGlobal('favicon', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" value="${global.email || ''}" 
                               onchange="SettingsManager.updateGlobal('email', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" value="${global.phone || ''}" 
                               onchange="SettingsManager.updateGlobal('phone', this.value)" 
                               class="mt-1" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" value="${global.address || ''}" 
                               onchange="SettingsManager.updateGlobal('address', this.value)" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },
    
    renderHeader(data) {
        const header = data.header;
        return `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-header text-blue-600 mr-2"></i>Header Settings
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Logo Text</label>
                        <input type="text" value="${header.logoText || ''}" 
                               onchange="SettingsManager.updateHeader('logoText', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">CTA Button Text</label>
                        <input type="text" value="${header.cta || ''}" 
                               onchange="SettingsManager.updateHeader('cta', this.value)" 
                               class="mt-1" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Menu Items (comma separated)</label>
                        <input type="text" value="${(header.menu || []).join(', ')}" 
                               onchange="SettingsManager.updateHeader('menu', this.value.split(',').map(s=>s.trim()))" 
                               class="mt-1" />
                        <p class="text-xs text-gray-400 mt-1">Separate items with commas: Home, About, Services, Contact</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderFooter(data) {
        const footer = data.footer;
        return `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-copyright text-blue-600 mr-2"></i>Footer Settings
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Copyright Text</label>
                        <input type="text" value="${footer.copyright || ''}" 
                               onchange="SettingsManager.updateFooter('copyright', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Social Links (comma separated)</label>
                        <input type="text" value="${(footer.social || []).join(', ')}" 
                               onchange="SettingsManager.updateFooter('social', this.value.split(',').map(s=>s.trim()))" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Contact Phone</label>
                        <input type="text" value="${footer.contact?.phone || ''}" 
                               onchange="SettingsManager.updateFooterContact('phone', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Contact Email</label>
                        <input type="text" value="${footer.contact?.email || ''}" 
                               onchange="SettingsManager.updateFooterContact('email', this.value)" 
                               class="mt-1" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Contact Address</label>
                        <input type="text" value="${footer.contact?.address || ''}" 
                               onchange="SettingsManager.updateFooterContact('address', this.value)" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },
    
    renderResponsive(data) {
        const responsive = data.responsive;
        let html = `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-mobile-alt text-blue-600 mr-2"></i>Responsive Settings
                </h4>
        `;
        
        for (let device in responsive) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold capitalize text-gray-700 mb-3">
                        <i class="fas ${device === 'desktop' ? 'fa-desktop' : device === 'tablet' ? 'fa-tablet' : 'fa-mobile'} mr-2"></i>
                        ${device}
                    </h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            `;
            for (let prop in responsive[device]) {
                html += `
                    <div>
                        <label class="block text-xs font-medium text-gray-500 capitalize">${prop}</label>
                        <input type="text" value="${responsive[device][prop]}" 
                               onchange="SettingsManager.updateResponsive('${device}', '${prop}', this.value)" 
                               class="mt-1 text-sm" />
                    </div>
                `;
            }
            html += `</div></div>`;
        }
        
        html += `</div>`;
        return html;
    },
    
    renderBackup(data) {
        return `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-database text-blue-600 mr-2"></i>Backup & Restore
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onclick="SettingsManager.exportData()" class="btn-primary w-full text-center">
                        <i class="fas fa-download mr-2"></i> Export Data
                    </button>
                    <button onclick="SettingsManager.importData()" class="btn-pink w-full text-center">
                        <i class="fas fa-upload mr-2"></i> Import Data
                    </button>
                    <button onclick="SettingsManager.resetData()" class="bg-rose-100 text-rose-600 px-5 py-2 rounded-full hover:bg-rose-200 transition w-full text-center">
                        <i class="fas fa-undo-alt mr-2"></i> Reset All
                    </button>
                </div>
                <div class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h5 class="font-semibold text-gray-700 mb-2">Storage Info</h5>
                    <div class="text-sm text-gray-500 space-y-1">
                        <p><i class="fas fa-hdd mr-2"></i> Storage: LocalStorage</p>
                        <p><i class="fas fa-file mr-2"></i> Data Size: ~${JSON.stringify(data).length} bytes</p>
                        <p><i class="fas fa-clock mr-2"></i> Last Updated: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    switchTab(tab) {
        this.currentTab = tab;
        const container = document.querySelector('#pageContainer .card-admin');
        if (container) {
            const data = App.data;
            this.render(container.parentElement, data);
        }
    },
    
    updateGlobal(key, value) {
        App.data.global[key] = value;
        Storage.save(App.data);
    },
    
    updateHeader(key, value) {
        App.data.header[key] = value;
        Storage.save(App.data);
    },
    
    updateFooter(key, value) {
        App.data.footer[key] = value;
        Storage.save(App.data);
    },
    
    updateFooterContact(key, value) {
        if (!App.data.footer.contact) App.data.footer.contact = {};
        App.data.footer.contact[key] = value;
        Storage.save(App.data);
    },
    
    updateResponsive(device, prop, value) {
        App.data.responsive[device][prop] = value;
        Storage.save(App.data);
    },
    
    exportData() {
        const data = App.data;
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `novena-cms-backup-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    App.data = Storage.merge(Storage.defaultData, imported);
                    Storage.save(App.data);
                    alert('Data imported successfully!');
                    App.loadPage('settings');
                } catch (err) {
                    alert('Invalid data file. Please check the JSON format.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },
    
    resetData() {
        if (confirm('This will delete all custom data and restore defaults. Are you sure?')) {
            App.data = Storage.reset();
            App.loadPage('settings');
            alert('Data has been reset to default.');
        }
    }
};