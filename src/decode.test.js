const decode = require('./decode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')

scenarios.forEach(scenario => {
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - convert emoji symbols to emoji slugs`, () => {
		if (scenario.success[2]) {
			expect(JSON.stringify(decode.emojiSymbolsToEmojiSlugs(scenario.emojis)))
			.toBe(JSON.stringify(scenario.emojiSlugs))
		} else {
			try {
				expect(decode.emojiSymbolsToEmojiSlugs(scenario.emojis))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert emoji slugs to buffer`, () => {
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

	test(`${scenario.label} - convert emoji symbols to buffer`, () => {
		if (scenario.success[2] && scenario.success[3]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)
			console.log('decode.test.js 38')
			console.log(scenario.buffer)
			console.log(decode.decodeFromEmoji(scenario.emojis, 'buffer'))
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

	test(`${scenario.label} - convert emoji symbols to hex`, () => {
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