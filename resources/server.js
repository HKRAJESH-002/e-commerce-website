
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());


const pool = new Pool({
user: "postgres",
host: "localhost",
database: "website",
password: "1234",
port: 5432,
});


app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "login.html"));
});


app.use(express.static(__dirname));


app.post("/register", async (req, res) => {
let { email, password } = req.body;


try {
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const checkUser = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if (checkUser.rows.length > 0) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });

} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
}


});


app.post("/login", async (req, res) => {
let { email, password } = req.body;


try {
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const user = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if (user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(
        password,
        user.rows[0].password
    );

    if (!valid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });

} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
}


});


app.listen(3000, () => {
console.log("🚀 Server running at http://localhost:3000");
});
