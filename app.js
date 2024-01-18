const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Sample data
const tasks = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Explore MongoDB', completed: false },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.get('/task/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === parseInt(taskId));

  if (task) {
    res.render('task', { task });
  } else {
    res.status(404).send('Task not found.');
  }
});

app.post('/add', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.redirect('/');
});

// Add more routes for updating and deleting tasks

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
