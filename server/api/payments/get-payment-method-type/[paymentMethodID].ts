// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from "stripe";
const config = useRuntimeConfig();
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
	const paymentMethodID = event.context.params.paymentMethodID;

	try {
		const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodID);
		const { type } = paymentMethod;
		return type;
	} catch (error) {
		return { error };
	}
});
