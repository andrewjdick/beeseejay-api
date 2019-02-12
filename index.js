const Joi = require("joi");
const uuidv1 = require("uuid/v1");
const express = require("express");
const cors = require("cors");
const app = express();

// Enables the parsing of JSON objects in Express
app.use(express.json());

// Allow the use of CORS for cross-domain API access
app.use(cors());

const BASE_URL = "/api";
const IDEAS_ENDPOINT_URL = "/ideas";
const SERVER_PORT = process.env.PORT || 4000;
const ERROR_MESSAGES = {
  NOTFOUND: "The idea with the given ID was not found"
};

const ideas = [
  {
    id: "61035bc0-2b32-11e9-9c46-0b23542eb7e3",
    created_date: 1549582300752,
    title: "First card title",
    body: "First card body"
  },
  {
    id: "61035bc1-2b32-11e9-9c46-0b23542eb7e3",
    created_date: 1549582302423,
    title: "Second card title",
    body: "Second card body"
  },
  {
    id: "61035bc2-2b32-11e9-9c46-0b23542eb7e3",
    created_date: 1549582303013,
    title: "Third card title",
    body: "Third card body"
  },
  {
    id: "61035bc3-2b32-11e9-9c46-0b23542eb7e3",
    created_date: 1549582303491,
    title: "Fourth card title",
    body: "Fourth card body"
  },
  {
    id: "61035bc4-2b32-11e9-9c46-0b23542eb7e3",
    created_date: 1549582409879,
    title: "Fifth card title",
    body: "Fifth card body"
  }
];

const validateIdea = idea => {
  const schema = {
    title: Joi.string().allow(""),
    body: Joi.string()
      .allow("")
      .max(150)
  };

  return Joi.validate(idea, schema);
};

const findIdea = id => ideas.find(idea => idea.id === id);

// GET ideas
app.get(`${BASE_URL}${IDEAS_ENDPOINT_URL}`, (req, res) => {
  res.send(ideas);
});

// GET ideas/:id
app.get(`${BASE_URL}/:id`, (req, res) => {
  const { id } = req.params;
  const idea = findIdea(id);

  if (!idea) return res.status(404).send(ERROR_MESSAGES.NOTFOUND);

  res.send(idea);
});

// POST ideas
app.post(`${BASE_URL}${IDEAS_ENDPOINT_URL}`, (req, res) => {
  const idea = {
    id: uuidv1(),
    created_date: new Date().getTime()
  };

  ideas.push(idea);

  res.status(201).send(idea);
});

// PUT idea/:id
app.put(`${BASE_URL}${IDEAS_ENDPOINT_URL}/:id`, (req, res) => {
  const { id } = req.params;
  const idea = findIdea(id);
  const ideaIndex = ideas.indexOf(idea);

  if (!idea) return res.status(404).send(ERROR_MESSAGES.NOTFOUND);

  const { error } = validateIdea(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, body } = req.body;

  ideas[ideaIndex] = {
    ...idea,
    ...req.body
  };

  res.send(idea);
});

// DELETE idea/:id
app.delete(`${BASE_URL}${IDEAS_ENDPOINT_URL}/:id`, (req, res) => {
  const { id } = req.params;
  const idea = findIdea(id);

  if (!idea) return res.status(404).send(ERROR_MESSAGES.NOTFOUND);

  const ideaIndex = ideas.indexOf(idea);
  ideas.splice(ideaIndex, 1);

  res.send(idea);
});

app.listen(SERVER_PORT, () =>
  console.log(`Listening on port ${SERVER_PORT}...`)
);
