// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select sections and navbar links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Intersection Observer Callback
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active')); 
                // Add active class to the currently intersecting link
                navLink.classList.add('active'); 
            }
        });
    };

    // Observer Options
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // Mobile Menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('close');

    // Toggle menu function
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Toggle visibility of the icons
        if (navMenu.classList.contains('active')) {
            hamburger.style.display = 'none'; 
            closeBtn.style.display = 'block';  
        } else {
            hamburger.style.display = 'block';  
            closeBtn.style.display = 'none';   
        }
    });

    // Keep the menu open on link click and smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

            // Get the target section ID from the link href
            const targetID = link.getAttribute('href');
            const targetSection = document.querySelector(targetID);
            const topOffset = targetSection.offsetTop; 

            // Smooth scroll to the target section
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        });
    });
});

// ========================================================================= MODAL AND CATEGORY JS ============================================================================= //

// Select modal and related buttons/elements
const modal = document.getElementById("myWorkModal");
const myWorkBtn = document.getElementById("myWorkBtn");
const closeBtn = document.getElementById("closeBtn");
const categoryButtons = document.querySelectorAll(".category-btn");
const modalBoxes = document.querySelectorAll(".modal-box");

// Show modal when "My Work" is clicked
myWorkBtn.onclick = function () {
    modal.style.display = "block"; 
    // Show all images and add fade-in animation
    modalBoxes.forEach((box, index) => {
        box.style.display = "block";  
        resetAnimation(box); 
        box.style.animationDelay = `${index * 0.1}s`; 
        box.classList.add('fade-in');
    });

    // Set "All" as active by default when opening
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector('[data-category="all"]').classList.add("active");
};

// Close modal when the close button is clicked
closeBtn.onclick = function () {
    modal.style.display = "none"; 
};

// Close modal if user clicks outside the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
};

// Reset animation class
function resetAnimation(box) {
    box.classList.remove('fade-in'); 
    void box.offsetWidth; 
}

// Handle category button clicks to display relevant content
categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active"); 

        // Get the category selected by the user
        const selectedCategory = this.getAttribute("data-category");
        
        // Hide all modal boxes initially
        modalBoxes.forEach(box => {
            box.style.display = "none"; 
            resetAnimation(box); 
        });

        // Display relevant images based on category
        if (selectedCategory === "all") {
            // Show all boxes if "All" is selected
            modalBoxes.forEach((box, index) => {
                box.style.display = "block"; 
                resetAnimation(box); 
                box.style.animationDelay = `${index * 0.1}s`;
                box.classList.add('fade-in'); 
            });
        } else {
            // Show only boxes that match the selected category
            const filteredBoxes = document.querySelectorAll(`.modal-box.${selectedCategory}`);
            filteredBoxes.forEach((box, index) => {
                box.style.display = "block"; 
                resetAnimation(box); 
                box.style.animationDelay = `${index * 0.1}s`; 
                box.classList.add('fade-in'); 
            });
        }
    });
});


// ========================================================================= ENLARGE IMAGE JS ============================================================================= //

// Select the image viewer and large image elements
const imageViewer = document.getElementById("imageViewer");
const largeImage = document.getElementById("largeImage");

// Enlarge image on click
modalBoxes.forEach(box => {
    const img = box.querySelector('img'); 
    img.addEventListener('click', () => {
        // When an image is clicked, display it in the large image viewer
        largeImage.src = img.src;
        imageViewer.style.display = "flex"; 
    });
});

// Close enlarged image on outside click
imageViewer.addEventListener('click', (event) => {
    // If clicked outside the large image, close the viewer
    if (event.target !== largeImage) {
        imageViewer.style.display = "none"; 
    }
});

// ========================================================================= CONTACT JS ============================================================================= //

// Handle contact form submission
const contactForm = document.querySelector('.contact-right form'); // Select the contact form

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    alert("Your message has been submitted!"); 
    contactForm.reset(); 
});
