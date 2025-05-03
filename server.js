// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017"; // Local MongoDB
const client = new MongoClient(uri);

// Middleware
app.use(cors());
app.use(bodyParser.json());

let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db("myDatabase"); // Will be created if not exist
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectToDB();

// Route: Insert user
app.post("/api/users", async (req, res) => {
  try {
    const result = await db.collection("users").insertOne(req.body);
    res.status(200).send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send("Error inserting user");
  }
});

// Route: Get all users
app.get("/api/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.send(users);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
