import Roller from './roller.js';
const moduleName = 'fortune-system';

Hooks.once('ready', () => {
	game.FSRoller = new Roller();
});

/**
 * Create the button for Forune System Roller
 */
Hooks.on('renderSceneControls', (app, html) => {
	const svg = `<svg id="Livello_1_Immagine" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:#c6c6c6;}</style></defs><path class="cls-1" d="M67.26,45.89c1.68,.91,3.35,1.83,4.18,2.28,8.18-4.77,15.78-9.86,23.96-13.72,5.15-2.43,11.12-3.73,16.83-4.2,4.93-.41,6.84-2.29,7.03-6.82,.04-.89,.39-1.77,1.36-2.68,.22,.85,.65,1.7,.63,2.54-.08,3.56,1.62,4.56,5.1,5.03,30.42,4.15,50.87,20.78,61.05,49.75,1.36,3.88,2.28,8.06,2.57,12.16,.35,4.96,1.46,8.51,7.55,8.66-2.09,.59-4.18,1.17-6.66,1.87-.69,17.85-6.89,33.66-19.03,47.2,.77,1.44,1.5,2.8,2.23,4.15-.25,.33-.5,.65-.75,.98-1.16-.67-2.54-1.13-3.45-2.04-18.77-18.68-37.49-37.42-56.23-56.15-14.37-14.36-28.74-28.73-43.17-43.04-1.41-1.39-3.23-2.37-4.86-3.54,.55-.81,1.11-1.62,1.66-2.43Zm80.82,28.83v-1.95c-7.81,7.57-15.64,15.15-23.99,23.25,11.32-3.76,22.77-6.22,23.58-20.66,.02-.28,.36-.54,.54-.81-1,4.33-2,8.66-3.15,13.63,5.18,.98,10.13,1.92,16.33,3.1-2.45-8.33-5.13-15.24-10.99-21.15-1,1.99-1.66,3.29-2.32,4.61Zm-46.54-3.49c2.63,.75,5.27,1.51,8.41,2.41,1.01-5.68,1.88-10.61,2.86-16.16-8.58,1.49-14.97,4.87-20.84,10.54,1.67,.86,2.79,1.43,3.91,2.01-3.3,1.53-.28,2.57,.45,3.33,4.5,4.69,9.15,9.23,13.74,13.82,1.06,1.06,2.1,2.14,3.19,3.17,1.07,1.02,2.19,1.98,3.29,2.97-3.48-8.42-3.38-19.1-14.62-21.79-.15-.04-.26-.2-.4-.3Zm52.12,35.44c-2.77,.88-5.55,1.76-8.71,2.77,1.7,5.98,3.31,11.64,5.16,18.15,6.01-6.48,9.41-13.03,10.62-20.85h-7.2c11.1-2.23,22.2-4.47,33.3-6.7-.05-.25-.1-.5-.15-.75h-61.14c9.07,3.88,17.19,11.27,28.12,7.38ZM121.6,30.79c-.24,.09-.49,.18-.73,.27v61.91c3.26-5.18,5.67-10.55,7.62-16.07,.73-2.07,.83-4.59,.47-6.78-1.36-8.33-3.02-16.62-4.59-24.92-.91-4.8-1.85-9.6-2.77-14.4Zm27.19,37.57c-6.37-5.78-12.71-9.37-21.19-10.78,.88,5.12,1.46,9.51,2.54,13.77,.2,.79,2.62,1.71,3.73,1.44,4.67-1.13,9.23-2.69,14.91-4.43Z"/><path class="cls-1" d="M127.37,153.6c-.83-1.5-1.56-2.85-2.4-4.37,3.42-.13,97.92,92.48,107.65,105.04-.16,.46-.33,.92-.49,1.38-1.74-.84-3.49-1.68-5.72-2.76-12.4,11.56-27.44,18.32-45.01,19.27-.72,3.09-1.39,5.93-2.39,10.2-.61-2.22-1.01-3.04-1.04-3.87-.12-3.65-1.89-4.94-5.57-5.37-31.83-3.69-56.38-26.26-62.64-57.31-.23-1.14-.53-2.3-.55-3.45-.09-4.96-.58-9.54-7.61-8.59,.43-.9,.57-1.42,.7-1.41,5.18,.07,6.21-2.91,6.65-7.52,1.51-15.71,7.75-29.51,18.43-41.25Zm-15.47,47.95c.06,.21,.11,.43,.17,.64h61.58c.08-.33,.15-.66,.23-.99-7.15-2.84-14.3-5.68-21.15-8.4,1.47-1.74-.1-10.36-4.23-18.24-5.84,6.31-9.34,13.49-10.28,21.97-8.79,1.67-17.55,3.34-26.32,5.01Zm95.94,33.27c-9.51-9.07-17.96-17.14-25.85-24.67,.25-1.25,.16-1.08,.2-.94,.25,.79,.42,1.63,.81,2.35,5.11,9.49,7.93,19.24,3.84,29.92-.24,.64,.11,1.51,.34,3.74,7.14-3.59,13.55-6.82,20.66-10.39Zm-29.61-25.81c-3.65,8.39-10.13,15.68-7.55,26,2.85,11.38,4.49,23.07,6.66,34.62,.3-.02,.6-.05,.9-.07v-60.55Zm-9.58,18.78c-6.49,1.94-11.98,3.58-18.33,5.47,6.54,5.64,12.66,9.74,21.33,10.63-1.05-5.62-1.97-10.58-3-16.1Zm-29.85-17.25c.65,7.95,4.95,16.32,10.54,20.6,1.65-5.84,3.23-11.48,4.99-17.69-5.48-1.03-10.41-1.95-15.53-2.91Zm35.84-4.57c-14.7,1.75-21.72,8.79-23.16,22.31,7.36-7.09,15.25-14.68,23.16-22.31Z"/></svg>`;
	const fortunSystemButton = $(
		`<li class="scene-control" title="Fortune System Roller">${svg}</li>`
	);
	fortunSystemButton.on('click', async () => {
		await game.FSRoller.FSRollerPopup();
	});
	if (isNewerVersion(game.version, '9.220')) {
		html.children().first().append(fortunSystemButton);
	} else {
		html.append(fortunSystemButton);
	}
});

