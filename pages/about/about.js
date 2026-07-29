// About Page Module
const AboutPage = {
    currentTab: 'content',
    
    render(container, data) {
        const aboutData = data.content.about || {};
        
        container.innerHTML = `
            <div class="card-admin p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-bold text-lg">
                        <i class="fas fa-info-circle text-pink-600 mr-2"></i>About Page Manager
                    </h3>
                    <span class="badge-soft">${data.sections.about?.length || 0} sections</span>
                </div>
                
                <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    <button class="tab-btn ${this.currentTab === 'content' ? 'active' : ''}" onclick="AboutPage.switchTab('content')">
                        <i class="fas fa-pen-fancy mr-1"></i> Content
                    </button>
                    <button class="tab-btn ${this.currentTab === 'team' ? 'active' : ''}" onclick="AboutPage.switchTab('team')">
                        <i class="fas fa-users mr-1"></i> Team
                    </button>
                    <button class="tab-btn ${this.currentTab === 'awards' ? 'active' : ''}" onclick="AboutPage.switchTab('awards')">
                        <i class="fas fa-trophy mr-1"></i> Awards
                    </button>
                    <button class="tab-btn ${this.currentTab === 'sections' ? 'active' : ''}" onclick="AboutPage.switchTab('sections')">
                        <i class="fas fa-layer-group mr-1"></i> Sections
                    </button>
                </div>
                
                <div id="aboutTabContent">
                    ${this.renderTabContent(this.currentTab, aboutData, data)}
                </div>
            </div>
        `;
    },
    
    renderTabContent(tab, aboutData, data) {
        switch(tab) {
            case 'content': return this.renderContent(aboutData);
            case 'team': return this.renderTeam(data);
            case 'awards': return this.renderAwards(data);
            case 'sections': return this.renderSections(data);
            default: return '<p class="text-gray-500">Select a tab</p>';
        }
    },
    
    renderContent(aboutData) {
        let html = `
            <div class="space-y-6">
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-edit text-pink-600 mr-2"></i>Edit About Page Content
                </h4>
        `;
        
        // Hero
        if (aboutData.hero) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-star text-yellow-500 mr-2"></i>Hero Section</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Heading</label>
                            <input type="text" value="${aboutData.hero.heading || ''}" 
                                   onchange="AboutPage.updateContent('hero', 'heading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Subheading</label>
                            <input type="text" value="${aboutData.hero.subheading || ''}" 
                                   onchange="AboutPage.updateContent('hero', 'subheading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-xs font-medium text-gray-500">Paragraph</label>
                            <textarea onchange="AboutPage.updateContent('hero', 'paragraph', this.value)" 
                                      class="mt-1 text-sm" rows="2">${aboutData.hero.paragraph || ''}</textarea>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Intro
        if (aboutData.intro) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-user-md text-blue-500 mr-2"></i>Intro Section</h5>
                    <div class="grid grid-cols-1 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Heading</label>
                            <input type="text" value="${aboutData.intro.heading || ''}" 
                                   onchange="AboutPage.updateContent('intro', 'heading', this.value)" 
                                   class="mt-1 text-sm" />
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500">Paragraph</label>
                            <textarea onchange="AboutPage.updateContent('intro', 'paragraph', this.value)" 
                                      class="mt-1 text-sm" rows="4">${aboutData.intro.paragraph || ''}</textarea>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Testimonials
        if (aboutData.testimonials) {
            html += `
                <div class="border rounded-xl p-4 bg-gray-50">
                    <h5 class="font-semibold text-gray-700 mb-3"><i class="fas fa-quote-right text-purple-500 mr-2"></i>Testimonials</h5>
                    <div>
                        <label class="block text-xs font-medium text-gray-500">Heading</label>
                        <input type="text" value="${aboutData.testimonials.heading || ''}" 
                               onchange="AboutPage.updateContent('testimonials', 'heading', this.value)" 
                               class="mt-1 text-sm" />
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        return html;
    },
    
    renderTeam(data) {
        // Team data would be in content.about.team
        const team = data.content.about?.team || { members: [] };
        let html = `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-users text-blue-600 mr-2"></i>Team Management
                </h4>
                <div class="space-y-3">
                    ${team.members ? team.members.map((member, idx) => `
                        <div class="border rounded-xl p-4 bg-gray-50">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div>
                                    <label class="block text-xs font-medium text-gray-500">Name</label>
                                    <input type="text" value="${member.name || ''}" 
                                           onchange="AboutPage.updateTeamMember(${idx}, 'name', this.value)" 
                                           class="mt-1 text-sm" />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500">Title</label>
                                    <input type="text" value="${member.title || ''}" 
                                           onchange="AboutPage.updateTeamMember(${idx}, 'title', this.value)" 
                                           class="mt-1 text-sm" />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500">Image</label>
                                    <input type="text" value="${member.image || ''}" 
                                           placeholder="/images/team/name.jpg"
                                           onchange="AboutPage.updateTeamMember(${idx}, 'image', this.value)" 
                                           class="mt-1 text-sm" />
                                </div>
                                <div class="flex items-end">
                                    <button onclick="AboutPage.removeTeamMember(${idx})" class="text-rose-500 hover:text-rose-700 text-sm">
                                        <i class="fas fa-trash-alt mr-1"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('') : '<p class="text-gray-400 text-sm">No team members added yet.</p>'}
                    <button onclick="AboutPage.addTeamMember()" class="text-sm text-pink-600 hover:underline">
                        <i class="fas fa-plus mr-1"></i> Add Team Member
                    </button>
                </div>
            </div>
        `;
        return html;
    },
    
    renderAwards(data) {
        const awards = data.content.about?.awards || { items: [] };
        let html = `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-trophy text-yellow-600 mr-2"></i>Awards & Achievements
                </h4>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Heading</label>
                    <input type="text" value="${awards.heading || ''}" 
                           onchange="AboutPage.updateAwardsHeading(this.value)" 
                           class="mt-1 text-sm mb-4" />
                </div>
                <div class="space-y-2">
                    ${awards.items ? awards.items.map((item, idx) => `
                        <div class="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                            <span class="text-gray-400 text-sm">${idx + 1}.</span>
                            <input type="text" value="${item}" 
                                   onchange="AboutPage.updateAwardItem(${idx}, this.value)" 
                                   class="flex-1 text-sm" />
                            <button onclick="AboutPage.removeAwardItem(${idx})" class="text-rose-400 hover:text-rose-600">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('') : '<p class="text-gray-400 text-sm">No awards added.</p>'}
                    <button onclick="AboutPage.addAwardItem()" class="text-sm text-pink-600 hover:underline">
                        <i class="fas fa-plus mr-1"></i> Add Award
                    </button>
                </div>
            </div>
        `;
        return html;
    },
    
    renderSections(data) {
        const sections = data.sections.about || [];
        return `
            <div>
                <h4 class="font-semibold text-gray-700 mb-4">
                    <i class="fas fa-layer-group text-purple-600 mr-2"></i>Manage About Sections
                </h4>
                <div class="space-y-2">
                    ${sections.map((sec, idx) => `
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded border">
                            <span class="font-medium capitalize">${sec.replace('-',' ')}</span>
                            <button onclick="AboutPage.removeSection(${idx})" class="text-rose-400 hover:text-rose-600 text-sm">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <button onclick="AboutPage.addSection()" class="mt-4 text-sm text-pink-600 hover:underline">
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
        if (!App.data.content.about) App.data.content.about = {};
        if (!App.data.content.about[section]) App.data.content.about[section] = {};
        App.data.content.about[section][field] = value;
        Storage.save(App.data);
    },
    
    updateTeamMember(index, field, value) {
        if (!App.data.content.about.team) App.data.content.about.team = { members: [] };
        if (!App.data.content.about.team.members[index]) App.data.content.about.team.members[index] = {};
        App.data.content.about.team.members[index][field] = value;
        Storage.save(App.data);
    },
    
    addTeamMember() {
        if (!App.data.content.about.team) App.data.content.about.team = { members: [] };
        App.data.content.about.team.members.push({ name: 'New Member', title: 'Position', image: '/images/team/default.jpg' });
        Storage.save(App.data);
        this.switchTab('team');
    },
    
    removeTeamMember(index) {
        if (confirm('Remove this team member?')) {
            App.data.content.about.team.members.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('team');
        }
    },
    
    updateAwardsHeading(value) {
        if (!App.data.content.about.awards) App.data.content.about.awards = { items: [] };
        App.data.content.about.awards.heading = value;
        Storage.save(App.data);
    },
    
    updateAwardItem(index, value) {
        if (App.data.content.about.awards && App.data.content.about.awards.items) {
            App.data.content.about.awards.items[index] = value;
            Storage.save(App.data);
        }
    },
    
    addAwardItem() {
        if (!App.data.content.about.awards) App.data.content.about.awards = { items: [] };
        App.data.content.about.awards.items.push('New Achievement');
        Storage.save(App.data);
        this.switchTab('awards');
    },
    
    removeAwardItem(index) {
        if (App.data.content.about.awards && App.data.content.about.awards.items) {
            App.data.content.about.awards.items.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('awards');
        }
    },
    
    removeSection(index) {
        if (confirm('Remove this section?')) {
            App.data.sections.about.splice(index, 1);
            Storage.save(App.data);
            this.switchTab('sections');
        }
    },
    
    addSection() {
        const newSection = prompt('Enter section name:');
        if (newSection && newSection.trim()) {
            App.data.sections.about.push(newSection.trim().toLowerCase());
            Storage.save(App.data);
            this.switchTab('sections');
        }
    }
};