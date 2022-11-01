const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
    dest: "public",
    disable: prod ? false : true,
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
