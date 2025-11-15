// ============================================
// ULTIMATE PORTFOLIO JAVASCRIPT - All Features Combined
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ============ Global Variables ============
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.getElementById('progress-bar');
    const backToTop = document.getElementById('back-to-top');
    const themeToggle = document.getElementById('theme-toggle');
    const motionToggle = document.getElementById('motion-toggle');
    const readMoreBtn = document.getElementById('read-more-btn');
    const aboutFull = document.getElementById('about-full');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const projectsGrid = document.getElementById('projects-grid');
    const blogGrid = document.getElementById('blog-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Motion preference
    let motionEnabled = localStorage.getItem('motionEnabled') !== 'false';

    // ============ Initialize AOS Immediately ============
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            offset: 50,
            easing: 'ease-in-out',
            anchorPlacement: 'top-bottom',
            disable: !motionEnabled
        });
    }

    // ============ Loading Screen with Failsafe ============
    let loaderHidden = false;

    function hideLoader() {
        if (loaderHidden) return;
        loaderHidden = true;

        if (loader) {
            loader.classList.add('hide');
        }
        document.body.style.overflow = 'visible';

        // Refresh AOS after page load
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Initialize GSAP animations
        if (typeof gsap !== 'undefined' && motionEnabled) {
            initGSAPAnimations();
        }
    }

    // Primary: Hide on window load
    window.addEventListener('load', () => {
        setTimeout(hideLoader, 1000);
    });

    // Failsafe: Hide after 3 seconds regardless of load event
    setTimeout(hideLoader, 3000);

    // ============ Fixed Particle System for Entire Website ============
    const canvas = document.getElementById('particle-canvas');
    if (canvas && motionEnabled) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;
        let animationId;

        // Set canvas size to full viewport
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 2;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() * 2 - 1) * 0.5;
                this.speedY = (Math.random() * 2 - 1) * 0.5;
                this.speedZ = (Math.random() * 0.02 - 0.01);
                // DodgerBlue (#1E90FF), Yellow (#FFFF00), Red-Orange (#FF3B30)
                this.color = `rgba(${['30, 144, 255', '255, 255, 0', '255, 59, 48'][Math.floor(Math.random() * 3)]}, ${(Math.random() * 0.5 + 0.3).toFixed(2)})`;

            }

            update() {
                this.x += this.speedX * (this.z + 1);
                this.y += this.speedY * (this.z + 1);
                this.z += this.speedZ;

                if (this.z > 2) this.z = 2;
                if (this.z < 0) this.z = 0;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;

                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150 * (this.z + 1);

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const forceX = (dx / distance) * force * 2;
                    const forceY = (dy / distance) * force * 2;
                    this.speedX -= forceX * 0.5;
                    this.speedY -= forceY * 0.5;
                }

                this.speedX *= 0.99;
                this.speedY *= 0.99;
                this.speedX += (Math.random() - 0.5) * 0.05;
                this.speedY += (Math.random() - 0.5) * 0.05;

                const maxSpeed = 1.5;
                const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
                if (speed > maxSpeed) {
                    this.speedX = (this.speedX / speed) * maxSpeed;
                    this.speedY = (this.speedY / speed) * maxSpeed;
                }
            }

            draw() {
                const opacity = (this.z + 1) / 3;
                const size = this.size * (this.z + 1);
                ctx.fillStyle = this.color.replace(/[\d.]+\)/, `${opacity})`);
                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const particleCount = Math.min(150, (canvas.width * canvas.height) / 8000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.3;
                        ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
                        ctx.lineWidth = 0.5 * ((particles[i].z + particles[j].z) / 2 + 1);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            drawConnections();
            animationId = requestAnimationFrame(animate);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        });

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

