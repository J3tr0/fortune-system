const moduleName = 'fortune-system';

export default class FortuneSystem {
	constructor() {}

	async evalDiceRoll(dice = [], keepPairs = [], expertise) {
		const values =
			this.checkLen(keepPairs) > 0 ? [...keepPairs, ...dice] : [...dice];
		const equals = this.countEquals(values);
		const successes = this.countSuccesses(values);
		const pairsDice = [];
		const spareDice = [];

		// console.log(dice);
		// console.log(keepPairs);
		// console.log('expertise: ' + expertise);

		values.forEach((d) => {
			if (equals[d] >= 2) pairsDice.push(d);
			else spareDice.push(d);
		});

		pairsDice.sort();
		spareDice.sort();

		return await {
			rolls: dice,
			equals: equals,
			successes: successes,
			pairsDice: pairsDice,
			spareDice: spareDice,
			hasSuccesses: expertise ? true : dice.length > spareDice.length,
		};
	}

	countEquals(_values) {
		const count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
		_values.forEach((i) => (count[i] = (count[i] || 0) + 1));

		return count;
	}

	countSuccesses(_values) {
		const results = { basic: 0, critical: 0, extreme: 0, impossible: 0 };
		const _equals = this.countEquals(_values);

		for (const [, value] of Object.entries(_equals)) {
			if (value === 2) {
				results.basic++;
			} else if (value === 3) {
				results.critical++;
			} else if (value === 4) {
				results.extreme++;
			} else if (value >= 5) {
				results.impossible++;
			}
		}

		return results;
	}

	checkLen(toCheck) {
		for (
			var i = 0, len = 0;
			i < toCheck.length;
			i++, toCheck[i] !== undefined && len++
		);

		return len;
	}
}
