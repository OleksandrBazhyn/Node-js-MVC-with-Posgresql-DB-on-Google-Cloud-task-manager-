const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const { initDb } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

const startServer = async () => {
    await initDb();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();
