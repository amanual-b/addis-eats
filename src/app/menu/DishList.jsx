import Link from "next/link";
import Image from "next/image";
import AddToCart from "./AddToCart";
import CategoryBar from "./CategoryBar";

export default function DishList({dishes}){
    return(
        <main className="page">
            <h2 className="page-title">Our Menu</h2>
            <CategoryBar>
                {dishes.length === 0 && <p className="status-text">No dishes match your search.</p>}
                <div className="dish-grid">
                    {dishes.map(dish=>(
                        <article key={dish.id} className="dish-card">
                            <div className="dish-image">
                                <Image src={dish.image} alt={dish.name} width={400} height={300} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 400px" />
                            </div>
                            <div className="dish-body">
                                <h3 className="dish-title">{dish.name} {dish.spicy && <span className="tag">Spicy</span>}</h3>
                                <p className="dish-desc">{dish.description}</p>
                                <div className="dish-actions">
                                    <span className="dish-price">{dish.price}</span>
                                    <Link href={`/menu/${dish.name}`} className="dish-link">Details</Link>
                                    <AddToCart dish={dish} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </CategoryBar>
        </main>
    )
}
