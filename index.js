import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: process.env.FRONTNED
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('nice');
});

app.post('/donate', (req, res) => {
    const { name, amount } = req.body;
    console.log("name from backend", name);
    console.log("amount from backend", amount);

    if (!name || !amount) {
        return res.status(400).json({ error: "Name and amount are empty" });
    }

    res
        .status(201)
        .json({
            'name': name,
            'amount': amount
        })

})
app.listen(PORT, () => {
    console.log("Server is listing", PORT);
})

