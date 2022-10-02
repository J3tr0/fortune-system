import BCRules from './ruleset/bc-rules.js';
import HHRules from './ruleset/hh-rules.js';

export default class Roller {
	/**
	 * Create popup for roller
	 * @return none
	 */
	constructor() {
		this.moduleName = 'fortune-system';
		this.ruleset =
			game.settings.get(this.moduleName, 'ruleset') == 'brokencompass'
				? new BCRules()
				: new HHRules();
	}

	async FSRollerPopup() {
		new Dialog({
			title: `${game.i18n.localize('FSRoller.Title')}`,
			content: `
				<h2>${game.i18n.localize('FSRoller.RollTitle')}</h2>
				<form>
					<div class="form-group">
						<label for="roll-purpose">${game.i18n.localize('FSRoller.RollPurpose')}</label>
						<input id="roll-purpose" type="text" name="roll-purpose">
					</div>
					<div class="form-group">
						<label for="roll-dice">${game.i18n.localize(
							'FSRoller.RollNumberOfDice'
						)}</label>
						<select id="roll-dice" name="roll-dice">
							${Array(9)
								.fill()
								.map(
									(item, i) =>
										`<option value="${i + 1}">${
											i + 1
										}d</option>`
								)
								.join('')}
							<script>$('#roll-dice option[value="3"]').prop("selected", "selected");</script>
						</select>
					</div>
				</form>
			`,
			buttons: {
				roll: {
					icon: `<i class="fa-solid fa-dice-d6"></i>`,
					label: game.i18n.localize('FSRoller.Roll'),
					callback: async (html) => {
						const numberOfDice = parseInt(
							html.find('[name="roll-dice"]')[0].value
						);
						const purpose = html.find('[name="roll-purpose"]')[0]
							.value;
						await this.FSRoller(numberOfDice, purpose);
					},
				},
				flip: {
					icon: `<i class="fa-solid fa-circle"></i>`,
					label: game.i18n.localize('FSRoller.Flip'),
					callback: async (html) => {
						await this.FlipCoin(1, ``);
					},
				},
			},
		}).render(true);
	}

	/**
	 * Roll dice
	 * @param {int} numberOfDice number of dice to roll
	 * @param {string} purpose purpose of the roll
	 * @returns showChatRollMessage()
	 */
	async FSRoller(
		numberOfDice = 0,
		purpose = '',
		oldRoll = [],
		rollCount = 0,
		expertise = 0
	) {
		const r = new Roll(`${numberOfDice}d6`, {});
		await r.evaluate({ async: true });

		return this.showChatRollMessage(
			r,
			purpose,
			oldRoll,
			rollCount,
			expertise
		);
	}

	async FlipCoin(
		numberOfDice = 0,
		purpose = '',
		oldRoll = [],
		rollCount = 0,
		expertise = 0
	) {
		const r = new Roll(`${numberOfDice}d2`, {});
		await r.evaluate({ async: true });

		return this.showChatFlipMessage(r);
	}

	/**
	 * Show chat message
	 * @param {Roll} r roll object
	 * @param {string} purpose purpose of the roll
	 * @returns
	 */
	async showChatRollMessage(r, purpose = '', oldRoll, rollCount, expertise) {
		const rulesetName = this.ruleset.rulesetName;
		const template = `modules/${this.moduleName}/templates/fs-roll.hbs`;

		const results =
			r.terms[0] && r.terms[0].results ? r.terms[0].results : [];
		const dice = results.reduce(
			(acc, curVal) => [...acc, curVal.result],
			[]
		);

		let rollResult = await this.ruleset.evalDiceRoll(
			dice,
			oldRoll,
			expertise
		);
		let rulesetResult = await this.ruleset.evalResult(
			rollResult,
			rollCount,
			expertise
		);

		const templateData = {
			rulesetName,
			...rulesetResult,
			purpose,
			user: game.user?._id,
		};

		// console.log(templateData);

		const messageData = {
			user: game.user?._id,
			speaker: ChatMessage.getSpeaker(),
			type: CONST.CHAT_MESSAGE_TYPES.ROLL,
			sound: CONFIG.sounds.dice,
			roll: r,
			rollMode: game.settings.get('core', 'rollMode'),
			content: await renderTemplate(template, templateData),
			flags: { templateVariables: templateData },
		};

		return await ChatMessage.create(messageData);
	}
	async showChatFlipMessage(r) {
		const rulesetName = this.ruleset.rulesetName;
		const template = `modules/${this.moduleName}/templates/fs-flip.hbs`;

		const results =
			r.terms[0] && r.terms[0].results ? r.terms[0].results : [];
		const dice = results.reduce(
			(acc, curVal) => [...acc, curVal.result],
			[]
		);

		const flipResult =
			dice[0] == 1
				? game.i18n.localize('FSRoller.Heads')
				: game.i18n.localize('FSRoller.Tails');

		console.log(flipResult);

		const templateData = {
			rulesetName,
			dice,
			flipResult,
			user: game.user?._id,
		};

		// console.log(templateData);

		const messageData = {
			user: game.user?._id,
			speaker: ChatMessage.getSpeaker(),
			type: CONST.CHAT_MESSAGE_TYPES.ROLL,
			sound: CONFIG.sounds.dice,
			roll: r,
			rollMode: game.settings.get('core', 'rollMode'),
			content: await renderTemplate(template, templateData),
			flags: { templateVariables: templateData },
		};

		return await ChatMessage.create(messageData);
	}
}
