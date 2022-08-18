const decode = require('./decode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')

scenarios.forEach(scenario => {
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - convert emojis to emoji names`, () => {
		if (scenario.success[2]) {
			expect(JSON.stringify(decode.emojiCharsToEmojiSlugs(scenario.emojis)))
			.toBe(JSON.stringify(scenario.emojiSlugs))
		} else {
			try {
				expect(decode.emojiCharsToEmojiSlugs(scenario.emojis))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert emoji names to buffer`, () => {
		if (scenario.success[3]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)
			expect(JSON.stringify(decode.emojiSlugsToBuffer(scenario.emojiSlugs)))
			.toBe(JSON.stringify(scenario.buffer))
		} else {
			try {
				expect(decode.emojiSlugsToBuffer(scenario.emojiSlugs))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert emojis to buffer`, () => {
		if (scenario.success[2] && scenario.success[3]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)
			expect(JSON.stringify(decode.decodeFromEmoji(scenario.emojis, 'buffer')))
			.toBe(JSON.stringify(scenario.buffer))
		} else {
			try {
				expect(decode.decodeFromEmoji(scenario.emojis, 'buffer'))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert emojis to hex`, () => {
		if (scenario.success[2] && scenario.success[3]) {
			expect(JSON.stringify(decode.decodeFromEmoji(scenario.emojis, 'hex')))
			.toBe(JSON.stringify(scenario.hexString))
		} else {
			try {
				expect(decode.decodeFromEmoji(scenario.emojis, 'hex'))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

})