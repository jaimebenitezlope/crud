const express = require("express");
const app = express();
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const PORT = 3000;
app.use(express.json());

const filePath = path.resolve(__dirname, "data/users.json");
console.log(filePath);

// metodo callback

// app.get("/", (req, res) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.send("Error al leer el archivo");
//       return;
//     }
//     const jsonData = JSON.parse(data);
//     res.send(jsonData);
//   });
// });∫

// metodo de las promsesas

app.get("/", async (req, res) => {
  try {
    const data = await fsPromises.readFile(filePath);
    const jsonData = await JSON.parse(data);
    res.send(jsonData);
  } catch (error) {
    res.send("ERROR");
  }
});

app.post("/", async (req, res) => {
  const newUser = { id: v4(), ...req.body };
  console.log(newUser);
  try {
    const data = await fsPromises.readFile(filePath);
    const jsonData = await JSON.parse(data);
    jsonData.push(newUser);

    await fsPromises.writeFile(filePath, JSON.stringify(jsonData));
    res.send(jsonData);
  } catch (error) {
    res.send("ERROR");
  }
  res.end();
});

app.patch("/:diego", (req, res) => {
  console.log(req.params);
  res.end();
});

app.delete("/:jaime", (req, res) => {
  console.log(req.params);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
