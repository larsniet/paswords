const withPWA = require("next-pwa")({
    dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["picsum.photos"],
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
};

module.exports = withPWA(nextConfig);
