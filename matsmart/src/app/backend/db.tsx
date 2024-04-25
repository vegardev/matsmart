import mysql from "mysql2/promise";

/**
 * Executes a query on the production database.
 * @param {Object} param0 - An object containing the SQL query string and an optional array of values to be inserted into the query.
 * @param {string} param0.query - The SQL query string.
 * @param {any[]} [param0.values] - An array of values to be inserted into the query.
 * @returns {Promise<any>} A promise that resolves to the results of the query.
 * @throws {Error} When there is an error executing the database query.
 */
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

/**
 * Executes a query on the test database.
 * @param {Object} param0 - An object containing the SQL query string and an optional array of values to be inserted into the query.
 * @param {string} param0.query - The SQL query string.
 * @param {any[]} [param0.values] - An array of values to be inserted into the query.
 * @returns {Promise<any>} A promise that resolves to the results of the query.
 * @throws {Error} When there is an error executing the database query.
 */
export async function testquery({
  query,
  values = [],
}: {
  query: string;
  values?: any[];
}) {
  const dbconnetion = await mysql.createConnection({
    host: "mysql.stud.ntnu.no",
    database: "fs_idatt1005_1_bdigsec4_test",
    user: "fs_idatt1005_1_group_bdigsec4",
    password: "Password",
  });

  try {
    const [results] = await dbconnetion.execute(query, values);
    dbconnetion.end();
    return results;
  } catch (error) {
    throw Error((error as Error).message);
  }
}
