// Contact Page Module
const ContactPage = {
    currentTab: 'content',
    
    render(container, data) {
        const contactData = data.content.contact || {};
        
        container.innerHTML = `
            <div class="card-admin p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-bold text-lg">
                        <i class="fas fa-envelope text-pink-600 mr-2"></i>Contact Page Manager
                    </h3>
                    <span class="badge-soft">${data.sections.contact?.length || 0} sections</span>
                </div>
                
                <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    <button class="tab-btn ${this.currentTab === 'content' ? 'active' : ''}" onclick="ContactPage.switchTab('content')">
                        <i class="fas fa-pen-fancy mr-1"></i> Content
                    </button>
                    <button class="tab-btn ${this.currentTab === 'info' ? 'active' : ''}" onclick="ContactPage.switchTab('info')">
                        <i class="fas fa-address-card mr-1"></i> Contact Info
                    </button>
                    <button class="tab-btn ${this.currentTab === 'form' ? 'active' : ''}" onclick="ContactPage.switchTab('form')">
                        <i class="fas fa-wpforms mr-1"></i> Form Settings
                    </button>
                    <button class="tab-btn ${this.currentTab === 'sections' ? 'active' : ''}" onclick="ContactPage.switchTab('sections')">
                        <i class="fas fa-layer-group mr-1"></i> Sections
                    </button>
                </div>
                
                <div id="contactTabContent">
                    ${this.renderTabContent(this.currentTab, contactData, data)}
                </div>
            </div>
        `;
    },
    
    renderTabContent(tab, contactData, data) {
        switch(tab) {
            case 'content': return this.renderContent(contactData);
            case 'info': return this.renderInfo(contactData);
            case 'form': return this.renderForm(contactData);
            case 'sections': return this.renderSections(data);
            default: return '<p class="text-gray-500">Select a tab</p>';
        }
    },
    
    renderContent(contactData) {
        let html = `
            <div class="space-y-6">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-edit text-pink-600 mr-2"></i>Edit Contact Page Content
                </h4>
        `;
        
        // Hero
        if (contactData.hero) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-star text-yellow-500 mr-2"></i>Hero Section</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Heading</label>
                            <input type="text" value="${contactData.hero.heading || ''}" 
                                   onchange="ContactPage.updateContent('hero', 'heading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Subheading</label>
                            <input type="text" value="${contactData.hero.subheading || ''}" 
                                   onchange="ContactPage.updateContent('hero', 'subheading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-xs font-medium text-gray-500">Paragraph</label>
                            <textarea onchange="ContactPage.updateContent('hero', 'paragraph', this.value)" 
                                      class="mt-1 text-sm" rows="2">${contactData.hero.paragraph || ''}</textarea>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        return html;
    },
    
    renderInfo(contactData) {
        const info = contactData.info || {};
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-address-card text-blue-600 mr-2"></i>Contact Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" value="${info.phone || ''}" 
                               onchange="ContactPage.updateInfo('phone', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" value="${info.email || ''}" 
                               onchange="ContactPage.updateInfo('email', this.value)" 
                               class="mt-1" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" value="${info.address || ''}" 
                               onchange="ContactPage.updateInfo('address', this.value)" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },
    
    renderForm(contactData) {
        const form = contactData.form || {};
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-wpforms text-green-600 mr-2"></i>Form Settings
                </h4>
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Heading</label>
                        <input type="text" value="${form.heading || ''}" 
                               onchange="ContactPage.updateFormField('heading', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Subheading</label>
                        <input type="text" value="${form.subheading || ''}" 
                               onchange="ContactPage.updateFormField('subheading', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea onchange="ContactPage.updateFormField('description', this.value)" 
                                  class="mt-1" rows="3">${form.description || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Form Action (URL)</label>
                        <input type="text" value="${form.action || '/submit'}" 
                               placeholder="/submit" 
                               onchange="ContactPage.updateFormField('action', this.value)" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },
    
    renderSections(data) {
        const sections = data.sections.contact || [];
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-layer-group text-purple-600 mr-2"></i>Manage Contact Sections
                </h4>
                <div class="space-y-2">
                    ${sections.map((sec, idx) => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded border">
                            <span class="font-medium capitalize">${sec.replace('-',' ')}</span>
                            <button onclick="ContactPage.removeSection(${idx})" class="text-rose-400 hover:text-rose-600 text-sm">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <button onclick="ContactPage.addSection()" class="mt-4 text-sm text-pink-600 hover:underline">
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
        if (!App.data.content.contact) App.data.content.contact = {};
        if (!App.data.content.contact[section]) App.data.content.contact[section] = {};
        App.data.content.contact[section][field] = value;
        Storage.save(App.data);
    },
    
    updateInfo(field, value) {
        if (!App.data.content.contact) App.data.content.contact = {};
        if (!App.data.content.contact.info) App.data.content.contact.info = {};
        App.data.content.contact.info[field] = value;
        Storage.save(App.data);
    },
    
    updateFormField(field, value) {
        if (!App.data.content.contact) App.data.content.contact = {};
        if (!App.data.content.contact.form) App.data.content.contact.form = {};
        App.data.content.contact.form[field] = value;
        Storage.save(App.data);
    },
    
    removeSection(index) {
        if (confirm('Remove this section?')) {
            App.data.sections.contact.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('sections');
        }
    },
    
    addSection() {
        const newSection = prompt('Enter section name:');
        if (newSection && newSection.trim()) {
            App.data.sections.contact.push(newSection.trim().toLowerCase());
            Storage.save(App.data);
            this.switchTab('sections');
        }
    }
};