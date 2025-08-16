const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const expenseRoutes = require('./routes/expenseRoute');
const authRoutes = require('./routes/authRoutes');

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
// =============Routes===============
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

//=========== Error  middleware==============
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})