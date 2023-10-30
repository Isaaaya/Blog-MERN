require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./db/connectDB');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes, commentRoutes);

app.use(errorHandler);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();

