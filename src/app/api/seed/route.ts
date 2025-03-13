import { advocateData } from "@/db/mock/advocates";
import { advocates } from "@/db/schema";
import { db } from "@/db/setup";

export async function POST() {
  try {
    const records = await db.insert(advocates).values(advocateData).returning();
    return Response.json({ advocates: records });
  } catch (error) {
    return Response.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
