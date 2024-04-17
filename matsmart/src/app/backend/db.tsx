import mysql from "mysql2/promise";

export async function query({
  query,
  values = [],
}: {
  query: string;
  values?: any[];
}) {
  const dbconnection = await mysql.createConnection({
    host: "mysql.stud.ntnu.no",
    database: "fs_idatt1005_1_bdigsec4_datab",
    user: "fs_idatt1005_1_group_bdigsec4",
    password: "Password",
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error((error as Error).message);
  }
}
