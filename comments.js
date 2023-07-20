// Create web server
// 1. require express
// 2. create an express app
// 3. create a route handler
// 4. listen on a port

// 1. require express
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// 2. create an express app
const app = express();

// 3. create a route handler
// 3.1 get all comments
app.get('/api/comments', (req, res) => {
  // 3.1.1 read the comments.json file
  const comments = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'comments.json'))
  );
  // 3.1.2 send the comments as a response
  res.json(comments);
});

// 3.2 create a new comment
app.post('/api/comments', (req, res) => {
  // 3.2.1 read the comments.json file
  const comments = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'comments.json'))
  );
  // 3.2.2 create a new comment object
  const newComment = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  // 3.2.3 add the new comment to the comments array
  comments.push(newComment);
  // 3.2.4 write the comments array to the comments.json file
  fs.writeFileSync(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments)
  );
  // 3.2.5 send the new comment as a response
  res.json(newComment);
});

// 3.3 delete a comment
app.delete('/api/comments/:id', (req, res) => {
  // 3.3.1 read the comments.json file
  const comments = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'comments.json'))
  );
  // 3.3.2 filter out the comment with the given id
  const newComments = comments.filter(
    (comment) => comment.id !== req.params.id
  );
  // 3.3.3 write the new comments array to the comments.json file
  fs.writeFileSync(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(new