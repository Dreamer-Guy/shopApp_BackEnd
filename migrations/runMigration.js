import { MongoClient } from "mongodb";
import { up, down } from "./2024-12-01-create-mock-data.js";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb+srv://vinh01515:YrQQXix0hXIPZLD2@cluster0.c6dwy.mongodb.net/doanDB";
const client = new MongoClient(uri);

async function runMigration() {
    try {
        await client.connect();
        const db = client.db(); // Sử dụng tên database từ URI
        const action = process.argv[2]; // Nhận tham số 'up' hoặc 'down'
        if (action === "up") {
            console.log("Running migration: up");
            await up(db, client);
        } else if (action === "down") {
            console.log("Running migration: down");
            await down(db, client);
        } else {
            console.log("Usage: node runMigration.js [up|down]");
        }
    } catch (error) {
        console.error("Migration failed", error);
    } finally {
        await client.close();
        console.log("Migration complete");
    }
}

runMigration();
