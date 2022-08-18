const encode = require('./encode')
const hexStringToBuffer = require('./utils').hexStringToBuffer
const scenarios = require('./testScenarios')
const util = require('util')

/*
			//console.log(scenario.buffer)
			
			// Delete this
			let emojiNames = encode.bufferToEmojiNames(scenario.buffer)
			let emojiNamesEveryFourth = []

			for (var i = 0; i < emojiNames.length; i++) {
				if (i % 4 === 3) {
					emojiNamesEveryFourth.push(emojiNames[i])
				}
			}
			console.log(
				JSON.stringify(emojiNamesEveryFourth).replace("\n", "")
			)
			//console.log(util.inspect(emojiNamesEveryFourth, { maxArrayLength: null }))

*/

			/*let emoji = encode.emojiNamesToEmojiChars(scenario.emojiNames)
			let emojiEveryFourth = []
			for (var i = 0; i < emoji.length; i++) {
				if (i % 4 === 3) {
					emojiEveryFourth.push(emoji[i])
				}
			}
			console.log(
				JSON.stringify(emojiEveryFourth)
			)*/

scenarios.forEach(scenario => {
	scenario.label = scenario.label || scenario.hexString

	test(`${scenario.label} - convert buffer to emoji slugs`, () => {
		if (scenario.success[0]) {
			scenario.buffer = hexStringToBuffer(scenario.hexString)

			expect(JSON.stringify(encode.bufferToEmojiSlugs(scenario.buffer)))
			.toBe(JSON.stringify(scenario.emojiSlugs))
		} else {
			try {
				expect(encode.bufferToEmojiSlugs(undefined))
			} catch (e) {
				expect(e).toBeInstanceOf(TypeError)
			}
		}
	})

	test(`${scenario.label} - convert emoji slugs to emojis`, () => {
		if (scenario.success[1]) {

			expect(JSON.stringify(encode.emojiSlugsToEmojiSymbols(scenario.emojiSlugs)))
			.toBe(JSON.stringify(scenario.emojis))
		} else {
			try {
				expect(encode.emojiSlugsToEmojiSymbols(scenario.emojiSlugs))
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