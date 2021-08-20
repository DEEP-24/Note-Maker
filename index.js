require("./configs/dotenv");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const client = require("./configs/db");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to database!");
});
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.redirect("/pages");
});

//authentication related routes
app.use("/auth", authRoutes);

//notes modification related routes
app.use("/note", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
