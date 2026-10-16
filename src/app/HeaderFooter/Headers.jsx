import Link from "next/link";
import Image from "next/image";
import { Client } from "./Client";
import SignInOut from "./SignInOut";

export default function Header() {
    return(
        <header className="site-header">
            <div className="site-header-inner">
                <Link href="/" className="brand" aria-label="Addis Eats home">
                    <Image src="/logo-and-icon/logo4.svg" alt="Addis Eats Logo" width={110} height={60} sizes="(max-width: 900px) 84px, 110px" priority />
                </Link>
                <nav className="nav">
                    <Link href="/">Home</Link>
                    <Link href="/menu">Menu</Link>
                    <Client />
                    <SignInOut />
                </nav>
            </div>
        </header>
    )
}
