import mongoose from "mongoose";


console.log("DB_URL:", process.env.DB_URL);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("FINAL_URI:", `${process.env.DB_URL}/${process.env.DB_NAME}`);

const MONGODB_URI = `${process.env.DB_URL}/${process.env.DB_NAME}`// || `mongodb+srv://vikramgecwc_db_user:TSMnx7QtCaaHMcD9@besties.zvtksqb.mongodb.net/alumni-gecwc`;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI not defined");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}