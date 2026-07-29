// Home Page Module - Manages home page content
const HomePage = {
    currentTab: 'content',
    
    // Main render function
    render(container, data) {
        const homeData = data.content.home || {};
        
        container.innerHTML = `
            <div class="card-admin p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-bold text-lg">
                        <i class="fas fa-home text-pink-600 mr-2"></i>Home Page Manager
                    </h3>
                    <span class="badge-soft">${data.sections.home?.length || 0} sections</span>
                </div>
                
                <!-- Tabs -->
                <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    <button class="tab-btn ${this.currentTab === 'content' ? 'active' : ''}" onclick="HomePage.switchTab('content')">
                        <i class="fas fa-pen-fancy mr-1"></i> Content
                    </button>
                    <button class="tab-btn ${this.currentTab === 'sections' ? 'active' : ''}" onclick="HomePage.switchTab('sections')">
                        <i class="fas fa-layer-group mr-1"></i> Sections
                    </button>
                    <button class="tab-btn ${this.currentTab === 'media' ? 'active' : ''}" onclick="HomePage.switchTab('media')">
                        <i class="fas fa-image mr-1"></i> Media
                    </button>
                    <button class="tab-btn ${this.currentTab === 'layout' ? 'active' : ''}" onclick="HomePage.switchTab('layout')">
                        <i class="fas fa-arrows-alt mr-1"></i> Layout
                    </button>
                </div>
                
                <!-- Tab Content -->
                <div id="homeTabContent">
                    ${this.renderTabContent(this.currentTab, homeData, data)}
                </div>
            </div>
        `;
    },
    
    // Render tab content
    renderTabContent(tab, homeData, data) {
        switch(tab) {
            case 'content': return this.renderContent(homeData);
            case 'sections': return this.renderSections(data);
            case 'media': return this.renderMedia(data);
            case 'layout': return this.renderLayout();
            default: return '<p class="text-gray-500">Select a tab</p>';
        }
    },
    
    // Content Editor
    renderContent(homeData) {
        let html = `
            <div class="space-y-6">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-edit text-pink-600 mr-2"></i>Edit Home Page Content
                </h4>
        `;
        
        // Hero Section
        if (homeData.hero) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-star text-yellow-500 mr-2"></i>Hero Section</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Heading</label>
                            <input type="text" value="${homeData.hero.heading || ''}" 
                                   onchange="HomePage.updateContent('hero', 'heading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Subheading</label>
                            <input type="text" value="${homeData.hero.subheading || ''}" 
                                   onchange="HomePage.updateContent('hero', 'subheading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-xs font-medium text-gray-500">Paragraph</label>
                            <textarea onchange="HomePage.updateContent('hero', 'paragraph', this.value)" 
                                      class="mt-1 text-sm" rows="2">${homeData.hero.paragraph || ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Button Text</label>
                            <input type="text" value="${homeData.hero.buttonText || ''}" 
                                   onchange="HomePage.updateContent('hero', 'buttonText', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Button Link</label>
                            <input type="text" value="${homeData.hero.buttonLink || '#'}" 
                                   onchange="HomePage.updateContent('hero', 'buttonLink', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-xs font-medium text-gray-500">Background Image URL</label>
                            <input type="text" value="${homeData.hero.bgImage || ''}" 
                                   onchange="HomePage.updateContent('hero', 'bgImage', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Features Section
        if (homeData.features && homeData.features.cards) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-th-list text-blue-500 mr-2"></i>Features Cards</h5>
                    ${homeData.features.cards.map((card, idx) => `
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 p-2 bg-white rounded border">
                            <input type="text" value="${card.title}" 
                                   placeholder="Title" 
                                   onchange="HomePage.updateFeatureCard(${idx}, 'title', this.value)" 
                                   class="text-sm" />
                            <input type="text" value="${card.desc}" 
                                   placeholder="Description" 
                                   onchange="HomePage.updateFeatureCard(${idx}, 'desc', this.value)" 
                                   class="text-sm" />
                            <input type="text" value="${card.icon}" 
                                   placeholder="Icon (fa-*)" 
                                   onchange="HomePage.updateFeatureCard(${idx}, 'icon', this.value)" 
                                   class="text-sm" />
                            <select onchange="HomePage.updateFeatureCard(${idx}, 'color', this.value)" class="text-sm">
                                ${['blue', 'teal', 'rose', 'purple', 'green', 'orange'].map(c => 
                                    `<option value="${c}" ${card.color === c ? 'selected' : ''}>${c}</option>`
                                ).join('')}
                            </select>
                        </div>
                    `).join('')}
                    <button onclick="HomePage.addFeatureCard()" class="text-sm text-pink-600 hover:underline mt-2">
                        <i class="fas fa-plus mr-1"></i> Add Feature
                    </button>
                </div>
            `;
        }
        
        // About Section
        if (homeData.about) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-info-circle text-green-500 mr-2"></i>About Section</h5>
                    <div class="grid grid-cols-1 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Heading</label>
                            <input type="text" value="${homeData.about.heading || ''}" 
                                   onchange="HomePage.updateContent('about', 'heading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Paragraph</label>
                            <textarea onchange="HomePage.updateContent('about', 'paragraph', this.value)" 
                                      class="mt-1 text-sm" rows="3">${homeData.about.paragraph || ''}</textarea>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        return html;
    },
    
    // Sections Manager
    renderSections(data) {
        const sections = data.sections.home || [];
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-layer-group text-purple-600 mr-2"></i>Manage Home Sections
                </h4>
                <p class="text-sm text-gray-500 mb-4">Drag to reorder sections. Click toggle to show/hide.</p>
                <div class="space-y-2" id="homeSectionList">
                    ${sections.map((sec, idx) => `
                        <div class="section-item flex items-center justify-between" draggable="true" data-index="${idx}">
                            <div class="flex items-center gap-3">
                                <span class="drag-handle"><i class="fas fa-grip-vertical"></i></span>
                                <span class="font-medium capitalize">${sec.replace('-',' ')}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked class="sr-only peer" />
                                    <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                                </label>
                                <button onclick="HomePage.removeSection('${sec}', ${idx})" class="text-rose-400 hover:text-rose-600 text-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="HomePage.addSection()" class="mt-4 text-sm text-pink-600 hover:underline">
                    <i class="fas fa-plus mr-1"></i> Add Section
                </button>
            </div>
        `;
    },
    
    // Media Manager
    renderMedia(data) {
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-image text-green-600 mr-2"></i>Home Page Media
                </h4>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Hero Banner URLs</label>
                            <textarea onchange="HomePage.updateMedia('heroBanners', this.value.split('\n').filter(s=>s.trim()))" 
                                      class="mt-1" rows="3">${data.media.heroBanners.join('\n')}</textarea>
                            <p class="text-xs text-gray-400 mt-1">One URL per line</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Section Images</label>
                            <div class="space-y-2 mt-1">
                                <div>
                                    <label class="text-xs text-gray-500">About Image</label>
                                    <input type="text" value="${data.media.sectionImages.about || ''}" 
                                           onchange="HomePage.updateMedia('sectionImages', {...App.data.media.sectionImages, about: this.value})" 
                                           class="text-sm" />
                                </div>
                                <div>
                                    <label class="text-xs text-gray-500">Doctor Image</label>
                                    <input type="text" value="${data.media.sectionImages.doctor || ''}" 
                                           onchange="HomePage.updateMedia('sectionImages', {...App.data.media.sectionImages, doctor: this.value})" 
                                           class="text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Layout Manager
    renderLayout() {
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-arrows-alt text-orange-600 mr-2"></i>Home Page Layout
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Container Width</label>
                        <select class="mt-1">
                            <option value="max-w-7xl" selected>Max Width 7xl</option>
                            <option value="max-w-6xl">Max Width 6xl</option>
                            <option value="max-w-full">Full Width</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Card Layout</label>
                        <select class="mt-1">
                            <option value="grid" selected>Grid</option>
                            <option value="flex">Flex</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Image Position (About)</label>
                        <select class="mt-1">
                            <option value="left" selected>Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Spacing</label>
                        <select class="mt-1">
                            <option value="gap-4">Small</option>
                            <option value="gap-6" selected>Medium</option>
                            <option value="gap-8">Large</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Switch tab
    switchTab(tab) {
        this.currentTab = tab;
        // Re-render
        const container = document.querySelector('#pageContainer .card-admin');
        if (container) {
            const data = App.data;
            this.render(container.parentElement, data);
        }
    },
    
    // Content update helpers
    updateContent(section, field, value) {
        if (!App.data.content.home) App.data.content.home = {};
        if (!App.data.content.home[section]) App.data.content.home[section] = {};
        App.data.content.home[section][field] = value;
        Storage.save(App.data);
    },
    
    updateFeatureCard(index, field, value) {
        const cards = App.data.content.home.features.cards;
        if (cards && cards[index]) {
            cards[index][field] = value;
            Storage.save(App.data);
        }
    },
    
    addFeatureCard() {
        if (!App.data.content.home.features) {
            App.data.content.home.features = { cards: [] };
        }
        App.data.content.home.features.cards.push({
            title: 'New Feature',
            desc: 'Feature description',
            icon: 'fa-star',
            color: 'blue'
        });
        Storage.save(App.data);
        this.switchTab('content');
    },
    
    removeSection(section, index) {
        if (confirm(`Remove "${section}" from home page?`)) {
            App.data.sections.home.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('sections');
        }
    },
    
    addSection() {
        const newSection = prompt('Enter section name (e.g., "cta", "blog"):');
        if (newSection && newSection.trim()) {
            App.data.sections.home.push(newSection.trim().toLowerCase());
            Storage.save(App.data);
            this.switchTab('sections');
        }
    },
    
    updateMedia(key, value) {
        if (key === 'heroBanners') {
            App.data.media.heroBanners = value;
        } else if (key === 'sectionImages') {
            App.data.media.sectionImages = value;
        }
        Storage.save(App.data);
    }
};