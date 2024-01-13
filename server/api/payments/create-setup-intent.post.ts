// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from "stripe";
const config = useRuntimeConfig();
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { customerId } = body;

	const intent = await stripe.setupIntents.create({
		customer: customerId,
		payment_method_types: ["us_bank_account", "card"],
	});

	return { intent };
});
