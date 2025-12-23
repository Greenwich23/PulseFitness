import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { cart } = JSON.parse(event.body);

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "NG"],
      },

      line_items: lineItems,

      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/checkout`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stripe session failed" }),
    };
  }
}
