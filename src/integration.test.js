const decode = require('./decode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')
const encode = require('./encode')

scenarios.forEach(scenario => {
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - encode buffer to emojis and decode back`, () => {
		if (scenario.success[0] && scenario.success[1] && scenario.success[2] && scenario.success[3]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)
			expect(JSON.stringify(
				decode.decodeFromEmoji(
					encode.encodeToEmoji(scenario.hexString), 'hex'
				)
			))
			.toBe(JSON.stringify(scenario.hexString))
		} else {
			try {
				expect(
					decode.decodeFromEmoji(
						encode.encodeToEmoji(scenario.hexString), 'hex'
					)
				)
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

})