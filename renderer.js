/*
====================================================
SOAR2024 MALL
Universal Renderer
Version: 1.0
====================================================
*/

const Renderer = {

    version: "1.0",

    config: null,

    /*
    ================================================
    Initialise Renderer
    ================================================
    */

    async initialise() {

        console.log("Renderer starting...");

        await this.loadRendererConfig();

        await this.loadTemplates();

        console.log("Renderer ready.");

    },

    /*
    ================================================
    Load renderer.json
    ================================================
    */

    async loadRendererConfig() {

        try {

            const response = await fetch(
                "https://soar2024-mall.github.io/firebase/renderer.json"
            );

            this.config = await response.json();

            console.log("renderer.json loaded");

        }

        catch (error) {

            console.error(
                "Unable to load renderer.json",
                error
            );

        }

    },

    /*
    ================================================
    Load Header, Navigation and Footer
    ================================================
    */

    async loadTemplates() {

        if (!this.config) {

            console.error("Renderer configuration missing.");

            return;

        }

        await this.loadHtml(
            this.config.header,
            "header-container"
        );

        await this.loadHtml(
            this.config.navigation,
            "navigation-container"
        );

        await this.loadHtml(
            this.config.footer,
            "footer-container"
        );

    },

    /*
    ================================================
    Load HTML Template
    ================================================
    */

    async loadHtml(url, targetId) {

        try {

            const response = await fetch(url);

            const html = await response.text();

            const target = document.getElementById(targetId);

            if (target) {

                target.innerHTML = html;

            }

            else {

                console.warn(
                    `Container '${targetId}' not found.`
                );

            }

        }

        catch (error) {

            console.error(
                `Unable to load ${url}`,
                error
            );

        }

    }

};

/*
====================================================
Start Renderer
====================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => Renderer.initialise()
);