// ============ Typing Animation ============
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = [
            'Gen AI Developer & Vibe Coder',
            'Robotics Specialist',
            'Space & Biotech Researcher',
            'Deep Learning & AI Ethics Expert',
            'Innovation Architect',
            'Consciousness Explorer',
            'Neuromorphic Engineer'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        typeWriter();
    }
    
    // ============ Stats Counter Animation ============
    const statValues = document.querySelectorAll('.stat-value');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        statValues.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const suffix = stat.dataset.suffix || '';
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 30);
        });
        
        statsAnimated = true;
    }
    
    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && motionEnabled) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ============ Navigation ============
    // Hamburger menu - Fixed for mobile
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        });
    }
    
    // Smooth scroll and active link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu when clicking links
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
            
            if (targetSection) {
                const offset = navbar.offsetHeight + 20;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Scroll events
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar background on scroll
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Progress bar
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (currentScroll / scrollHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollProgress + '%';
        }
        
        // Back to top button
        if (currentScroll > 500) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-nav') === current) {
                link.classList.add('active');
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // Back to top
    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============ Theme Toggle ============
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle?.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    // ============ Motion Toggle ============
    updateMotionIcon(motionEnabled);
    
    motionToggle?.addEventListener('click', () => {
        motionEnabled = !motionEnabled;
        localStorage.setItem('motionEnabled', motionEnabled);
        updateMotionIcon(motionEnabled);
        
        // Toggle animations
        if (!motionEnabled) {
            // Disable animations
            if (animationId) cancelAnimationFrame(animationId);
            document.body.classList.add('reduce-motion');
        } else {
            // Enable animations
            location.reload(); // Reload to reinitialize animations
        }
    });
    
    function updateMotionIcon(enabled) {
        const icon = motionToggle?.querySelector('i');
        if (icon) {
            icon.className = enabled ? 'fas fa-eye' : 'fas fa-eye-slash';
        }
    }
    
    // ============ Read More Toggle ============
    readMoreBtn?.addEventListener('click', () => {
        aboutFull?.classList.toggle('active');
        readMoreBtn.classList.toggle('active');
        const span = readMoreBtn.querySelector('span');
        if (span) {
            span.textContent = aboutFull?.classList.contains('active') ? 'Read Less' : 'Read Full Story';
        }
    });
    
    // ============ Tabs ============
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // ============ Projects Data ============
    const projects = [
        {
            title: 'AI-Powered Object Detection System',
            description: 'Real-time aerial object detection using YOLOv7 on NVIDIA Jetson AGX Xavier for DRDO-DRDL.',
            tech: ['Python', 'YOLOv7', 'CUDA', 'TensorRT', 'OpenCV'],
            video: 'https://drive.google.com/file/d/YOUR_VIDEO_ID/view',
            document: 'https://drive.google.com/file/d/YOUR_DOC_ID/view',
            icon: 'fa-brain',
            category: 'ai'
        },
        {
            title: 'Autonomous Drone Navigation',
            description: 'Developed autonomous navigation system for Tunga aerial vehicle using Pixhawk and Jetson Nano.',
            tech: ['ROS', 'Python', 'C++', 'PX4', 'SLAM'],
            video: 'https://drive.google.com/file/d/YOUR_VIDEO_ID/view',
            document: 'https://drive.google.com/file/d/YOUR_DOC_ID/view',
            icon: 'fa-helicopter',
            category: 'robotics'
        },
        {
            title: 'Neural Style Transfer Engine',
            description: 'Deep learning model for real-time artistic style transfer on images and videos.',
            tech: ['PyTorch', 'Python', 'CUDA', 'Flask', 'React'],
            video: 'https://drive.google.com/file/d/YOUR_VIDEO_ID/view',
            document: 'https://drive.google.com/file/d/YOUR_DOC_ID/view',
            icon: 'fa-palette',
            category: 'ai'
        },
        {
            title: 'Robotic Arm Control System',
            description: 'Precision control system for 6-DOF robotic arm with computer vision integration.',
            tech: ['ROS2', 'MoveIt', 'Python', 'Arduino', 'OpenCV'],
            video: 'https://drive.google.com/file/d/YOUR_VIDEO_ID/view',
            document: 'https://drive.google.com/file/d/YOUR_DOC_ID/view',
            icon: 'fa-robot',
            category: 'robotics'
        },
        {
            title: 'Biotech Data Analysis Pipeline',
            description: 'Machine learning pipeline for genomic data analysis and protein structure prediction.',
            tech: ['Python', 'BioPython', 'TensorFlow', 'R', 'SQL'],
            video: 'https://drive.google.com/file/d/YOUR_VIDEO_ID/view',
            document: 'https://drive.google.com/file/d/YOUR_DOC_ID/view',
            icon: 'fa-dna',
            category: 'research'
        },
        {
            title: 'Space Debris Tracking System',
            description: 'AI-based system for tracking and predicting space debris trajectories.',
            tech: ['Python', 'TensorFlow', 'Astropy', 'OpenCV', 'NumPy'],
            video: 'https://drive.google.com/file/d/YOUR_VIDEO_ID/view',
            document: 'https://drive.google.com/file/d/YOUR_DOC_ID/view',
            icon: 'fa-satellite',
            category: 'research'
        }
    ];
    
    // Render projects
    function renderProjects(projectsToShow = 6) {
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        const displayProjects = projects.slice(0, projectsToShow);
        
        displayProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-aos', 'fade-up');
            projectCard.setAttribute('data-aos-delay', index * 100);
            
            const categoryColor = {
                'ai': 'linear-gradient(135deg, #ff6b35, #ff9558)',
                'robotics': 'linear-gradient(135deg, #ff3b30, #ff6b5a)',
                'research': 'linear-gradient(135deg, #007aff, #5ac8fa)'
            };
            
            projectCard.innerHTML = `
                <div class="project-image" style="background: ${categoryColor[project.category] || categoryColor['ai']}">
                    <i class="fas ${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.video}" target="_blank" aria-label="Watch Video">
                            <i class="fas fa-play-circle"></i>
                            <span>Demo</span>
                        </a>
                        <a href="${project.document}" target="_blank" aria-label="View Document">
                            <i class="fas fa-file-alt"></i>
                            <span>Docs</span>
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Refresh AOS for new elements
        if (typeof AOS !== 'undefined' && motionEnabled) {
            AOS.refresh();
        }
        
        // Apply 3D effects to new cards
        setTimeout(() => {
            init3DEffects();
        }, 100);
    }
    
    renderProjects();
    
    // ============ Blog Data ============
    const blogPosts = [
        {
            title: 'The Convergence of AI and Consciousness',
            excerpt: 'Exploring the philosophical implications of artificial general intelligence and its relationship with human consciousness.',
            category: 'AI',
            date: 'Jan 15, 2025',
            link: '#'
        },
        {
            title: 'Building Autonomous Systems: A Practical Guide',
            excerpt: 'Step-by-step approach to developing autonomous robotic systems using ROS2 and modern control theory.',
            category: 'Robotics',
            date: 'Jan 10, 2025',
            link: '#'
        },
        {
            title: 'Space Technology and the Future of Humanity',
            excerpt: 'How advances in space technology are shaping our understanding of life beyond Earth.',
            category: 'Research',
            date: 'Jan 5, 2025',
            link: '#'
        },
        {
            title: 'Deep Learning in Edge Computing',
            excerpt: 'Optimizing neural networks for deployment on edge devices like NVIDIA Jetson and Raspberry Pi.',
            category: 'AI',
            date: 'Dec 28, 2024',
            link: '#'
        },
        {
            title: 'The Art of System Integration',
            excerpt: 'Lessons learned from integrating complex AI systems in defense applications.',
            category: 'Engineering',
            date: 'Dec 20, 2024',
            link: '#'
        },
        {
            title: 'Biotechnology Meets Machine Learning',
            excerpt: 'Revolutionary applications of ML in genomics and drug discovery.',
            category: 'Research',
            date: 'Dec 15, 2024',
            link: '#'
        }
    ];
    
    let currentBlogIndex = 0;
    const blogsPerLoad = blogPosts.length;
    
    // Render blog posts
    function renderBlogPosts() {
        if (!blogGrid) return;
        
        const endIndex = Math.min(currentBlogIndex + blogsPerLoad, blogPosts.length);
        const postsToShow = blogPosts.slice(currentBlogIndex, endIndex);
        
        postsToShow.forEach((post, index) => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.setAttribute('data-aos', 'fade-up');
            blogCard.setAttribute('data-aos-delay', index * 100);
            
            const categoryColors = {
                'AI': '#ff6b35',
                'Robotics': '#ff3b30',
                'Research': '#007aff',
                'Engineering': '#00c896'
            };
            
            blogCard.innerHTML = `
                <div class="blog-image">
                    <i class="fas fa-newspaper"></i>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">${post.date}</span>
                        <span class="blog-category" style="background: ${categoryColors[post.category] || '#ff6b35'}">${post.category}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="${post.link}" class="blog-read-more">
                        <span>Read More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            blogGrid.appendChild(blogCard);
        });
        
        currentBlogIndex = endIndex;
        
        
        
        // Show scroll back button if more than initial posts are loaded
        const scrollBackBtn = document.getElementById('scroll-back-btn');
        if (scrollBackBtn && currentBlogIndex > blogsPerLoad) {
            scrollBackBtn.style.display = 'inline-flex';
        }
        
        // Refresh AOS for new elements
        if (typeof AOS !== 'undefined' && motionEnabled) {
            AOS.refresh();
        }
        
        // Apply 3D effects to new blog cards
        setTimeout(() => {
            init3DEffects();
        }, 100);
    }
    
    renderBlogPosts();
    
    // Load more blog posts → redirect to full blog page
    loadMoreBtn?.addEventListener('click', () => {
        // Change this URL to wherever you want the button to go
        window.location.href = 'https://your-blog-url-here.com';
    });
    
    // ============ Scroll Back to Top of Blog Section ============
