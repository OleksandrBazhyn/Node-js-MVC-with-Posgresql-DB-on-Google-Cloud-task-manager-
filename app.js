const express = require('express');
const app = express();
const path = require('path');
const { initDb } = require('./models');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

initDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});