Hooks.on('updateSetting', (setting) => {
	if (setting.key == 'fortune-system.ruleset') game.FSRoller = new Roller();
	location.reload();
});

Hooks.once('init', () => {
	game.settings.register(moduleName, 'ruleset', {
		name: game.i18n.localize('FSRoller.RulesetLabel'),
		hint: game.i18n.localize('FSRoller.RulesetHint'),
		scope: 'world',
		config: true,
		choices: {
			brokencompass: 'Broken Compass',
			household: 'Household',
		},
		default: 'brokencompass',
		type: String,
	});
});

Hooks.on('renderChatLog', (app, html) => {
	$('#chat-log').addClass(game.settings.get(moduleName, 'ruleset'));

	html.on('click', '[data-action]', async (e) => {
		const { dataset } = e.currentTarget;

		if (dataset.action == 'reroll') {
			const pairs = dataset.pairs.split(',');
			const spare = parseInt(dataset.spare);
			const expertise = parseInt(dataset.expertise);
			const purpose = dataset.purpose;

			await game.FSRoller.FSRoller(spare, purpose, pairs, 1, expertise);
		}
	});
});

Hooks.on('renderChatMessage', (app, html, data) => {
	let userId = game.user?._id;
	let chatCard = html.find('.dice-tooltip.fs-die-tooltip');
	if (chatCard.length > 0) {
		let owner = chatCard.attr('data-user');
		// console.log('owner ' + owner);
		// console.log('userId ' + userId);
		if (owner != userId) {
			const buttons = html.find('button');
			buttons.each((i, btn) => {
				btn.style.display = 'none';
			});
		}
	}
});

console.log('FSRoller | Fortune System Dice Roller loaded');
