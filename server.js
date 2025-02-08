import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
const stripe = new Stripe('sk_test_51Qpzz6CRuzx7cMhpzYHQaCowuW3GZeDsyfLpiIVRPHZJKyxMjoSgvtkZNJ4NoioVGGWaE3nd6hoxqEbR4vyeEMAb00QDUwANOV');

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceAmount, productName, success_url, cancel_url } = req.body;

    if (!priceAmount || !productName) {
      return res.status(400).json({ 
        error: 'Se requieren priceAmount y productName' 
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success_url || `${req.headers.origin}/success`,
      cancel_url: cancel_url || `${req.headers.origin}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error al crear la sesión:', error);
    res.status(500).json({ 
      error: `Error al crear la sesión de pago: ${error.message}` 
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});