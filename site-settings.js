```javascript
/*
 * Secret Unblocked XY - Shared Settings
 *
 * Add this to every game page:
 *
 * <script src="site-settings.js"></script>
 *
 * It reads the settings saved by the main site and applies:
 * - Light / Dark Mode
 * - Classic Font
 * - Hide Listen
 * - Disguise / favicon
 */

(function () {
    function getSettings() {
        return {
            theme: localStorage.getItem("siteTheme") || "dark",
            classicFont: localStorage.getItem("classicFont") === "true",
            hideListen: localStorage.getItem("hideListen") === "true",
            disguise: localStorage.getItem("siteDisguise") || "none"
        };
    }

    function applySettings() {
        const settings = getSettings();
        const root = document.documentElement;

        // Theme colors
        const light = settings.theme === "light";

        root.style.setProperty(
            "--bg",
            light ? "#f5f5f7" : "#0b0b0f"
        );

        root.style.setProperty(
            "--surface",
            light ? "#ffffff" : "#15161c"
        );

        root.style.setProperty(
            "--surface-hover",
            light ? "#eeeef2" : "#1a1b22"
        );

        root.style.setProperty(
            "--border",
            light ? "#dedee5" : "#252630"
        );

        root.style.setProperty(
            "--border-strong",
            light ? "#c9c9d2" : "#30313a"
        );

        root.style.setProperty(
            "--text",
            light ? "#111116" : "#ffffff"
        );

        root.style.setProperty(
            "--muted",
            light ? "#5f606b" : "#a9aab4"
        );

        root.style.setProperty(
            "--muted-2",
            light ? "#70717c" : "#8e909c"
        );

        // Classic Font
        root.classList.toggle(
            "classic-font",
            settings.classicFont
        );

        // Hide Listen
        document.body.classList.toggle(
            "hide-listen",
            settings.hideListen
        );

        // Font CSS
        let style = document.getElementById(
            "secret-unblocked-settings-style"
        );

        if (!style) {
            style = document.createElement("style");
            style.id = "secret-unblocked-settings-style";
            document.head.appendChild(style);
        }

        style.textContent = `
            html.classic-font,
            html.classic-font body {
                font-family:
                    "Google Sans",
                    "Google Sans Text",
                    "Product Sans",
                    Arial,
                    Helvetica,
                    sans-serif !important;
            }

            body.hide-listen .embed-toggle,
            body.hide-listen .embed-panel,
            body.hide-listen #embedToggle,
            body.hide-listen #embedPanel {
                display: none !important;
            }
        `;

        // Disguise
        const disguises = {
            word: {
                title: "Microsoft Word",
                favicon:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Microsoft_Office_Word_%282025%E2%80%93present%29.svg/960px-Microsoft_Office_Word_%282025%E2%80%93present%29.svg.png"
            },

            classroom: {
                title: "Google Classroom",
                favicon:
                    "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-classroom-icon.png"
            },

            powerpoint: {
                title: "Microsoft PowerPoint",
                favicon:
                    "https://static.vecteezy.com/system/resources/thumbnails/027/179/348/small_2x/microsoft-power-point-icon-logo-symbol-free-png.png"
            },

            google: {
                title: "Google",
                favicon:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/3840px-Google_Favicon_2025.svg.png"
            }
        };

        if (settings.disguise === "none") {
            document.title = document.title;
        } else if (disguises[settings.disguise]) {
            document.title = disguises[settings.disguise].title;

            let icon = document.querySelector(
                "link[rel='icon']"
            );

            if (!icon) {
                icon = document.createElement("link");
                icon.rel = "icon";
                document.head.appendChild(icon);
            }

            icon.href =
                disguises[settings.disguise].favicon;
        }
    }

    // Apply as soon as possible.
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            applySettings
        );
    } else {
        applySettings();
    }

    // If settings are changed in another tab, update automatically.
    window.addEventListener("storage", function (event) {
        if (
            [
                "siteTheme",
                "classicFont",
                "hideListen",
                "siteDisguise"
            ].includes(event.key)
        ) {
            applySettings();
        }
    });
})();
```
