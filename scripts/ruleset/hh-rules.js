import FortuneSystem from "./fortune-system.js";

export default class HHRules extends FortuneSystem {
	constructor() {
		super();
		this.rulesetName = "household";
	}

	async evalResult( result, rollCount, expertise ) {
		this.rollCount = rollCount;

		if( this.rollCount === 1 && !result.hasSuccesses && !expertise ) {
			result = await this.reduceSuccesses( result );
		}

		if( this.rollCount === 2 && !result.hasSuccesses ) {
			result.successes.basic = 0;
			result.successes.critical = 0;
			result.successes.extreme = 0;
			result.successes.impossible = 0;
		}

		 return await {
			...result,
			rollCount: this.rollCount + 1,
			useExpertise: result.spareDice.length && this.rollCount === 0,
			takeARisk: result.spareDice.length && this.rollCount === 0 && result.hasSuccesses,
			allIn: result.spareDice.length && this.rollCount === 1 && result.hasSuccesses
		}
	}

	reduceSuccesses( roll ) {
		const successes = { ...roll.successes };

		if (successes.basic > 0) {
			successes.basic--;
		} else if (successes.critical > 0) {
			successes.critical--;
		} else if (successes.extreme > 0) {
			successes.extrem--;
		} else if (successes.impossible > 0) {
			successes.impossible--;
		}
		
		return { ...roll, successes };
	}
}