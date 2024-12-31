const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

//I had harcored it for simplicity and use a sigup route also
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(400).json({ message: 'Invalid credentials' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
