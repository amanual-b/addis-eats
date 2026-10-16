import Link from "next/link";
import Image from "next/image";
import dishes from "../dishes.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://addis-eats-xi.vercel.app`;

function buildJsonLd(di) {
    const path = `/menu/${encodeURIComponent(di.name)}`;
    return {
        "@context": "https://schema.org",
        "@type": "MenuItem",
        name: di.name,
        description: di.description,
        image: new URL(di.image, SITE_URL).toString(),
        url: new URL(path, SITE_URL).toString(),
    };
}

export async function generateStaticParams() {
    return dishes.map(dish =>({
        name: dish.name.toString()
    }));
}

export async function generateMetadata({ params }) {
    const { name } = await params;
    const di = dishes.find(dish => dish.name.toString() === name.toString())

    if (!di) {
        return { title: "Dish Not Found" };
    }

    const path = `/menu/${encodeURIComponent(di.name)}`;

    return {
        title: di.name, 
        description: di.description,
        alternates: { canonical: path },
        openGraph: {
            title: di.name,
            description: di.description,
            url: path,
            images: [{ url: `og/${di.image}`, alt: di.description }],
        },
    };
}

export default async function DishPage({params}) {
    const {name} = await(params);
    const di = dishes.find(dish => dish.name.toString() === name.toString())

    if (!di) {
        return(<h1 className="status-text">Dish Not Found</h1>)
    }

    const jsonLd = JSON.stringify(buildJsonLd(di)).replace(/</g, "\\u003c");

    return (
        <main className="page">
            <Link href="/menu" className="back-link">&larr; Go back</Link>
            <article className="detail">
                <Image src={di.image} alt={di.description} width={400} height={300} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 400px" />
                <h2>Let's eat: {di.name}</h2>
                <p>{di.description}</p>
                <p className="detail-ingredients"><strong>Ingredients:</strong> {di.ingredients.join(", ")}</p>
            </article>
        </main>
    )
}
