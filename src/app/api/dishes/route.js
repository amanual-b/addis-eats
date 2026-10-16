import dishes from "./../../menu/dishes.json";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase().trim() || "";
    if (!query) {
        return Response.json(dishes);
    }
    const filteredDishes = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(query)
    );

    return Response.json(filteredDishes);
}