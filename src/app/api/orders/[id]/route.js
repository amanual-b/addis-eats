import order from "../../order.json";
export async function GET( request ,{ params }) {
    const { id } = await params;
    const singleDish = order.find(d=> d.id === Number(id))
    if (singleDish) {
        return Response.json(singleDish);
    }
    return Response.json({message: "could Not find order"}, {status: 404});
}