const express = require('express');
const app = express();
const helmet = require('helmet');
const methodOverride = require('method-override');
const path = require('path');
const { initDb } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const attachmentRoutes = require('./routes/attachmentRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], // дозволяє завантаження лише з того ж джерела
        scriptSrc: ["'self'", "'unsafe-inline'"], // дозволяє скрипти лише з того ж джерела
        // styleSrc: ["'self'", "'unsafe-inline'"], // дозволяє стилі лише з того ж джерела
        imgSrc: ["'self'", "data:"] // дозволяє зображення лише з того ж джерела і з data URI
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/attachments', attachmentRoutes);

const startServer = async () => {
    await initDb();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();
