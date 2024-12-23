const express = require("express");
const cors = require("cors");
const users = require("./sample.json");
const app = express();
const port = 8000;

// CORS middleware
app.use(cors());

// Display all users (all diseases)
app.get("/users", (req, res) => {
  return res.json(users);
});

// Display specific disease by name with partial match
app.get("/users/:diseaseName", (req, res) => {
  const diseaseName = req.params.diseaseName.toLowerCase();
  const disease = users.find((user) =>
    user.name.toLowerCase().includes(diseaseName)
  );

  if (!disease) {
    return res.status(404).json({ error: "Disease not found" });
  }

  return res.json(disease);
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`App is running on port ${port}`);
  }
});
