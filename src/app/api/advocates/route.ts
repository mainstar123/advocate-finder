import { db } from "../../../db/setup";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/mock/advocates";

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = advocateData;

  return Response.json({ data });
}
