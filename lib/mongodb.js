// lib/mongodb.js
import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI non definita nel file .env");
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(
        "mongodb+srv://gerardonastridev:piNJq5APtNk57s02@cluster0.dr8ryuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
