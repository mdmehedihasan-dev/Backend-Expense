const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();
// =================Middleware================
app.use(cors({
origin: process.env.FRONTEND_URL || 'https://expense-frontend-henna.vercel.app',
credentials: true
}));
app.use(express.json());

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})