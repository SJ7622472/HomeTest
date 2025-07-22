import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 4000;

mongoose.connect('mongodb://localhost:27017/ordersdb', { useNewUrlParser: true, useUnifiedTopology: true });
const orderSchema = new mongoose.Schema({
  form: Object,
  products: Array,
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});
