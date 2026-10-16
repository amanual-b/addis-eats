import order from "../../order.json";
export async function GET( request ,{ params }) {
    const { user } = await params;
    const singleDish = order.filter(d=> d.user === Number(user))
    if (singleDish.length) {
        return Response.json(singleDish);
    }
    return Response.json({message: "could Not find your order"}, {status: 404});
}