const scrollBackBtn = document.getElementById('scroll-back-btn');
if (scrollBackBtn) {
    scrollBackBtn.addEventListener('click', () => {
        // Reset blog posts to initial load (first 3 posts)
        currentBlogIndex = 0;
        
        // Clear existing blog posts
        if (blogGrid) {
            blogGrid.innerHTML = '';
        }
        
        // Re-render initial blog posts
        renderBlogPosts();
        
        // Show load more button again
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'inline-flex';
        }
        
        // Hide scroll back button
        scrollBackBtn.style.display = 'none';
        
        // Scroll to top of blog section
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            const offset = navbar ? navbar.offsetHeight + 20 : 80;
            const targetPosition = blogSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

    
    // ============ Contact Form ============
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn-submit');
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
            formMessage.style.display = 'block';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // ============ Cursor Trail (Desktop Only) ============
    if (window.innerWidth > 768 && motionEnabled) {
        const cursorTrail = document.getElementById('cursor-trail');
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            const speed = 0.1;
            trailX += (mouseX - trailX) * speed;
            trailY += (mouseY - trailY) * speed;
            
            if (cursorTrail) {
                cursorTrail.style.left = trailX + 'px';
                cursorTrail.style.top = trailY + 'px';
            }
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    }
    
    // ============ GSAP Animations ============
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined') return;
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        gsap.timeline()
            .from('.hero-greeting', { opacity: 0, y: 30, duration: 1 })
            .from('.hero-name', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
            .from('.hero-subtitle', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
            .from('.hero-tagline', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
            .from('.hero-cta .btn', { opacity: 0, y: 30, duration: 1, stagger: 0.2 }, '-=0.5');
        
        // Parallax effect for hero
        gsap.to('.hero-content', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // Specialty cards stagger animation
        gsap.from('.specialty-card', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.specialization-grid',
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Timeline items animation
        gsap.utils.toArray('.timeline-item').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                x: -50,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // ============ Service Worker Registration ============
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('ServiceWorker registered'))
                .catch(err => console.log('ServiceWorker registration failed'));
        });
    }
    
    // ============ Performance Monitoring ============
    if (window.performance && performance.mark) {
        performance.mark('portfolio-interactive');
        
        // Log performance metrics
        window.addEventListener('load', () => {
            if (performance.getEntriesByType) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }
        });
    }
    
    // ============ Keyboard Navigation ============
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Tab key navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // ============ Intersection Observer for Lazy Loading ============
    const lazyElements = document.querySelectorAll('[data-lazy]');
    if (lazyElements.length > 0) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Load lazy content
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        delete element.dataset.src;
                    }
                    lazyObserver.unobserve(element);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyElements.forEach(element => lazyObserver.observe(element));
    }
    
    // ============ Smooth Reveal Animations ============
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.15 });
        
        revealElements.forEach(element => revealObserver.observe(element));
    }
    
    console.log('🚀 Portfolio initialized successfully!');
    
    // ============ Ensure all sections are visible (AOS fix) ============
    // Force all sections to be visible
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Force all section titles to be visible
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '1';
        title.style.visibility = 'visible';
    });
    
    // Force specialization cards to be visible
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    });
    
    // Refresh AOS on scroll to ensure animations work
    window.addEventListener('scroll', () => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, { passive: true });

    // ============ 3D MAGNETIC FEATURES - ULTRA FAST & SMOOTH ============
    function init3DEffects() {
        // Skip on touch devices
        if ('ontouchstart' in window) return;
        
        // ===== ALL CARD TYPES - COMPREHENSIVE SELECTORS =====
        const cardSelectors = [
            // Main card types
            '.project-card', '.blog-card', '.service-card',
            // Specialization section
            '.specialization-card', '.specialty-card', '.spec-card',
            // Experience section
            '.experience-card', '.experience-item', '.timeline-card', '.timeline-item',
            // STATS SECTION - IMPORTANT!
            '.stat-card', '.stats-section .stat-card',
            // Other sections
            '.record-card', '.about-card', '.achievement-card',
            // Tab content
            '.education-card', '.education-item', '.hobby-card', '.hobby-item',
            '.skill-card', '.skill-item', '.tab-pane .card',
            // Generic
            '.card', '.grid-item', '.portfolio-item'
        ];
        
        const cards = document.querySelectorAll(cardSelectors.join(', '));
        
        cards.forEach(card => {
            // Set up for instant response - NO transition on hover
            card.style.transformStyle = 'preserve-3d';
            
            card.addEventListener('mousemove', (e) => {
                if (!motionEnabled) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / rect.height) * -25;
                const rotateY = ((x - rect.width / 2) / rect.width) * 25;
                // INSTANT transform with NO transition
                card.style.transition = 'none';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.03)`;
            });
            
            card.addEventListener('mouseleave', () => {
                // Smooth return with transition
                card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.transform = '';
            });
        });
        
        // ===== HERO BUTTONS - ULTRA SMOOTH MAGNETIC EFFECT =====
        const heroButtons = document.querySelectorAll('.hero-cta .btn, .hero-buttons .btn');
        heroButtons.forEach(btn => {
            let rafId = null;
            let currentX = 0;
            let currentY = 0;
            let targetX = 0;
            let targetY = 0;
            let isHovering = false;
            
            // Set initial state - ensure no transform
            btn.style.transform = 'translate(0px, 0px) scale(1)';
            btn.style.transition = 'transform 0.3s ease';
            
            btn.addEventListener('mouseenter', () => {
                isHovering = true;
                // Remove transition for smooth RAF animation
                btn.style.transition = 'none';
            });
            
            btn.addEventListener('mousemove', (e) => {
                if (!motionEnabled || !isHovering) return;
                const rect = btn.getBoundingClientRect();
                
                // Calculate target position with reduced movement
                targetX = (e.clientX - rect.left - rect.width / 2) * 0.12;
                targetY = (e.clientY - rect.top - rect.height / 2) * 0.05;
                
                // Cancel previous animation frame
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                
                // Smooth animation using requestAnimationFrame
                const animate = () => {
                    if (!isHovering) return; // Stop if no longer hovering
                    
                    // Ease towards target (smoother interpolation)
                    currentX += (targetX - currentX) * 0.15;
                    currentY += (targetY - currentY) * 0.15;
                    
                    btn.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
                    
                    // Continue animation if not close enough to target
                    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                        rafId = requestAnimationFrame(animate);
                    }
                };
                
                rafId = requestAnimationFrame(animate);
            });
            
            btn.addEventListener('mouseleave', () => {
                isHovering = false;
                
                // Cancel any ongoing animation
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                
                // Reset values immediately
                currentX = 0;
                currentY = 0;
                targetX = 0;
                targetY = 0;
                
                // Add transition and reset transform
                btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                btn.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
        
        // ===== READ MORE BUTTON - SPECIAL SMOOTH HOVER =====
        const readMoreBtn = document.querySelector('.btn-read-more, #read-more-btn');
        if (readMoreBtn) {
            readMoreBtn.style.transition = 'all 0.3s ease';
            
            readMoreBtn.addEventListener('mouseenter', () => {
                if (!motionEnabled) return;
                readMoreBtn.style.transform = 'translateY(-3px) scale(1.05)';
                readMoreBtn.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
            });
            
            readMoreBtn.addEventListener('mouseleave', () => {
                readMoreBtn.style.transform = '';
                readMoreBtn.style.boxShadow = '';
            });
        }
        
        // ===== LOAD MORE & SCROLL BACK BUTTONS - SPECIAL MAGNETIC EFFECT =====
        const loadMoreButtons = document.querySelectorAll('#load-more-btn, .load-more, #load-more-projects, #load-more-blogs, #scroll-back-btn');
        loadMoreButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                if (!motionEnabled) return;
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
                btn.style.transition = 'none';
                btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                btn.style.transform = '';
            });
        });
        
        // ===== OTHER BUTTONS - MAGNETIC EFFECT =====
        const buttonSelectors = [
            '.tab-btn', '.filter-btn',
            '.project-links a', '.blog-read-more',
            '.specialty-link', '.record-link',
            '.btn-submit', '.contact-form .btn'
        ];
        
        const buttons = document.querySelectorAll(buttonSelectors.join(', '));
        buttons.forEach(btn => {
            // Skip social icons and hero buttons (already handled)
            if (btn.closest('.social-links') || btn.closest('.hero-cta') || btn.closest('.hero-buttons')) return;
            
            btn.addEventListener('mousemove', (e) => {
                if (!motionEnabled) return;
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.18; // Slightly reduced
                const y = (e.clientY - rect.top - rect.height / 2) * 0.12; // Reduced Y movement
                btn.style.transition = 'none';
                btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                btn.style.transform = '';
            });
        });
        
        // ===== STAT ICONS - SPECIAL PULSE EFFECT =====
        const statIcons = document.querySelectorAll('.stat-icon, .stat-card .stat-icon');
        statIcons.forEach(icon => {
            icon.style.transition = 'transform 0.4s ease';
            
            const card = icon.closest('.stat-card');
            if (card) {
                card.addEventListener('mouseenter', () => {
                    if (motionEnabled) {
                        icon.style.transform = 'scale(1.2) rotateY(360deg)';
                    }
                });
                card.addEventListener('mouseleave', () => {
                    icon.style.transform = '';
                });
            }
        });
        
        // ===== SPINNING ICONS - ALL SECTIONS =====
        const iconSelectors = [
            '.social-link', '.social-icon',
            '.specialty-icon', '.specialization-icon',
            '.service-icon', '.contact-icon',
            '.experience-icon', '.hobby-icon'
        ];
        
        const icons = document.querySelectorAll(iconSelectors.join(', '));
        icons.forEach(icon => {
            icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            icon.addEventListener('mouseenter', () => {
                if (motionEnabled) {
                    icon.style.transform = 'rotateY(360deg) scale(1.15)';
                }
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = '';
            });
        });
    }
    
    // Initialize 3D effects after a delay
    setTimeout(init3DEffects, 2000);

}); // End of DOMContentLoaded
