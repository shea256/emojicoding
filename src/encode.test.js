const encode = require('./encode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')

scenarios.forEach(scenario => {
	scenario.buffer = hexStringToBuffer(scenario.hexString)
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - convert buffer to emoji names`, () => {
		expect(JSON.stringify(
			encode.bufferToEmojiNames(scenario.buffer)
		)).toBe(JSON.stringify(
			scenario.emojiNames
		))
	})

	test(`${scenario.label} - convert emoji names to emojis`, () => {
		expect(JSON.stringify(
			encode.emojiNamesToEmojiChars(scenario.emojiNames)
		)).toBe(JSON.stringify(
			scenario.emojis
		))
	})

	test(`${scenario.label} - convert buffer to emojis`, () => {
		expect(
			JSON.stringify(encode.encode(scenario.buffer))
		).toBe(
			JSON.stringify(scenario.emojis)
		)
	})
})
