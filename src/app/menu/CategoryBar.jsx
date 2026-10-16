"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function CategoryBar({children}){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") || "";

    function updateFilters(key, value) {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value && value !== "All") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
        <div className="toolbar">
            <div className="filters">
                <button onClick={()=>updateFilters("category", "All")}>All</button>
                <button onClick={()=>updateFilters("category", "Fasting")}>Fasting</button>
                <button onClick={()=> updateFilters("category", "Non-Fasting")}>Non-Fasting</button>
            </div>
            <input name="search" value={currentSearch} onChange={(e)=>updateFilters("search", e.target.value)} type="text" placeholder="Search dishes..." aria-label="Search dishes" />
        </div>
        {children}
        </>
        
    )
}
