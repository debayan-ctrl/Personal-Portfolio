// Smooth scroll to element function
function scrollToElement(elementSelector, offset = 0) {
    const element = document.querySelector(elementSelector);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Main functionality when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll functionality
    const navLinks = {
        link1: document.getElementById("link1"), // Features
        link2: document.getElementById("link2"), // Pricing
        link3: document.getElementById("link3")  // About
    };

    // Add click handlers for navigation
    if (navLinks.link1) {
        navLinks.link1.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.container:nth-of-type(2)', 80);
        });
    }

    if (navLinks.link2) {
        navLinks.link2.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.pricing', 80);
        });
    }

    if (navLinks.link3) {
        navLinks.link3.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('footer', 0);
        });
    }

    // Handle button clicks
    document.querySelectorAll('.btn').forEach(button => {
        const btnText = button.textContent.toLowerCase();
        
        // Hire Me button - opens hire form
        if (btnText.includes('hire')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'hire-form.html';
            });
        }
        
        // Get Started button - opens streams page
        if (btnText.includes('get started')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'streams.html';
            });
        }
    });
});

// Form handling for hire-form.html
if (document.getElementById('hireForm')) {
    const form = document.getElementById('hireForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Processing...';
            
            // Collect form data
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simulate form submission (replace with actual fetch() in production)
            console.log('Form data:', formValues);
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('✅ Thank you! Your request has been submitted successfully.', 'success');
            form.reset();
            
            // Optional: Redirect after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
            
        } catch (error) {
            showNotification('❌ There was an error submitting your form. Please try again.', 'error');
            console.error('Submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Handle "Get Started" buttons on streams page
if (document.querySelector('.stream-card .btn')) {
    document.querySelectorAll('.stream-card .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'hire-form.html';
        });
    });
}