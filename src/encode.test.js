const encode = require('./encode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')

scenarios.forEach(scenario => {
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - convert buffer to emoji names`, () => {
		if (scenario.success[0]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)
			expect(JSON.stringify(encode.bufferToEmojiNames(scenario.buffer)))
			.toBe(JSON.stringify(scenario.emojiNames))
		} else {
			try {
				expect(encode.bufferToEmojiNames(undefined))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert emoji names to emojis`, () => {
		if (scenario.success[1]) {
			expect(JSON.stringify(encode.emojiNamesToEmojiChars(scenario.emojiNames)))
			.toBe(JSON.stringify(scenario.emojis))
		} else {
			try {
				expect(encode.emojiNamesToEmojiChars(scenario.emojiNames))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert hex to emojis`, () => {
		if (scenario.success[0] && scenario.success[1]) {
			expect(JSON.stringify(encode.encodeToEmoji(scenario.hexString)))
			.toBe(JSON.stringify(scenario.emojis))
		} else {
			try {
				expect(encode.encodeToEmoji(scenario.hexString))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert buffer to emojis`, () => {
		if (scenario.success[0] && scenario.success[1]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)
			expect(JSON.stringify(encode.encodeToEmoji(scenario.buffer)))
			.toBe(JSON.stringify(scenario.emojis))
		} else {
			scenario.buffer = undefined
			try {
				expect(encode.encodeToEmoji(scenario.buffer))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

})