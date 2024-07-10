import pool from "../utils/postgres";

const fetchDataFromDB = async (query) =>{
    const client = await pool.connect();
    console.log( "Connected to the database!");
    const result = await client.query(query);
    const data = result.rows;
    client.release();
    return data;
};


export default fetchDataFromDB;