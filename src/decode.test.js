const decode = require('./decode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')
const encode = require('./encode')

scenarios.forEach(scenario => {
	scenario.buffer = hexStringToBuffer(scenario.hexString)
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - convert emojis to emoji names`, () => {
		expect(
			JSON.stringify(decode.emojiCharsToEmojiNames(scenario.emojis))
		).toBe(
			JSON.stringify(scenario.emojiNames)
		)
	})

	test(`${scenario.label} - convert emoji names to buffer`, () => {
		expect(
			JSON.stringify(decode.emojiNamesToBuffer(scenario.emojiNames))
		).toBe(
			JSON.stringify(scenario.buffer)
		)
	})

	test(`${scenario.label} - convert emojis to buffer`, () => {
		expect(
			JSON.stringify(decode.decode(scenario.emojis))
		).toBe(
			JSON.stringify(scenario.buffer)
		)
	})

	test(`${scenario.label} - encode buffer to emojis and decode back`, () => {
		expect(
			JSON.stringify(decode.decode(encode.encode(scenario.buffer)))
		).toBe(
			JSON.stringify(scenario.buffer)
		)
	})
})