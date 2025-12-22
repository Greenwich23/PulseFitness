import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [], // ⚠ wrap string in array
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects integer cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "NG"],
      },

      line_items: lineItems,

      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/checkout",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

app.listen(4242, () => {
  console.log("Server running on http://localhost:4242");
});
