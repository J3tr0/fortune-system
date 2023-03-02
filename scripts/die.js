export class BCDie extends Die {
	constructor(termData) {
		termData.faces = 6;
		super(termData);
	}

	/** @override */
	static DENOMINATION = 'c';

	static COMMAND = `d${BCDie.DENOMINATION}`;
}

export class BCCoin extends Die {
	constructor(termData) {
		termData.faces = 2;
		super(termData);
	}

	/** @override */
	static DENOMINATION = 't';

	static COMMAND = `d${BCCoin.DENOMINATION}`;
}
