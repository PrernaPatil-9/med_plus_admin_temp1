// Services Page Module
const ServicesPage = {
    currentTab: 'content',
    
    render(container, data) {
        const servicesData = data.content.services || {};
        
        container.innerHTML = `
            <div class="card-admin p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-bold text-lg">
                        <i class="fas fa-concierge-bell text-pink-600 mr-2"></i>Services Page Manager
                    </h3>
                    <span class="badge-soft">${data.sections.services?.length || 0} sections</span>
                </div>
                
                <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    <button class="tab-btn ${this.currentTab === 'content' ? 'active' : ''}" onclick="ServicesPage.switchTab('content')">
                        <i class="fas fa-pen-fancy mr-1"></i> Content
                    </button>
                    <button class="tab-btn ${this.currentTab === 'grid' ? 'active' : ''}" onclick="ServicesPage.switchTab('grid')">
                        <i class="fas fa-th-large mr-1"></i> Services Grid
                    </button>
                    <button class="tab-btn ${this.currentTab === 'sections' ? 'active' : ''}" onclick="ServicesPage.switchTab('sections')">
                        <i class="fas fa-layer-group mr-1"></i> Sections
                    </button>
                </div>
                
                <div id="servicesTabContent">
                    ${this.renderTabContent(this.currentTab, servicesData, data)}
                </div>
            </div>
        `;
    },
    
    renderTabContent(tab, servicesData, data) {
        switch(tab) {
            case 'content': return this.renderContent(servicesData);
            case 'grid': return this.renderGrid(servicesData);
            case 'sections': return this.renderSections(data);
            default: return '<p class="text-gray-500">Select a tab</p>';
        }
    },
    
    renderContent(servicesData) {
        let html = `
            <div class="space-y-6">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-edit text-pink-600 mr-2"></i>Edit Services Page Content
                </h4>
        `;
        
        // Hero
        if (servicesData.hero) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-star text-yellow-500 mr-2"></i>Hero Section</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Heading</label>
                            <input type="text" value="${servicesData.hero.heading || ''}" 
                                   onchange="ServicesPage.updateContent('hero', 'heading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Subheading</label>
                            <input type="text" value="${servicesData.hero.subheading || ''}" 
                                   onchange="ServicesPage.updateContent('hero', 'subheading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-xs font-medium text-gray-500">Paragraph</label>
                            <textarea onchange="ServicesPage.updateContent('hero', 'paragraph', this.value)" 
                                      class="mt-1 text-sm" rows="2">${servicesData.hero.paragraph || ''}</textarea>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        return html;
    },
    
    renderGrid(servicesData) {
        const grid = servicesData.grid || {};
        const cards = grid.cards || [];
        
        let html = `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-th-large text-blue-600 mr-2"></i>Services Grid
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-xs font-medium text-gray-500">Heading</label>
                        <input type="text" value="${grid.heading || ''}" 
                               onchange="ServicesPage.updateGridField('heading', this.value)" 
                               class="mt-1 text-sm" />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500">Subheading</label>
                        <input type="text" value="${grid.subheading || ''}" 
                               onchange="ServicesPage.updateGridField('subheading', this.value)" 
                               class="mt-1 text-sm" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-xs font-medium text-gray-500">Description</label>
                        <textarea onchange="ServicesPage.updateGridField('description', this.value)" 
                                  class="mt-1 text-sm" rows="2">${grid.description || ''}</textarea>
                    </div>
                </div>
                
                <div class="space-y-3 mt-4">
                    <h5 class="font-medium text-gray-700">Service Cards</h5>
                    ${cards.map((card, idx) => `
                        <div class="border rounded-xl p-4 bg-gray-50">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div>
                                    <label class="block text-xs font-medium text-gray-500">Title</label>
                                    <input type="text" value="${card.title || ''}" 
                                           onchange="ServicesPage.updateCard(${idx}, 'title', this.value)" 
                                           class="mt-1 text-sm" />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500">Description</label>
                                    <input type="text" value="${card.desc || ''}" 
                                           onchange="ServicesPage.updateCard(${idx}, 'desc', this.value)" 
                                           class="mt-1 text-sm" />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500">Image URL</label>
                                    <input type="text" value="${card.image || ''}" 
                                           placeholder="/images/s_1.jpg"
                                           onchange="ServicesPage.updateCard(${idx}, 'image', this.value)" 
                                           class="mt-1 text-sm" />
                                </div>
                                <div class="flex items-end gap-2">
                                    <button onclick="ServicesPage.removeCard(${idx})" class="text-rose-500 hover:text-rose-700 text-sm">
                                        <i class="fas fa-trash-alt mr-1"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    <button onclick="ServicesPage.addCard()" class="text-sm text-pink-600 hover:underline">
                        <i class="fas fa-plus mr-1"></i> Add Service
                    </button>
                </div>
            </div>
        `;
        return html;
    },
    
    renderSections(data) {
        const sections = data.sections.services || [];
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-layer-group text-purple-600 mr-2"></i>Manage Services Sections
                </h4>
                <div class="space-y-2">
                    ${sections.map((sec, idx) => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded border">
                            <span class="font-medium capitalize">${sec.replace('-',' ')}</span>
                            <button onclick="ServicesPage.removeSection(${idx})" class="text-rose-400 hover:text-rose-600 text-sm">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <button onclick="ServicesPage.addSection()" class="mt-4 text-sm text-pink-600 hover:underline">
                    <i class="fas fa-plus mr-1"></i> Add Section
                </button>
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
    
    updateContent(section, field, value) {
        if (!App.data.content.services) App.data.content.services = {};
        if (!App.data.content.services[section]) App.data.content.services[section] = {};
        App.data.content.services[section][field] = value;
        Storage.save(App.data);
    },
    
    updateGridField(field, value) {
        if (!App.data.content.services.grid) App.data.content.services.grid = {};
        App.data.content.services.grid[field] = value;
        Storage.save(App.data);
    },
    
    updateCard(index, field, value) {
        if (!App.data.content.services.grid) App.data.content.services.grid = { cards: [] };
        if (!App.data.content.services.grid.cards[index]) App.data.content.services.grid.cards[index] = {};
        App.data.content.services.grid.cards[index][field] = value;
        Storage.save(App.data);
    },
    
    addCard() {
        if (!App.data.content.services.grid) App.data.content.services.grid = { cards: [] };
        App.data.content.services.grid.cards.push({
            title: 'New Service',
            desc: 'Service description',
            image: '/images/s_default.jpg'
        });
        Storage.save(App.data);
        this.switchTab('grid');
    },
    
    removeCard(index) {
        if (confirm('Remove this service?')) {
            App.data.content.services.grid.cards.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('grid');
        }
    },
    
    removeSection(index) {
        if (confirm('Remove this section?')) {
            App.data.sections.services.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('sections');
        }
    },
    
    addSection() {
        const newSection = prompt('Enter section name:');
        if (newSection && newSection.trim()) {
            App.data.sections.services.push(newSection.trim().toLowerCase());
            Storage.save(App.data);
            this.switchTab('sections');
        }
    }
};