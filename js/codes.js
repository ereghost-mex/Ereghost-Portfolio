// ============================
// CODE LIBRARY
// ============================

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const codeItems = document.querySelectorAll(".code-item");

// ============================
// SEARCH
// ============================

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    codeItems.forEach(card => {

        const title = card.querySelector("h4").textContent.toLowerCase();

        const desc = card.querySelector("p").textContent.toLowerCase();

        const tags = card.textContent.toLowerCase();

        if (
            title.includes(value) ||
            desc.includes(value) ||
            tags.includes(value)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// ============================
// FILTER BUTTONS
// ============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class

        filterButtons.forEach(btn => {

            btn.classList.remove("btn-warning");
            btn.classList.remove("active");

            btn.classList.add("btn-outline-warning");

        });

        // Add active

        button.classList.remove("btn-outline-warning");

        button.classList.add("btn-warning");
        button.classList.add("active");

        const category = button.dataset.category;

        codeItems.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// ============================
// CARD HOVER EFFECT
// ============================

codeItems.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".35s";

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// ============================
// SCROLL ANIMATION
// ============================

window.addEventListener("scroll", () => {

    codeItems.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.classList.add("show");

        }

    });

});

// ============================
// TOTAL PROJECT COUNT
// ============================

const total = document.querySelectorAll(".code-item").length;

console.log("Total Code Projects : " + total);

// ============================
// SEARCH CLEAR
// ============================

searchInput.addEventListener("search", () => {

    codeItems.forEach(card => {

        card.style.display = "block";

    });

});

// ============================
// KEYBOARD SHORTCUT
// CTRL + /
// Focus Search
// ============================

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key === "/") {

        e.preventDefault();

        searchInput.focus();

    }

});

// ============================
// PAGE LOADED
// ============================

window.addEventListener("load", () => {

    console.log("Source Code Library Loaded");

});