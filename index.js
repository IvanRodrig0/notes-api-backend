//const http = require("node:http");
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./logger.js")

app.use(express.json())
app.use(cors())
app.use(logger)

let notes = [
  {
    id: 1,
    name: "Clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    creationAt: "2024-02-29T16:09:00.000Z",
    updatedAt: "2024-02-29T16:09:00.000Z",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://i.imgur.com/ZANVnHE.jpeg",
    creationAt: "2024-02-29T16:09:00.000Z",
    updatedAt: "2024-02-29T16:09:00.000Z",
  },
  {
    id: 3,
    name: "Furniture",
    image: "https://i.imgur.com/Qphac99.jpeg",
    creationAt: "2024-02-29T16:09:00.000Z",
    updatedAt: "2024-02-29T16:09:00.000Z",
  },
  {
    id: 4,
    name: "Shoes",
    image: "https://i.imgur.com/qNOjJje.jpeg",
    creationAt: "2024-02-29T16:09:00.000Z",
    updatedAt: "2024-02-29T16:09:00.000Z",
  },
  {
    id: 5,
    name: "Miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
    creationAt: "2024-02-29T16:09:00.000Z",
    updatedAt: "2024-02-29T16:09:00.000Z",
  },
]

app.get("/", (request, response) => {
  response.send("<h1>Hello there</h1>")
})

app.get("/api/notes", (request, response) => {
  response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  //console.log(id);
  //notes.forEach((value) => {
  //   console.log(value);
  //   response.json(value);
  //  }
  //});
  const note = notes.find((value) => value.id == id)
  response.json(note)
})

//const app = http.createServer((request, response) => {
//  response.writeHead(200, { "Content-Type": "text/plain" });
//  response.end(JSON.stringify(notes));
//});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((value) => value.id != id)
  response.status(204).end()
})

app.post("/api/notes", (request, response) => {
  const note = request.body
  const ids = notes.map((value) => value.id)
  const maxtIds = Math.max(...ids)

  const newNote = {
    id: maxtIds + 1,
    name: note.name,
    creationAt: new Date().toISOString(),
  }
  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: "Not found",
  })
})
const PORT = 3001

app.listen(PORT)
console.log(`Server Running on Port: ${PORT}`)
