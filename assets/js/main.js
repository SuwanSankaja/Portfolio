(function() {
  "use strict";

  // Loader
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }, 500);
  });

  // Helper functions
  const select = (el, all = false) => {
    el = el.trim()
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el)
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  // Navigation active state
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  // Smooth scroll
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - 70,
      behavior: 'smooth'
    })
  }

  // Scroll to section on link click
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  // Back to top button
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  // Typed.js
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      cursorChar: '|',
    });
  }

  // Certification filters
  const filterBtns = select('.filter-btn', true);
  const certCards = select('.cert-card', true);

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        certCards.forEach(card => {
          if (filter === '*') {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            if (card.classList.contains(filter.substring(1))) {
              card.style.display = 'block';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 10);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.8)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          }
        });
      });
    });
  }

  // Initialize AOS
  window.addEventListener('load', () => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    })
  });

  // Add parallax effect to hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = select('#hero');
    const codeBackground = select('.code-background');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      if (codeBackground) {
        codeBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }
  });

  // Add hover effect to skill cards
  const skillCards = select('.skill-card', true);
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0)';
    });
  });

  // Updated Contact Form Submission Logic
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Get submit button
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Update button state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      // Send the form data
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
      .then(response => {
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success response:', data);
        
        if (data.message === 'Email sent successfully') {
          // Show success message
          alert('✅ Message sent successfully! I\'ll get back to you soon.');
          
          // Reset the form
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }
      })
      .catch(error => {
        console.error('Contact form error:', error);
        
        // Show user-friendly error message with fallback options
        const errorMessage = `❌ Unable to send message through the contact form.\n\n` +
                            `Please try one of these alternatives:\n` +
                            `📧 Email: suwan.sankaja@gmail.com\n` +
                            `📱 Phone: +94 71 940 6335\n` +
                            `💼 LinkedIn: linkedin.com/in/suwansankaja\n\n` +
                            `Would you like me to open your email client?`;
        
        const useMailto = confirm(errorMessage);
        
        if (useMailto) {
          // Create mailto link with form data
          const { name, email, subject, message } = formObject;
          const emailBody = `Hi Suwan,\n\n` +
                           `Name: ${name}\n` +
                           `Email: ${email}\n\n` +
                           `Message:\n${message}\n\n` +
                           `Best regards,\n${name}`;
          
          const mailtoLink = `mailto:suwan.sankaja@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
          window.location.href = mailtoLink;
        }
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
    });
  }

})();