import dishes from "./../../../menu/dishes.json";
export async function GET( request ,{ params }) {
    const { id } = await params;
    const singleDish = dishes.find(d=> d.id === Number(id))
    if (singleDish) {
        return Response.json(singleDish);
    }
    return Response.json({message: "could Not find dishe"}, {status: 404});
}