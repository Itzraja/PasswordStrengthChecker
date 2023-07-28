const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DB_URI = "mongodb://localhost:27017/password_strength";

const { minStepsToMakePasswordStrong } = require("./passwordStrength");

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Password Schema and Model
const passwordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
});

const PasswordModel = mongoose.model("Password", passwordSchema);

// API route to check password strength
app.post("/api/password-strength", async (req, res) => {
  try {
    const { password } = req.body;

    // Check if the password is strong
    const data = minStepsToMakePasswordStrong(password);

    if (data === 0) {
      const passwordDoc = new PasswordModel({ password });
      await passwordDoc.save();
      console.log("Strong password saved to the database.");
    }

    res.json({ data });
  } catch (err) {
    console.error("Error checking password strength:", err);
    res.status(500).json({
      error: "An error occurred while checking the password strength.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
