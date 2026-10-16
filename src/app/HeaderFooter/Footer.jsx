import Link from "next/link"
export default function Footers() {
    return(
        <footer className="site-footer">
            <div className="newsletter">
                <div>
                    <h3>Taste Updates</h3>
                    <p>Subscribe to get weekly hidden gem restaurant recommendations.</p>
                </div>
                <form className="footer-form">
                    <input type="email" placeholder="Your email address" required aria-label="Email address" />
                    <button type="submit">Join</button>
                </form>
            </div>

            <div className="footer-grid">
                <div className="footer-col">
                    <h3>Addis Eats</h3>
                    <p>Discovering the best culinary experiences, traditional tastes, and modern dining hidden across Addis Ababa.</p>
                </div>

                <div className="footer-col">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link href="/menu">Find Restaurants</Link></li>
                        <li><Link href="/menu">Cultural Food</Link></li>
                        <li><Link href="/blog">Food Stories</Link></li>
                        <li><Link href="/contact">Get in Touch</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Top Hubs</h4>
                    <ul>
                        <li>Bole District</li>
                        <li>Sarbet Cafes</li>
                        <li>Traditional Heritage Eats</li>
                        <li>Kazanchis Nightlife</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div>
                    &copy; {new Date().getFullYear()} <strong>Addis Eats</strong>. All rights reserved. Built for food lovers in Addis Ababa.
                </div>
                <div className="footer-legal">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}
