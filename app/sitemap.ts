import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
    return ["", "/mothers-daughter", "/grace", "/limestone", "/gallery", "/privacy"].map(path => ({ url: `https://www.limestone.band${path}` }));
}
