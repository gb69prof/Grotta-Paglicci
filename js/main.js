document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#navList a");
    const sections = document.querySelectorAll("main .section");
    const navToggle = document.getElementById("navToggle");
    const navList = document.getElementById("navList");

    // Smooth scroll sui link di navigazione
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // Chiudi il menu su mobile dopo il click
                if (window.innerWidth <= 900) {
                    navList.classList.remove("open");
                }
            }
        });
    });

    // Toggle menu laterale su schermi piccoli
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navList.classList.toggle("open");
        });
    }

    // Evidenzia la sezione attiva nella sidebar
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
