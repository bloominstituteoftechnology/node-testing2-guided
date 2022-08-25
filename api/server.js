const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", async (req, res) => {
  const result = await Hobbits.getById(req.params.id);
  res.json(result);
});

server.post("/hobbits", (req, res) => {
  res.end()
});

server.delete("/hobbits/:id", (req, res) => {
  res.end()
});

server.put("/hobbits/:id", (req, res) => {
  res.end()
});

module.exports = server;
