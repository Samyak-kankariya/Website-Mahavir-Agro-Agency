let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");
const dots = document.querySelectorAll(".dot");
let slideInterval;

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.display = "none";
        dots[index].classList.remove("active");
    });
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

function startSlideshow() {
    slideInterval = setInterval(showSlides, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides();
    startSlideshow();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        slideIndex = index;
        showSlides();
        startSlideshow();
    });
});

document.querySelector(".slideshow-container").addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
});

document.querySelector(".slideshow-container").addEventListener("mouseleave", () => {
    startSlideshow();
});

document.addEventListener("DOMContentLoaded", function () {
    const enquiryBtn = document.getElementById("enquiryBtn");
    const enquiryForm = document.getElementById("enquiryForm");
    const closeForm = document.getElementById("closeForm");
    const footer = document.querySelector("footer");

    // Show the enquiry form on button click
    enquiryBtn.addEventListener("click", function (event) {
        event.preventDefault();
        enquiryForm.style.display = "block";
    });

    // Hide form when clicking the close button
    closeForm.addEventListener("click", function () {
        enquiryForm.style.display = "none";
    });

    // Hide the enquiry button when the footer is visible
    function toggleEnquiryButton() {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
            enquiryBtn.classList.add("hidden");
            enquiryForm.style.display = "none"; // Hide form too
        } else {
            enquiryBtn.classList.remove("hidden");
        }
    }

    window.addEventListener("scroll", toggleEnquiryButton);
});

document.addEventListener("DOMContentLoaded", function () {
    const enquiryBtn = document.getElementById("enquiryBtn");
    const enquiryForm = document.getElementById("enquiryForm");
    const closeForm = document.getElementById("closeForm");
    const form = enquiryForm.querySelector("form");

    // Show enquiry form
    enquiryBtn.addEventListener("click", function (event) {
        event.preventDefault();
        enquiryForm.style.display = "block";
    });

    // Hide form when clicking close button
    closeForm.addEventListener("click", function () {
        enquiryForm.style.display = "none";
    });

    // Handle Form Submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const response = await fetch("https://agri-agency-website.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();
            alert(data.success || data.error);
            if (response.ok) form.reset();
            enquiryForm.style.display = "none"; // Close form on success
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send enquiry. Try again later.");
        }
    });
});

