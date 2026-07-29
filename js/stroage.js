// Storage Module - Handles all localStorage operations
const Storage = {
    // Default data
    defaultData: {
        pages: ['home', 'about', 'services', 'contact'],
        sections: {
            home: ['hero', 'features', 'partners', 'about', 'counters', 'services', 'appointment', 'testimonials'],
            about: ['hero', 'intro', 'features', 'awards', 'team', 'testimonials'],
            services: ['hero', 'services-grid'],
            contact: ['hero', 'info-cards', 'contact-form']
        },
        content: {
            home: {
                hero: { 
                    heading: 'Your most trusted health partner', 
                    subheading: 'Total health care solution', 
                    paragraph: 'A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium.',
                    buttonText: 'Make Appointment',
                    buttonLink: '#',
                    bgImage: '/images/b_1.jpg'
                }
            },
            about: {
                hero: { 
                    heading: 'Caring beyond boundaries', 
                    subheading: 'About us',
                    paragraph: 'We are a team of dedicated professionals committed to your health and well-being.'
                }
            },
            services: {
                hero: { 
                    heading: 'What We Do', 
                    subheading: 'Our services',
                    paragraph: 'Comprehensive healthcare solutions tailored to your needs.'
                }
            },
            contact: {
                hero: { 
                    heading: 'Get in Touch', 
                    subheading: 'Contact us',
                    paragraph: "We're here to help. Reach out to us anytime."
                }
            }
        },
        media: {
            logos: { main: 'M', text: 'Med Plus' },
            heroBanners: ['/images/b_1.jpg', '/images/b_2.jpg', '/images/b_3.jpg'],
            sectionImages: { about: '/images/a_2.avif', doctor: '/images/dr_1.webp' }
        },
        theme: {
            primary: '#0f2b4b',
            secondary: '#1a3a5e',
            accent: '#ec4899',
            text: '#1e293b',
            heading: '#0f172a',
            background: '#ffffff',
            cardBg: '#ffffff',
            border: '#e2e8f0',
            buttonBg: '#0f2b4b',
            buttonText: '#ffffff',
            hoverBg: '#1a3a5e',
            gradientStart: '#fce7f3',
            gradientEnd: '#eef2ff',
            shadow: '0 8px 30px rgba(0,0,0,0.04)'
        },
        header: { 
            logoText: 'Med Plus', 
            menu: ['Home', 'About', 'Services', 'Contact'], 
            cta: 'Book Appointment' 
        },
        footer: { 
            copyright: 'Med Plus', 
            social: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'],
            contact: { 
                phone: '+91 98765 43210', 
                email: 'Support@email.com', 
                address: '123, MG Road, New Delhi' 
            }
        },
        global: { 
            siteName: 'Novena · Health & Care', 
            favicon: '', 
            email: 'contact@mail.com', 
            phone: '+91 98765 43210', 
            address: '123, MG Road, New Delhi, India' 
        },
        responsive: { 
            desktop: { fontSize: '16px', spacing: '1.5rem' }, 
            tablet: { fontSize: '14px', spacing: '1rem' }, 
            mobile: { fontSize: '12px', spacing: '0.75rem' } 
        }
    },

    // Load data from localStorage
    load() {
        const stored = localStorage.getItem('novena_cms_data');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch(e) {
                return JSON.parse(JSON.stringify(this.defaultData));
            }
        }
        return JSON.parse(JSON.stringify(this.defaultData));
    },

    // Save data to localStorage
    save(data) {
        localStorage.setItem('novena_cms_data', JSON.stringify(data));
    },

    // Reset to default
    reset() {
        this.save(this.defaultData);
        return this.defaultData;
    },

    // Deep merge utility
    merge(target, source) {
        const result = JSON.parse(JSON.stringify(target));
        for (let key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!result[key]) result[key] = {};
                result[key] = this.merge(result[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    }
};