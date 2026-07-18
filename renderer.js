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

    async initialise() {

        console.log("Renderer starting...");

        await this.loadRendererConfig();

        console.log("Renderer ready.");

    },

    async loadRendererConfig() {

        try {

            const response = await fetch(
                "/firebase/_data/MALL/renderer.json"
            );

            this.config = await response.json();

            console.log("renderer.json loaded");

        }

        catch(error){

            console.error(
                "Unable to load renderer.json",
                error
            );

        }

    }

};

document.addEventListener(
    "DOMContentLoaded",
    () => Renderer.initialise()
);
