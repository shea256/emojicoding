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

	test(`${scenario.label} - convert hex OR buffer to emojis`, () => {
		if (scenario.success[0] && scenario.success[1]) {
			expect(JSON.stringify(encode.encode(scenario.hexString)))
			.toBe(JSON.stringify(scenario.emojis))
		} else {
			try {
				expect(encode.encode(undefined))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})
})



//console.log('====================')
//console.log(JSON.stringify(e))
//console.log(e.message)
//console.log(object.type)
//console.log(object.error)
//console.log(typeof object)
//console.log(e instanceof TypeError)

//.toThrowError(TypeError)
//try {
//} catch (e) {
//	console.log(e)
//	console.log(e.type)
	//expect(e.type).toBe(TypeError)
//}