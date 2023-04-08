const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
var tickets;

// reading file
fs.readFile("./tickets.json", function (err, data) {
  if (err) throw err;
  tickets = JSON.parse(data);
  //   console.log(tickets);
});

// routes
app.get("/", (req, res) => {
  res.send("Hello this is the root directory..."); //get ticket by id from tickets.json
});

// GET request for all tickets
app.get("/rest/list", (req, res) => {
  res.send(tickets);
});

// GET requst for ticket by id
app.get("/rest/ticket/:id", (req, res) => {
  console.log(tickets[0].id);
  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].id == req.params.id) {
      var ticket = tickets[i];
    }
  }
  res.send(ticket);
});

// model = {
//   id: 0,
//   type: "data",
//   subject: "data",
//   description: "data",
//   priority: "data",
//   status: "data",
//   recipient: "data",
//   submitter: "data",
//   assignee_id: 0,
//   follower_ids: [0],
//   tags: ["data"],
// };

// POST request for creating new ticket
app.post("/rest/ticket", (req, res) => {
  //   model = req.body;
  //   console.log(req.body);
  //   console.log(model);
  //   console.log(req.body.id);
  var ticket = {
    id: req.body.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    type: req.body.type,
    subject: req.body.subject,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    recipient: req.body.recipient,
    submitter: req.body.submitter,
    assignee_id: req.body.assignee_id,
    follower_ids: req.body.follower_ids,
    tags: req.body.tags,
  };

  tickets.push(ticket);
  fs.writeFileSync("tickets.json", JSON.stringify(tickets, null, 2));
  res.send(ticket);
});

app.listen(3000, () => {
  console.log(`Node api is running on port 3000`);
});
