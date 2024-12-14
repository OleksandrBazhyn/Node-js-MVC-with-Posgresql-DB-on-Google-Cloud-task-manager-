const express = require('express');
const cors = require('cors');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const { initDb } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const attachmentRoutes = require('./routes/attachmentRoutes');

app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the API' });
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attachments', attachmentRoutes);

const startServer = async () => {
    await initDb();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();
