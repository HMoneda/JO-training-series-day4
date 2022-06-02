// Export Modules
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');
const User = require('./models/Users');

// Create Express App
const app = express();
const PORT = 3000;

// Connect to DB
connectDB();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan Middleware for Logging
app.use(morgan('dev'));

// Root path
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Path for Create User
app.post('/user', async (req, res) => {
  // Create User Object
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  // Create a new user document
  const newUser = new User(user);

  // Save user from the database
  await newUser.save();

  res.json(newUser);
});

// Path for Getting All Users
app.get('/user', async (req, res) => {
  // Find all users from the database
  const users = await User.find();
  res.json(users);
});

// Path for Finding a User Given Username
app.get('/user/:username', async (req, res) => {
  // Find a User given his/her username in the database
  const username = req.params.username;
  const user = await User.find({ username });
  res.json(user);
});

// Path for Updating the User's Username and Password
app.patch('/user/:username', async (req, res) => {
  // Get Username, newUsername, newPassword from the Request Body
  const username = req.params.username;
  const newUsername = req.body.username;
  const newPassword = req.body.password;

  // Find if User exists in the database
  const user = await User.findOne({ username });

  // Check if newUsername is not null
  // If newUsername is not null, update the username of the user
  if (newUsername != null) {
    user.username = newUsername;
  }

  // Check if newPassword is not null
  // If newPassword is not null, update the password of the user
  if (newPassword != null) {
    user.password = newPassword;
  }

  // Update Changes
  await user.save();
  res.json(user);
});

app.delete('/user/:username', async (req, res) => {
  // Get username for the request body
  const username = req.params.username;

  // Check if user exists in the db
  const user = await User.findOne({ username });

  // Delete user in the db
  await user.delete();

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App Running at port ${PORT}`);
});
