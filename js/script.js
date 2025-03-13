document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                // Scroll to target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some animations for ingredients cards on scroll
    const ingredientCards = document.querySelectorAll('.ingredient-card');
    
    // Simple function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle animations on scroll
    function handleScrollAnimations() {
        ingredientCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }
    
    // Add visible class initially for elements in viewport
    window.addEventListener('load', handleScrollAnimations);
    
    // Add event listener for scroll to animate elements
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Form submission placeholder (would be connected to backend in real implementation)
    const routineForm = document.querySelector('.input-group');
    if (routineForm) {
        routineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const userName = input.value.trim();
            
            if (userName) {
                // Here you would typically send data to a backend
                // For demo purposes, we'll just show an alert
                alert(`Thank you, ${userName}! Your personalized skincare routine is being generated.`);
                input.value = '';
            } else {
                alert('Please enter your name to continue.');
            }
        });
        
        // Also trigger submit when the button is clicked
        const startButton = routineForm.querySelector('button');
        if (startButton) {
            startButton.addEventListener('click', function(e) {
                e.preventDefault();
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                routineForm.dispatchEvent(submitEvent);
            });
        }
    }
}); 