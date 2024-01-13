// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from "stripe";
const config = useRuntimeConfig();
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
	const paymentMethodID = event.context.params.paymentMethodID;

	try {
		const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodID);
		delete paymentMethod["created"];
		delete paymentMethod["customer"];
		delete paymentMethod["livemode"];
		delete paymentMethod["metadata"];
		delete paymentMethod["redaction"];
		delete paymentMethod["billing_details"];
		if (paymentMethod["us_bank_account"]) {
			delete paymentMethod["us_bank_account"]["financial_connections_account"];
			delete paymentMethod["us_bank_account"]["fingerprint"];
			delete paymentMethod["us_bank_account"]["routing_number"];
		}
		return paymentMethod;
	} catch (error) {
		return { error };
	}
});
