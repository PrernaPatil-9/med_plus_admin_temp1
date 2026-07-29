// Main Application
const App = {
    data: null,
    currentPage: 'dashboard',
    currentTab: 'home',

    // Initialize
    init() {
        // Load data
        this.data = Storage.load();
        this.data = Storage.merge(Storage.defaultData, this.data);
        
        // Load components
        this.loadComponents();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup time
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        // Load default page
        this.loadPage('dashboard');
    },

    // Load components (sidebar, header)
    loadComponents() {
        // Load sidebar
        fetch('components/sidebar.html')
            .then(res => res.text())
            .then(html => {
                document.getElementById('sidebar').innerHTML = html;
                this.setupSidebarEvents();
            })
            .catch(() => {
                // Fallback: generate sidebar dynamically
                this.generateSidebar();
            });

        // Load header
        fetch('components/header.html')
            .then(res => res.text())
            .then(html => {
                document.getElementById('adminHeader').innerHTML = html;
            })
            .catch(() => {
                this.generateHeader();
            });
    },

    // Generate sidebar dynamically (fallback)
    generateSidebar() {
        const sidebar = document.getElementById('sidebar');
        const modules = [
            { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
            { id: 'pages', icon: 'fa-file-alt', label: 'Page Manager' },
            { id: 'sections', icon: 'fa-layer-group', label: 'Section Manager' },
            { id: 'content', icon: 'fa-pen-fancy', label: 'Content Editor' },
            { id: 'media', icon: 'fa-images', label: 'Banner & Media' },
            { id: 'layout', icon: 'fa-arrows-alt', label: 'Layout Manager' },
            { id: 'theme', icon: 'fa-palette', label: 'Theme Manager' },
            { id: 'header', icon: 'fa-header', label: 'Header & Nav' },
            { id: 'footer', icon: 'fa-copyright', label: 'Footer Manager' },
            { id: 'global', icon: 'fa-globe', label: 'Global Settings' },
            { id: 'responsive', icon: 'fa-mobile-alt', label: 'Responsive' },
            { id: 'preview', icon: 'fa-eye', label: 'Preview & Save' }
        ];

        sidebar.innerHTML = `
            <aside class="admin-sidebar w-72 flex-shrink-0 text-white/80 p-6 space-y-6 min-h-screen sticky top-0">
                <div class="flex items-center gap-3 pb-6 border-b border-white/10">
                    <div class="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        ${this.data.media.logos.main}
                    </div>
                    <span class="text-2xl font-bold text-white tracking-tight">${this.data.media.logos.text}</span>
                    <span class="ml-auto text-[10px] uppercase bg-pink-600/30 px-2 py-0.5 rounded-full text-pink-200">CMS</span>
                </div>
                <nav class="space-y-1">
                    ${modules.map(mod => `
                        <a href="#" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium" data-page="${mod.id}">
                            <i class="fas ${mod.icon} w-5"></i> ${mod.label}
                        </a>
                    `).join('')}
                </nav>
                <div class="pt-6 border-t border-white/10 text-xs text-white/40">
                    <i class="fas fa-database mr-1"></i> Local Storage · v1.0
                </div>
            </aside>
        `;
        this.setupSidebarEvents();
    },

    // Generate header dynamically (fallback)
    generateHeader() {
        const header = document.getElementById('adminHeader');
        header.innerHTML = `
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <i class="fas fa-tachometer-alt text-pink-600"></i>
                    <span id="pageTitle">Dashboard</span>
                </h2>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500 hidden md:inline">
                        <i class="far fa-clock mr-1"></i> <span id="liveTime"></span>
                    </span>
                    <button id="resetBtn" class="text-sm bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full hover:bg-rose-100 transition flex items-center gap-2">
                        <i class="fas fa-undo-alt"></i> Reset
                    </button>
                </div>
            </div>
        `;
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetData());
    },

    // Setup sidebar events
    setupSidebarEvents() {
        document.querySelectorAll('.admin-sidebar a[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page);
            });
        });
    },

    // Setup navigation
    setupNavigation() {
        // Reset button
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetData());
        
        // Close preview
        document.addEventListener('click', (e) => {
            if (e.target.closest('#closePreview')) {
                document.getElementById('previewContainer')?.classList.add('hidden');
            }
        });
    },

    // Load page
    loadPage(page) {
        this.currentPage = page;
        
        // Update active state
        document.querySelectorAll('.admin-sidebar a[data-page]').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
        
        // Update title
        const title = document.getElementById('pageTitle');
        if (title) {
            title.textContent = Utils.capitalize(page);
        }
        
        // Load page content
        const container = document.getElementById('pageContainer');
        if (!container) return;
        
        // Check if page has specific handler
        const pageHandlers = {
            'dashboard': this.renderDashboard,
            'pages': this.renderPageManager,
            'sections': this.renderSectionManager,
            'content': this.renderContentEditor,
            'media': this.renderMediaManager,
            'layout': this.renderLayoutManager,
            'theme': this.renderThemeManager,
            'header': this.renderHeaderManager,
            'footer': this.renderFooterManager,
            'global': this.renderGlobalSettings,
            'responsive': this.renderResponsiveManager,
            'preview': this.renderPreviewManager
        };
        
        // Hide preview container unless preview page
        const previewContainer = document.getElementById('previewContainer');
        if (previewContainer) {
            previewContainer.classList.toggle('hidden', page !== 'preview');
        }
        
        if (pageHandlers[page]) {
            pageHandlers[page].call(this, container);
        } else {
            container.innerHTML = `
                <div class="card-admin p-12 text-center">
                    <i class="fas fa-cog fa-3x text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600">Page under construction</h3>
                    <p class="text-gray-400 mt-2">${Utils.capitalize(page)} module coming soon</p>
                </div>
            `;
        }
    },

    // ==================== PAGE RENDERERS ====================
    
    // Dashboard
    renderDashboard(container) {
        const data = this.data;
        const totalSections = Object.values(data.sections).reduce((a, b) => a + b.length, 0);
        
        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="card-admin p-6">
                    <i class="fas fa-file-alt text-pink-600 text-2xl mb-2"></i>
                    <h3 class="text-2xl font-bold">${data.pages.length}</h3>
                    <p class="text-gray-500 text-sm">Pages</p>
                </div>
                <div class="card-admin p-6">
                    <i class="fas fa-layer-group text-pink-600 text-2xl mb-2"></i>
                    <h3 class="text-2xl font-bold">${totalSections}</h3>
                    <p class="text-gray-500 text-sm">Sections</p>
                </div>
                <div class="card-admin p-6">
                    <i class="fas fa-palette text-pink-600 text-2xl mb-2"></i>
                    <h3 class="text-2xl font-bold">${Object.keys(data.theme).length}</h3>
                    <p class="text-gray-500 text-sm">Theme tokens</p>
                </div>
                <div class="card-admin p-6">
                    <i class="fas fa-image text-pink-600 text-2xl mb-2"></i>
                    <h3 class="text-2xl font-bold">${data.media.heroBanners.length + 2}</h3>
                    <p class="text-gray-500 text-sm">Media assets</p>
                </div>
            </div>
            
            <div class="card-admin p-6">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-bolt text-pink-600 mr-2"></i>Quick Navigation
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    ${data.pages.map(p => `
                        <button onclick="App.loadPage('content')" class="bg-gray-50 hover:bg-pink-50 p-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition">
                            ${Utils.capitalize(p)}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="mt-6 text-xs text-gray-400 flex items-center gap-4">
                <span><i class="fas fa-database mr-1"></i> Data stored in LocalStorage</span>
                <span><i class="fas fa-sync-alt mr-1"></i> Last saved: ${new Date().toLocaleTimeString()}</span>
            </div>
        `;
    },

    // Page Manager
    renderPageManager(container) {
        const data = this.data;
        let html = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-file-alt text-pink-600 mr-2"></i>Pages
                </h3>
                <div class="space-y-3">
        `;
        
        data.pages.forEach(page => {
            const sections = data.sections[page] || [];
            html += `
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                        <span class="font-medium capitalize">${page}</span>
                        <span class="badge-soft ml-2">${sections.length} sections</span>
                    </div>
                    <div>
                        <button onclick="App.loadPage('sections')" class="text-sm text-pink-600 hover:underline">Manage</button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
        container.innerHTML = html;
    },

    // Section Manager
    renderSectionManager(container) {
        const data = this.data;
        let html = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-layer-group text-pink-600 mr-2"></i>Section Manager
                </h3>
                <div class="mb-4 flex flex-wrap gap-2">
        `;
        
        data.pages.forEach(p => {
            html += `
                <button class="tab-btn ${p === this.currentTab ? 'active' : ''}" onclick="App.switchSectionTab('${p}')">
                    ${Utils.capitalize(p)}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="sectionList" class="space-y-2"></div>
            </div>
        `;
        
        container.innerHTML = html;
        this.renderSectionList(this.currentTab);
    },

    renderSectionList(page) {
        const list = document.getElementById('sectionList');
        if (!list) return;
        
        const sections = this.data.sections[page] || [];
        list.innerHTML = sections.map((sec, idx) => `
            <div class="section-item flex items-center justify-between" draggable="true" data-page="${page}" data-index="${idx}">
                <div class="flex items-center gap-3">
                    <span class="drag-handle"><i class="fas fa-grip-vertical"></i></span>
                    <span class="font-medium capitalize">${sec.replace('-',' ')}</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="badge-soft">visible</span>
                    <button onclick="App.removeSection('${page}','${sec}')" class="text-rose-400 hover:text-rose-600 text-sm">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Setup drag and drop
        document.querySelectorAll('.section-item').forEach(el => {
            el.addEventListener('dragstart', this.handleDragStart);
            el.addEventListener('dragend', this.handleDragEnd);
            el.addEventListener('dragover', this.handleDragOver);
            el.addEventListener('drop', this.handleDrop.bind(this));
        });
    },

    switchSectionTab(page) {
        this.currentTab = page;
        this.renderSectionList(page);
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.toLowerCase() === page);
        });
    },

    handleDragStart(e) {
        this.draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    },

    handleDragEnd(e) {
        this.classList.remove('dragging');
    },

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    },

    handleDrop(e) {
        e.preventDefault();
        const dragged = this.draggedItem;
        if (dragged && dragged !== this) {
            const page = this.dataset.page;
            const fromIdx = parseInt(dragged.dataset.index);
            const toIdx = parseInt(this.dataset.index);
            
            if (page === this.dataset.page && fromIdx !== toIdx) {
                const sections = this.data.sections[page];
                const [removed] = sections.splice(fromIdx, 1);
                sections.splice(toIdx, 0, removed);
                Storage.save(this.data);
                this.renderSectionList(page);
            }
        }
    },

    removeSection(page, sec) {
        if (confirm(`Remove section "${sec}" from ${page}?`)) {
            const idx = this.data.sections[page].indexOf(sec);
            if (idx > -1) {
                this.data.sections[page].splice(idx, 1);
                Storage.save(this.data);
                this.renderSectionList(page);
            }
        }
    },

    // Content Editor
    renderContentEditor(container) {
        const data = this.data;
        let html = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-pen-fancy text-pink-600 mr-2"></i>Content Editor
                </h3>
                <div class="mb-4 flex flex-wrap gap-2">
        `;
        
        data.pages.forEach(p => {
            html += `
                <button class="tab-btn ${p === this.currentTab ? 'active' : ''}" onclick="App.renderContentArea('${p}')">
                    ${Utils.capitalize(p)}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="contentEditorArea"></div>
            </div>
        `;
        
        container.innerHTML = html;
        this.renderContentArea(this.currentTab);
    },

    renderContentArea(page) {
        const area = document.getElementById('contentEditorArea');
        if (!area) return;
        
        const content = this.data.content[page] || {};
        let html = `<div class="space-y-4">`;
        
        for (let key in content) {
            const val = content[key];
            
            if (typeof val === 'string') {
                html += `
                    <div>
                        <label class="block text-sm font-medium text-gray-700 capitalize">
                            ${key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input type="text" value="${val}" 
                               onchange="App.updateContent('${page}','${key}',this.value)" 
                               class="mt-1" />
                    </div>
                `;
            } else if (Array.isArray(val)) {
                html += `
                    <div class="border-t pt-3 mt-3">
                        <h4 class="font-semibold text-gray-600">${key}</h4>
                `;
                val.forEach((item, idx) => {
                    if (typeof item === 'object') {
                        for (let sub in item) {
                            html += `
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-xs text-gray-400 w-16">${sub}</span>
                                    <input type="text" value="${item[sub]}" 
                                           onchange="App.updateContentArray('${page}','${key}',${idx},'${sub}',this.value)" 
                                           class="flex-1" />
                                </div>
                            `;
                        }
                    } else {
                        html += `
                            <input type="text" value="${item}" 
                                   onchange="App.updateContentArraySimple('${page}','${key}',${idx},this.value)" 
                                   class="mt-1" />
                        `;
                    }
                });
                html += `</div>`;
            } else if (typeof val === 'object') {
                html += `
                    <div class="border-t pt-3 mt-3">
                        <h4 class="font-semibold text-gray-600">${key}</h4>
                `;
                for (let sub in val) {
                    if (typeof val[sub] === 'string') {
                        html += `
                            <div>
                                <label class="block text-sm text-gray-500 capitalize">${sub}</label>
                                <input type="text" value="${val[sub]}" 
                                       onchange="App.updateContentNested('${page}','${key}','${sub}',this.value)" 
                                       class="mt-1" />
                            </div>
                        `;
                    }
                }
                html += `</div>`;
            }
        }
        
        html += `</div>`;
        area.innerHTML = html;
    },

    // Content update helpers
    updateContent(page, key, val) {
        if (this.data.content[page]) {
            this.data.content[page][key] = val;
            Storage.save(this.data);
        }
    },

    updateContentNested(page, key, sub, val) {
        if (this.data.content[page] && this.data.content[page][key]) {
            this.data.content[page][key][sub] = val;
            Storage.save(this.data);
        }
    },

    updateContentArray(page, key, idx, sub, val) {
        if (this.data.content[page] && this.data.content[page][key] && this.data.content[page][key][idx]) {
            this.data.content[page][key][idx][sub] = val;
            Storage.save(this.data);
        }
    },

    updateContentArraySimple(page, key, idx, val) {
        if (this.data.content[page] && this.data.content[page][key]) {
            this.data.content[page][key][idx] = val;
            Storage.save(this.data);
        }
    },

    // Media Manager
    renderMediaManager(container) {
        const data = this.data;
        container.innerHTML = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-images text-pink-600 mr-2"></i>Banner & Media
                </h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Hero Banners (comma separated URLs)</label>
                        <input type="text" value="${data.media.heroBanners.join(', ')}" 
                               onchange="App.updateMedia('heroBanners', this.value.split(',').map(s=>s.trim()))" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Logo Text</label>
                        <input type="text" value="${data.media.logos.text}" 
                               onchange="App.updateMedia('logos', {...App.data.media.logos, text: this.value})" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Logo Icon (letter)</label>
                        <input type="text" maxlength="1" value="${data.media.logos.main}" 
                               onchange="App.updateMedia('logos', {...App.data.media.logos, main: this.value})" 
                               class="mt-1 w-20" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">About Section Image</label>
                        <input type="text" value="${data.media.sectionImages.about}" 
                               onchange="App.updateMedia('sectionImages', {...App.data.media.sectionImages, about: this.value})" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Doctor Image</label>
                        <input type="text" value="${data.media.sectionImages.doctor}" 
                               onchange="App.updateMedia('sectionImages', {...App.data.media.sectionImages, doctor: this.value})" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },

    updateMedia(key, val) {
        if (key === 'heroBanners') {
            this.data.media.heroBanners = val;
        } else if (key === 'logos') {
            this.data.media.logos = val;
        } else if (key === 'sectionImages') {
            this.data.media.sectionImages = val;
        }
        Storage.save(this.data);
    },

    // Theme Manager
    renderThemeManager(container) {
        const data = this.data;
        let html = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-palette text-pink-600 mr-2"></i>Theme Manager
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        `;
        
        for (let key in data.theme) {
            html += `
                <div>
                    <label class="block text-sm font-medium capitalize">${key.replace(/([A-Z])/g, ' $1')}</label>
                    <div class="flex items-center gap-2">
                        <input type="color" value="${data.theme[key]}" 
                               onchange="App.updateTheme('${key}', this.value)" 
                               class="w-12 h-10 p-1 border rounded" />
                        <input type="text" value="${data.theme[key]}" 
                               onchange="App.updateTheme('${key}', this.value)" 
                               class="flex-1" />
                    </div>
                </div>
            `;
        }
        
        html += `</div></div>`;
        container.innerHTML = html;
    },

    updateTheme(key, val) {
        this.data.theme[key] = val;
        Storage.save(this.data);
    },

    // Header Manager
    renderHeaderManager(container) {
        const data = this.data;
        container.innerHTML = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-header text-pink-600 mr-2"></i>Header & Navigation
                </h3>
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium">Logo Text</label>
                        <input type="text" value="${data.header.logoText}" 
                               onchange="App.updateHeader('logoText', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Navigation Menu (comma separated)</label>
                        <input type="text" value="${data.header.menu.join(', ')}" 
                               onchange="App.updateHeader('menu', this.value.split(',').map(s=>s.trim()))" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">CTA Button Text</label>
                        <input type="text" value="${data.header.cta}" 
                               onchange="App.updateHeader('cta', this.value)" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },

    updateHeader(key, val) {
        this.data.header[key] = val;
        Storage.save(this.data);
    },

    // Footer Manager
    renderFooterManager(container) {
        const data = this.data;
        container.innerHTML = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-copyright text-pink-600 mr-2"></i>Footer Manager
                </h3>
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium">Copyright Text</label>
                        <input type="text" value="${data.footer.copyright}" 
                               onchange="App.updateFooter('copyright', this.value)" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Phone</label>
                        <input type="text" value="${data.footer.contact.phone}" 
                               onchange="App.updateFooter('contact', {...App.data.footer.contact, phone: this.value})" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Email</label>
                        <input type="text" value="${data.footer.contact.email}" 
                               onchange="App.updateFooter('contact', {...App.data.footer.contact, email: this.value})" 
                               class="mt-1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Address</label>
                        <input type="text" value="${data.footer.contact.address}" 
                               onchange="App.updateFooter('contact', {...App.data.footer.contact, address: this.value})" 
                               class="mt-1" />
                    </div>
                </div>
            </div>
        `;
    },

    updateFooter(key, val) {
        if (key === 'contact') {
            this.data.footer.contact = val;
        } else {
            this.data.footer[key] = val;
        }
        Storage.save(this.data);
    },

    // Global Settings
    renderGlobalSettings(container) {
        const data = this.data;
        let html = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-globe text-pink-600 mr-2"></i>Global Settings
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        `;
        
        for (let key in data.global) {
            html += `
                <div>
                    <label class="block text-sm font-medium capitalize">${key.replace(/([A-Z])/g, ' $1')}</label>
                    <input type="text" value="${data.global[key]}" 
                           onchange="App.updateGlobal('${key}', this.value)" 
                           class="mt-1" />
                </div>
            `;
        }
        
        html += `</div></div>`;
        container.innerHTML = html;
    },

    updateGlobal(key, val) {
        this.data.global[key] = val;
        Storage.save(this.data);
    },

    // Responsive Manager
    renderResponsiveManager(container) {
        const data = this.data;
        let html = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-mobile-alt text-pink-600 mr-2"></i>Responsive Manager
                </h3>
        `;
        
        for (let device in data.responsive) {
            html += `
                <div class="border-b pb-4 mb-4">
                    <h4 class="font-semibold capitalize text-gray-700">${device}</h4>
            `;
            for (let prop in data.responsive[device]) {
                html += `
                    <div class="flex items-center gap-4 mt-2">
                        <span class="text-sm text-gray-500 w-24">${prop}</span>
                        <input type="text" value="${data.responsive[device][prop]}" 
                               onchange="App.updateResponsive('${device}','${prop}', this.value)" 
                               class="flex-1" />
                    </div>
                `;
            }
            html += `</div>`;
        }
        
        html += `</div>`;
        container.innerHTML = html;
    },

    updateResponsive(device, prop, val) {
        this.data.responsive[device][prop] = val;
        Storage.save(this.data);
    },

    // Preview Manager
    renderPreviewManager(container) {
        container.innerHTML = `
            <div class="card-admin p-6">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-eye text-pink-600 mr-2"></i>Preview & Save
                </h3>
                <div class="flex flex-wrap gap-4 mb-6">
                    <button onclick="App.generatePreview()" class="btn-primary">
                        <i class="fas fa-play mr-2"></i> Generate Preview
                    </button>
                    <button onclick="App.saveAll()" class="btn-pink">
                        <i class="fas fa-save mr-2"></i> Save All
                    </button>
                    <button onclick="App.resetData()" class="bg-rose-100 text-rose-600 px-5 py-2 rounded-full hover:bg-rose-200 transition">
                        <i class="fas fa-undo-alt mr-2"></i> Reset Default
                    </button>
                </div>
                <div id="previewStatus" class="text-sm text-gray-500">
                    <i class="fas fa-info-circle"></i> Click "Generate Preview" to see live preview below.
                </div>
            </div>
        `;
        
        // Show preview container
        const previewContainer = document.getElementById('previewContainer');
        if (previewContainer) {
            previewContainer.classList.remove('hidden');
            previewContainer.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-700">
                        <i class="fas fa-eye mr-2 text-pink-600"></i> Live Preview
                    </h3>
                    <button id="closePreview" class="text-gray-400 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <iframe id="previewIframe" class="preview-iframe" srcdoc=""></iframe>
            `;
            
            document.getElementById('closePreview')?.addEventListener('click', () => {
                previewContainer.classList.add('hidden');
            });
            
            // Generate initial preview
            this.generatePreview();
        }
    },

    generatePreview() {
        const iframe = document.getElementById('previewIframe');
        if (iframe) {
            const html = Preview.generate(this.data);
            iframe.srcdoc = html;
            Preview.updateStatus('Preview updated at ' + new Date().toLocaleTimeString());
        }
    },

    saveAll() {
        Storage.save(this.data);
        alert('All data saved to LocalStorage.');
    },

    resetData() {
        if (confirm('Reset all data to default? This cannot be undone.')) {
            this.data = Storage.reset();
            this.loadPage(this.currentPage);
            alert('Data reset to default.');
        }
    },

    // Clock
    updateClock() {
        const el = document.getElementById('liveTime');
        if (el) {
            el.textContent = new Date().toLocaleTimeString();
        }
    }
};

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});