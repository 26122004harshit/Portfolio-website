document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const toast = document.getElementById('toast');

    // Validation schemas
    const schema = {
        name: {
            required: true,
            minLength: 1,
            message: 'Name is required'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            minLength: 10,
            message: 'Phone number must be at least 10 digits'
        },
        service: {
            required: true,
            message: 'Please select a service type'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        }
    };

    // Show toast message
    function showToast(message, type = 'success') {
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // Validate form field
    function validateField(field) {
        const value = field.value.trim();
        const rules = schema[field.name];
        const errorElement = field.parentElement.querySelector('.error-message');
        
        if (rules.required && !value) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        if (rules.minLength && value.length < rules.minLength) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }

    // Show error message
    function showError(field, errorElement, message) {
        field.parentElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Hide error message
    function hideError(field, errorElement) {
        field.parentElement.classList.remove('error');
        errorElement.style.display = 'none';
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Validate all fields
        form.querySelectorAll('input, textarea, select').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
            formData[field.name] = field.value.trim();
        });
        
        if (!isValid) return;
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        spinner.style.display = 'block';
        
        try {
            // Simulate API call - Replace with your actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error('Failed to send message');
            
            showToast('Message sent successfully!');
            form.reset();
        } catch (error) {
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            spinner.style.display = 'none';
        }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => validateField(field));
    });
});
