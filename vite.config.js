import {VitePWA} from "vite-plugin-pwa";
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            manifest: {
                name: 'Search awesome developers',
                short_name: 'devfinder',
                description: 'Search users profiles from github.com',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: "assets/favicons/icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "assets/favicons/icon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "assets/favicons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "assets/favicons/icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "assets/favicons/icon-152x152.png",
                        sizes: "152x152",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "assets/favicons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable"
                    },
                    {
                        src: "assets/favicons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ]
            }
        })
    ]
})