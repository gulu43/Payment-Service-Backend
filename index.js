import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';

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
    const { name, amount } = req.body 
    console.log("name from backend", name);
    console.log("amount from backend", amount);

    if (!name || !amount) {
        return res.status(400).json({ error: "Name and amount are empty" });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: "Amount must be greater than zero" });
    }

    res
        .status(201)
        .json({
            'name': name,
            'amount': amount
        })

})

// Initialize Razorpay instance
// console.log(` key id, ${process.env.KEY_ID}`);
// console.log(`secret id, ${process.env.KEY_SECRET}`);

const razorpay = new Razorpay({
  key_id: `${process.env.KEY_ID}`,
  key_secret: `${process.env.KEY_SECRET}`,
});

// Route to create Razorpay order
app.post('/create-order', async (req, res) => {
  const { name, amount } = req.body;
  
  const options = {
    amount: Number(amount) * 100, // in paise
    currency: 'INR',
    receipt: `donation_${name}_${Date.now()}`,
  };

  try {
    console.log('is it there' ,razorpay);
    
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating order"});
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

