import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: process.env.FRONTEND
}));

app.get('/', (req, res) => {
    res.send('nice');
});

app.listen(PORT, () => {
    console.log("Server is listing", PORT);
})

