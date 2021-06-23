
import { formatBalance } from '@polkadot/util';
	export const formatData = (data) => {
		const decimals = 18;
		const updatedData = formatBalance(data, { withSi: false, forceUnit: '-' }, 0)
			.split('.', 1)
			.join('')
			.split(',')
			.join('');
		if (updatedData.length > decimals) {
			return `${
				updatedData.slice(0, updatedData.length - decimals) || '0'
			}.${updatedData.slice(updatedData.length - decimals)}`;
		} else if (updatedData.length <= decimals) {
			// @ts-ignore
			return updatedData / 10 ** decimals;
		} else {
			return updatedData;
		}
	}
