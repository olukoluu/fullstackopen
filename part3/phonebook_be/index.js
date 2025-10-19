const express = require("express");
const app = express();
const morgan = require('morgan')
const PORT = 3001;

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json());

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const id = Math.round(Math.random()*10000).toString();
  const newPerson = { id: id, ...request.body};
  if (!newPerson.name) {
    response.status(400).json({ error: "name missing" });
    return;
  } else if (!newPerson.number) {
    response.status(400).json({ error: "number missing" });
    return;
  } else if (persons.find((person) => person.name === newPerson.name)) {
    response.status(400).json({ error: "name must be unique" });
    return;
  }
  persons.push(newPerson);
  response.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
