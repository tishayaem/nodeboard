var express = require('express');
var router = express.Router();
var Task = require('../models/taskModel');

// Router is mounter on '/tasks' path in app.js
router.route('/')
.get(function (req, res, next) {
  Task.find(function (err, tasks) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      res.json(tasks);
    }
  });
})
.post(function (req, res, next) {
  var newTask = new Task({
    title: req.body.title,
    dueDate: req.body.dueDate,
    importance: req.body.importance,
    completed: req.body.completed
  });

  newTask.save(function (err) {
    if (err) {
      res.status(400).json({'ERROR': err});
    } else {
      res.status(201).json({'SUCCESS': newTask});
    }
  });
});

module.exports = router;
