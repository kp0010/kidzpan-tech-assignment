import dotenv from "dotenv"
dotenv.config()

import pg from "pg"

const DATABASE_CONFIG = {
	user: process.env.DATABASE_USER,
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_DB,
	port: process.env.DATABASE_PORT,
};

const db = new pg.Pool(DATABASE_CONFIG)

db.connect(err => {
	if (err) {
		console.log("Error while Connecting to Database: ")
		throw err;
	}
	console.log("Database Connected")
})

export default db;
