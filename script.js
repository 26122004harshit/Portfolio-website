const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  // Toggle the 'active' class on the burger menu
  burger.classList.toggle('active');
  // Toggle the 'active' class on the navigation links
  navLinks.classList.toggle('active');
});

// Scroll to section function
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Get form values
          const formData = {
              name: document.getElementById('name').value,
              phone: document.getElementById('phone').value,
              email: document.getElementById('email').value,
              service: document.getElementById('service').value,
              message: document.getElementById('message').value
          };

          // Validate form
          if (!validateForm(formData)) {
              return;
          }

          // Show success message
          showToast('Message sent!', 'Thank you for reaching out. I\'ll get back to you soon.');
          
          // Reset form
          contactForm.reset();
      });
  }
});

// Form validation
function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,12}$/;

  if (data.name.length < 2) {
      showToast('Error', 'Name must be at least 2 characters');
      return false;
  }

  if (!phoneRegex.test(data.phone)) {
      showToast('Error', 'Please enter a valid phone number');
      return false;
  }

  if (!emailRegex.test(data.email)) {
      showToast('Error', 'Please enter a valid email address');
      return false;
  }

  if (!data.service) {
      showToast('Error', 'Please select a service');
      return false;
  }

  if (data.message.length < 10) {
      showToast('Error', 'Message must be at least 10 characters');
      return false;
  }

  return true;
}

// Toast notification
function showToast(title, message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
      <h4>${title}</h4>
      <p>${message}</p>
  `;
  document.body.appendChild(toast);

  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
      .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--primary);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
          z-index: 1000;
      }
      
      .toast h4 {
          margin: 0 0 0.5rem 0;
          color: var(--primary);
      }
      
      .toast p {
          margin: 0;
          font-size: 0.9rem;
      }
      
      @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
      }
      
      @keyframes fadeOut {
          to { opacity: 0; }
      }
  `;
  document.head.appendChild(style);

  // Remove toast after 3 seconds
  setTimeout(() => {
      toast.remove();
      style.remove();
  }, 3000);
}
