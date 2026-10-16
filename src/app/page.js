import Link from "next/link";
import Image from "next/image";
import dish from "./menu/dishes.json"
import AddToCart from "./menu/AddToCart";

export default function HomePage() {
  const categories = [
    { name: "Fasting", icon: "🌱" },
    { name: "Non-Fasting", icon: "🥩" }
  ];

  const featuredDishes = dish.slice(0, 3)

  return (
    <main>
      <section className="hero">
        <h1>Addis <span>Eats</span></h1>
        <p>Experience the finest traditional Habesha culinary delights and contemporary dishes delivered straight from local kitchens in Addis Ababa.</p>
        <div className="hero-actions">
          <Link href="/menu" className="btn">Explore Menu</Link>
          <Link href="/cart" className="btn btn-outline">View Cart</Link>
        </div>
      </section>

      <div className="page">
        <section className="section">
          <h2 className="section-title">Popular Right Now</h2>
          <div className="dish-grid">
            {featuredDishes.map((dish) => (
              <article key={dish.id} className="dish-card">
                <div className="dish-image">
                  <Image src={dish.image} alt={dish.name} width={400} height={300} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 400px"/>
                </div>
                <div className="dish-body">
                  <h3 className="dish-title">{dish.name}</h3>
                  <p className="dish-desc">{dish.description}</p>
                  <div className="dish-actions">
                    <span className="dish-price">{dish.price}</span>
                    <AddToCart dish={dish} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Browse Categories</h2>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/menu?category=${cat.name}`} className="category-card">
                <span className="category-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
