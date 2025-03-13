import { TABLE_DEFAULT_PAGE, TABLE_DEFAULT_SIZE } from "@/config";
import { advocates } from "@/db/schema";
import { db } from "@/db/setup";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Function to generate the search condition SQL query
const getSearchCondition = (search: string) => {
  return sql`(${advocates.firstName} ILIKE ${`%${search}%`} OR 
    ${advocates.lastName} ILIKE ${`%${search}%`} OR 
    ${advocates.city} ILIKE ${`%${search}%`} OR 
    ${advocates.degree} ILIKE ${`%${search}%`} OR 
    ${advocates.specialties}::text ILIKE ${"%" + search + "%"} OR
    ${advocates.yearsOfExperience}::text ILIKE ${`%${search}%`} OR 
    ${advocates.phoneNumber}::text ILIKE ${`%${search}%`})`;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(
    searchParams.get("page") || `${TABLE_DEFAULT_PAGE}`,
    10
  );
  const pageSize = parseInt(
    searchParams.get("pageSize") || `${TABLE_DEFAULT_SIZE}`,
    10
  );
  const search = searchParams.get("search") || "";

  // Validate input: Allow only alphanumeric characters and spaces
  const isValid = /^[a-zA-Z0-9\s]*$/.test(search);
  if (!isValid) {
    return NextResponse.json(
      {
        error:
          "Invalid input: Only alphanumeric characters and spaces are allowed.",
      },
      { status: 400 }
    );
  }

  // Sanitize input: Remove any potentially harmful characters
  const sanitizedSearch = search.replace(/[^a-zA-Z0-9\s]/g, "");

  const searchCondition = getSearchCondition(sanitizedSearch);

  // Query to fetch paginated data
  let dataQuery = db
    .select()
    .from(advocates)
    .where(searchCondition)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  // Query to fetch total count of records matching the search condition
  const totalQuery = db
    .select({ count: sql`COUNT(*)` })
    .from(advocates)
    .where(searchCondition);

  // Execute queries in parallel
  const [data, totalResult] = await Promise.all([dataQuery, totalQuery]);

  const total = parseInt(totalResult[0]?.count as string) || 0;

  const response = { data, total };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  await db.insert(advocates).values(body);

  return NextResponse.json({ message: "Advocate added and cache invalidated" });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updateData } = body;

  await db.update(advocates).set(updateData).where(eq(advocates.id, id));

  return NextResponse.json({
    message: "Advocate updated and cache invalidated",
  });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  await db.delete(advocates).where(eq(advocates.id, id));

  return NextResponse.json({
    message: "Advocate deleted and cache invalidated",
  });
}
