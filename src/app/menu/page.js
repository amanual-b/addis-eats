import DishList from "./DishList"
import { Suspense } from "react";
import dishes from "./dishes.json"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
    title: "Menu",
    description: "Doro Wat, Tibs, Kitfo and Shiro, delivered across Addis Ababa.",
    alternates: { canonical: "/menu" },
    openGraph: {
        title: "Menu",
        description: "Doro Wat, Tibs, Kitfo and Shiro, delivered across Addis Ababa.",
        url: "/menu",
        siteName: "Addis Eats",
        type: "website",
        images: [{ url: dishes[0].image, alt: "Addis Eats menu" }],
    },
};

function buildJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Menu",
        name: "Addis Eats Menu",
        url: new URL("/menu", SITE_URL).toString(),
        hasMenuItem: dishes.map(dish => ({
            "@type": "MenuItem",
            name: dish.name,
            description: dish.description,
            image: new URL(`og/${dish.image}`, SITE_URL).toString(),
            url: new URL(`/menu/${encodeURIComponent(dish.name.toString())}`, SITE_URL).toString(),
        })),
    };
}

export const revalidate = 60;
export default async function Menu({searchParams}) {

    const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

    const params = await searchParams;
    const searchFilter = params?.search?.toLowerCase() || "";
    const categoryFilter = params?.category || "All"

    const filteredDishes = dishes.filter((dish) => {
        const matchesName = dish.name.toLowerCase().includes(searchFilter);
        let matchesCategory = true;
        if (categoryFilter === "Fasting") {
            matchesCategory = dish.fasting === true;
        } else if (categoryFilter === "Non-Fasting") {
            matchesCategory = dish.fasting === false;
        }

        return matchesName && matchesCategory;
    });
    return(
            <Suspense fallback={<p className="status-text">Loading dishes...</p>}>
                <DishList dishes={filteredDishes} />
            </Suspense>
    )
}
