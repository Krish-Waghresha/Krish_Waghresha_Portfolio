// Page Loader
window.addEventListener('load', () => {
    // Check if particles.js is loaded
    if (typeof particlesJS !== 'undefined') {
        console.log('Particles.js library is loaded');
        initParticles();
    } else {
        console.error('Particles.js library is not loaded');
        // Try to load it manually if needed
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            console.log('Particles.js library loaded manually');
            initParticles();
        };
        document.head.appendChild(script);
    }
    
    setTimeout(() => {
        document.querySelector('.loader-wrapper').classList.add('fade-out');
    }, 1500);
});

// Function to initialize particles
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#0ef'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.7,
                random: false,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.4,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0ef',
                opacity: 0.5,
                width: 1.5
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    console.log('Particles initialized successfully');
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Close mobile menu with button
const navbarClose = document.querySelector('.navbar-close');
if (navbarClose) {
    navbarClose.addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.remove('show');
    });
}

// Text Rotation Animation
class TextRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => {
            this.tick();
        }, delta);
    }
}

window.onload = function() {
    // Remove loader
    setTimeout(() => {
        document.querySelector('.loader-wrapper').classList.add('fade-out');
    }, 1500);
    
    // Text rotation
    const elements = document.getElementsByClassName('text-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TextRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// Initialize AOS with optimized settings for mobile
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  disable: window.innerWidth < 768 ? true : false // Disable on mobile for performance
});

// Active Navigation Link with improved performance
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

// Use throttling to improve scroll performance on mobile
let scrollThrottleTimer;
window.addEventListener('scroll', () => {
  if (!scrollThrottleTimer) {
    scrollThrottleTimer = setTimeout(() => {
      scrollThrottleTimer = null;
      
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollY >= (sectionTop - sectionHeight / 3)) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
    }, 100); // 100ms throttle
  }
});

// Smooth Scrolling optimized for mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu when link is clicked
      if (window.innerWidth < 992) {
          document.querySelector('.navbar-collapse').classList.remove('show');
      }
      
      // Get target element
      const targetID = this.getAttribute('href');
      const targetElement = document.querySelector(targetID);
      
      // Calculate scroll position with offset
      const headerOffset = document.querySelector('.header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Scroll with smooth behavior
      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
      });
  });
});

// Mobile Menu Toggle with improved UX
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
  // Add body class to prevent background scrolling when menu is open
  document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navbarCollapse.classList.contains('show') && 
    !navbarCollapse.contains(e.target) && 
    !navbarToggler.contains(e.target)
  ) {
    navbarCollapse.classList.remove('show');
    document.body.classList.remove('menu-open');
  }
});

// Tilt effect only on desktop
const projectCards = document.querySelectorAll('.project-card');
if (window.innerWidth >= 992) {
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardX = e.clientX - cardRect.left;
            const cardY = e.clientY - cardRect.top;
            
            // Calculate rotation based on mouse position
            const angleY = ((cardX / cardRect.width) - 0.5) * 20; // -10 to 10 degrees
            const angleX = ((cardY / cardRect.height) - 0.5) * -20; // -10 to 10 degrees
            
            // Apply rotation
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            
            // Add spotlight effect
            const x = (cardX / cardRect.width) * 100;
            const y = (cardY / cardRect.height) * 100;
            card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(14, 255, 255, 0.1) 0%, rgba(14, 255, 255, 0) 50%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });
}

// Scroll to top button with better touch area for mobile
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Device-based checks for performance
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Only run intensive animations on non-mobile devices
if (!isMobile) {
    // Enhanced interactive particles
    const updateParticles = () => {
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            const particles = pJSDom[0].pJS.particles;
            
            // Detect scroll position to change particle behavior
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Adjust particle movement based on scroll
            particles.move.speed = 2 + (scrollPercent * 4);
            
            // Change color based on scroll position
            const hue = 180 + (scrollPercent * 60); // Cyan to blue
            particles.color.value = `hsl(${hue}, 100%, 50%)`;
            particles.line_linked.color = `hsl(${hue}, 100%, 50%)`;
            
            // Update particles
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    };

    // Call less frequently to avoid performance issues
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateParticles, 100);
    });
}

// Fix for iOS overscroll effect
document.body.addEventListener('touchmove', function(e) {
    if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}, { passive: false });