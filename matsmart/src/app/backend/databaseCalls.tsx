import { query } from "@/src/app/backend/db";
import { Item_database } from "@/src/app/backend/definitions";

console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
export async function fetchDatabaseTest(): Promise<Item_database[]> {
  try {
    const dbtest = await query({
      query: "SELECT * FROM item_database",
      values: [],
    });
    return dbtest as Item_database[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
