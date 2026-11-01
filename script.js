
/* =================================
   1. OPENING OUR STORY
================================= */

function startStory() {
    const storySection = document.getElementById("story");

    if (storySection) {
        storySection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =================================
   2. BIRTHDAY SURPRISE
================================= */

function birthdaySurprise() {
    const message = document.getElementById("birthday-message");
    const button = document.querySelector(".cake-area .primary-btn");

    if (!message || !button || button.disabled) {
        return;
    }

    message.style.display = "block";

    button.innerHTML = "Your wish is on its way! ♡";
    button.disabled = true;
    button.style.opacity = "0.7";

    createConfetti();

    message.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/* =================================
   3. CONFETTI EFFECT
================================= */

function createConfetti() {

    const colors = [
        "#d69da9",
        "#eee8f5",
        "#d8bd91",
        "#f5dfe3",
        "#ffffff"
    ];

    const symbols = ["✿", "♡", "✧", "•"];

    for (let i = 0; i < 70; i++) {

        const confetti = document.createElement("div");

        confetti.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";

        confetti.style.fontSize =
            (12 + Math.random() * 18) + "px";

        confetti.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        const duration = 2500 + Math.random() * 2500;

        const horizontalMovement =
            (Math.random() - 0.5) * 180;

        const animation = confetti.animate(
            [
                {
                    transform: "translate(0, 0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform: `translate(${horizontalMovement}px, 105vh) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-in",
                fill: "forwards"
            }
        );

        animation.onfinish = function () {
            confetti.remove();
        };
    }
}


/* =================================
   4. SCROLL REVEAL ANIMATION
================================= */

const revealElements = document.querySelectorAll(
    ".timeline-card, .photo-card, .letter-card, .cake-area"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}


/* =================================
   5. SECRET LOVE MESSAGE
================================= */

function revealSecret() {

    const secret = document.getElementById("secret-message");
    const button = document.querySelector(".secret-btn");

    if (!secret || !button || button.disabled) {
        return;
    }

    secret.style.display = "block";

    button.innerHTML = "A little secret, just for you ♡";

    button.disabled = true;

    secret.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/* =================================
   6. PHOTO GALLERY LIGHTBOX
================================= */

/* Get all gallery photos */

const galleryPhotos = Array.from(
    document.querySelectorAll(".photo-card img")
);

/* Get lightbox elements */

const lightbox = document.getElementById("photo-lightbox");

const lightboxImage = document.getElementById("lightbox-image");

/* Track currently opened photo */

let currentPhotoIndex = 0;


/* =================================
   7. OPEN A PHOTO
================================= */

function showPhoto(index) {

    if (!lightbox || !lightboxImage || galleryPhotos.length === 0) {
        return;
    }

    /* Loop back to the first or last photo */

    currentPhotoIndex =
        (index + galleryPhotos.length) % galleryPhotos.length;

    const selectedPhoto = galleryPhotos[currentPhotoIndex];

    lightboxImage.src = selectedPhoto.src;

    lightboxImage.alt = selectedPhoto.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =================================
   8. NEXT AND PREVIOUS PHOTOS
================================= */

function changePhoto(direction, event) {

    if (event) {
        event.stopPropagation();
    }

    showPhoto(currentPhotoIndex + direction);
}


/* =================================
   9. CLOSE PHOTO VIEWER
================================= */

function closePhoto() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/* =================================
   10. MAKE GALLERY PHOTOS CLICKABLE
================================= */

galleryPhotos.forEach(function (photo, index) {

    photo.addEventListener("click", function () {

        showPhoto(index);

    });

});


/* =================================
   11. PREVENT IMAGE CLICK FROM CLOSING
================================= */

if (lightboxImage) {

    lightboxImage.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}


/* =================================
   12. KEYBOARD CONTROLS
================================= */

document.addEventListener("keydown", function (event) {

    if (!lightbox || !lightbox.classList.contains("active")) {
        return;
    }

    /* Escape closes the viewer */

    if (event.key === "Escape") {

        closePhoto();

    }

    /* Right arrow opens next photo */

    if (event.key === "ArrowRight") {

        changePhoto(1);

    }

    /* Left arrow opens previous photo */

    if (event.key === "ArrowLeft") {

        changePhoto(-1);

    }

});


/* =================================
   13. WEBSITE READY
================================= */

console.log("Your birthday surprise is ready! ♡");
console.log("All memories are waiting to be explored. ✨");
