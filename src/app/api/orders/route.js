import order from "../order.json";
export async function GET() {
    return Response.json(order);
}