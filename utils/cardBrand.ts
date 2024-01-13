/**
 * Converts card brand to proper case
 * i.e. 2022-10-11 becomes October 2022
 * @param brand
 * @returns string
 */
export function getCardBrand(brand: string): string {
	let name = "";
	switch (brand) {
		case "amex":
			name = "American Express";
			break;
		case "cartes_bancaires":
			name = "Cartes Bancaires";
			break;
		case "diners":
			name = "Diners";
			break;
		case "discover":
			name = "Discover";
			break;
		case "jcb":
			name = "JCB";
			break;
		case "mastercard":
			name = "Mastercard";
			break;
		case "visa":
			name = "Visa";
			break;
		case "unionpay":
			name = "UnionPay";
			break;
		default:
			// code block
			break;
	}
	return name;
}
