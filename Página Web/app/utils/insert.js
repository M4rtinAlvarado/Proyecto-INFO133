import pool from "../utils/postgres";

const insertDataToDB = async (query) =>{
    const client = await pool.connect();
    console.log( "Connected to the database!");
    await client.query(query);
    client.release();
};

export default insertDataToDB;