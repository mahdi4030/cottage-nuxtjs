import { nanoid } from "nanoid";

export default function () {
	const toastQueue = useState("toastQueue", () => []);

	const addToastToQueue = (toast) => {
		toast.id = nanoid();
		toastQueue.value.push(toast);
	};

	const removeToast = (id) => {
		const indexToRemove =
			toastQueue.value[
				toastQueue.value.findIndex((arr) => {
					return arr.id === id;
				})
			];
		toastQueue.value.splice(indexToRemove, 1);
	};

	return {
		toastQueue,
		addToastToQueue,
		removeToast,
	};
}
