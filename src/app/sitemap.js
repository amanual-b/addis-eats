import dishes from "./menu/dishes.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap() {
    const dishEntries = dishes.map(dish => ({
        url: `${SITE_URL}/menu/${encodeURIComponent(dish.name.toString())}`,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [
        {
            url: SITE_URL,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/menu`,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...dishEntries,
    ];
}