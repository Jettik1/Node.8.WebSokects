const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get-messages", (req, res) => {
  emitter.once("newMessage", (message) => {
    res.json(message);
  });
});

app.post("/new-messages", (req, res) => {
  const messages = req.body;
  emitter.emit("newMessage", messages);
  res.status(200);
});

app.listen(PORT, () => console.log(`Server work on ${PORT} port`));
