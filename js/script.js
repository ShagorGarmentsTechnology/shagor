// ==================== MOBILE MENU TOGGLE ====================
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", function(){
    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
});

// Close menu when link is clicked
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", function(){
        menuToggle.classList.remove("active");
        navbar.classList.remove("active");
    });
});

// Close menu when scrolling
window.addEventListener("scroll", function(){
    if(navbar.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navbar.classList.remove("active");
    }
});

// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById("themeToggle");

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
if(currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    themeToggle.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ==================== SMOOTH HEADER SHADOW ====================
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 80) {
        header.style.background = "#081f4d";
        header.style.boxShadow = "0 10px 20px rgba(0,0,0,.25)";
    } else {
        header.style.background = "#0A2A66";
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,.1)";
    }
});

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll(".count-number");
const speed = 80;
let countersStarted = false;

const startCounters = () => {
    if(countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const update = () => {
            const target = +counter.innerText.replace(/\D/g,'');
            let count = +counter.getAttribute("data-count") || 0;
            const inc = Math.ceil(target / speed);

            if(count < target){
                count += inc;
                if(count > target) count = target;
                counter.setAttribute("data-count", count);
                counter.innerText = count + "+";
                setTimeout(update, 25);
            }
        };
        update();
    });
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelector(".counter") && counterObserver.observe(document.querySelector(".counter"));

// ==================== FADE IN ANIMATION ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll("section, .service-card, .stat, .testimonial-card, .contact-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "1s ease";
    observer.observe(el);
});

// ==================== LIGHTBOX FUNCTIONALITY ====================
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const galleryImages = document.querySelectorAll(".gallery-item img");
let currentImageIndex = 0;

// Open lightbox
document.querySelectorAll(".lightbox-link").forEach((link, index) => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        currentImageIndex = index;
        lightboxImage.src = galleryImages[index].src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// Close lightbox
lightboxClose.addEventListener("click", function() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
});

lightbox.addEventListener("click", function(e) {
    if(e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Previous image
lightboxPrev.addEventListener("click", function() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
});

// Next image
lightboxNext.addEventListener("click", function() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
});

// Keyboard navigation
document.addEventListener("keydown", function(e) {
    if(!lightbox.classList.contains("active")) return;
    if(e.key === "ArrowLeft") lightboxPrev.click();
    if(e.key === "ArrowRight") lightboxNext.click();
    if(e.key === "Escape") lightboxClose.click();
});

// ==================== CONTACT FORM SUBMISSION ====================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if(!name || !email || !message) {
        alert("Please fill in all required fields!");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Send message via WhatsApp
    const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/8801758507568?text=${whatsappMessage}`;
    
    // Also send email
    const mailtoLink = `mailto:mamun507568@gmail.com?subject=New Message from ${name}&body=${message}%0A%0APhone: ${phone}%0AEmail: ${email}`;

    // Open both
    window.open(whatsappURL, "_blank");
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 500);

    // Reset form
    contactForm.reset();
    alert("Thank you! Your message has been sent. We'll contact you soon!");
});

// ==================== FOOTER YEAR ====================
document.getElementById("footerYear").innerHTML = 
    "© " + new Date().getFullYear() + " SHAGOR GARMENTS TECHNOLOGY. All Rights Reserved.";

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #0A2A66;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 999;
    transition: 0.3s;
    box-shadow: 0 5px 15px rgba(0,0,0,.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
    if(window.scrollY > 300) {
        scrollTopBtn.style.display = "flex";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

scrollTopBtn.addEventListener("mouseenter", () => {
    scrollTopBtn.style.background = "#FFD54F";
    scrollTopBtn.style.color = "#000";
});

scrollTopBtn.addEventListener("mouseleave", () => {
    scrollTopBtn.style.background = "#0A2A66";
    scrollTopBtn.style.color = "white";
});
