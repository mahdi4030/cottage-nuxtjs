import { MailerSend, EmailParams, Recipient } from "mailersend";
import templates from "@/server/config/mailersend-templates.json";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const body = await readBody(event);
	console.log(body);
	const { data, to, template } = body;

	const mailerSend = new MailerSend({
		apiKey: config.MAILER_SEND_API_KEY,
	});

	const recipients = [new Recipient(to.email, to.name)];
	const bcc = [new Recipient(to.BCC, to.BCCName)];

	const personalization = [
		{
			email: to.email,
			data: body.data,
		},
	];

	const emailParams = new EmailParams().setTemplateId(templates[template]).setBcc(bcc).setTo(recipients).setPersonalization(personalization);

	try {
		const res = await mailerSend.email.send(emailParams);
		return res.body;
	} catch (error) {
		console.log("ERROR SENDING EMAIL", error);
		return { error };
	}
});
