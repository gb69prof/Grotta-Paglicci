
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#navList a");
    const sections = document.querySelectorAll("main .section");
    const navToggle = document.getElementById("navToggle");
    const navList = document.getElementById("navList");

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // Close menu on mobile
                if (window.innerWidth <= 900) {
                    navList.classList.remove("open");
                }
            }
        });
    });

    // Toggle menu on mobile
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navList.classList.toggle("open");
        });
    }

    // Highlight active section on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href").slice(1) === id
                        );
                    });
                }
            });
        },
        {
            root: null,
            threshold: 0.4
        }
    );

    sections.forEach(section => observer.observe(section));
});
