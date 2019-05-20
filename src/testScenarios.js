/*
	Tests on each scenario:

	1. Hex/buffer to emoji name
	2. Emoji name to emoji
	3. Emoji to emoji name
	4. Emoji name to buffer
*/

const scenarios = [
	{
		label: 'sixteen random hex characters',
		hexString: 'e09c563a561de6ae',
		emojiNames: [ 'hammer', 'cactus', 't-rex', 'custard', 'fist', 'wine_glass', 'toolbox'],
		emojis: [ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ],
		success: [true, true, true, true],
	},
	{
		label: 'ten zeros',
		hexString: '0000000000',
		emojiNames: ['grinning', 'grinning', 'grinning', 'grinning'],
		emojis: [ '😀', '😀', '😀', '😀' ],
		success: [true, true, true, true],
	},
	{
		label: 'empty string',
		hexString: '',
		emojiNames: [],
		emojis: [],
		success: [true, true, true, true],
	},
	{
		label: 'valid 1024th emoji (index 1023)',
		hexString: 'ffffffffff',
		emojiNames: ['pushpin', 'pushpin', 'pushpin', 'pushpin'],
		emojis: ['📌', '📌', '📌', '📌'],
		success: [true, true, true, true],
	},
	{
		label: 'invalid 1025th emoji (index 1024)',
		hexString: undefined,
		emojiNames: ['round_pushpin', 'round_pushpin', 'round_pushpin', 'round_pushpin'],
		emojis: ['📍', '📍', '📍', '📍'],
		success: [false, true, true, false],
	},
	{
		label: 'invalid emoji names',
		hexString: undefined,
		emojiNames: ['abc', 'abc', 'abc', 'abc'],
		emojis: [],
		success: [false, false, false, false],
	},
]

module.exports = scenarios