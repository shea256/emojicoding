const emojilib = require('emojilib')

function emojiCharToCodePoints(emojiChar) {
	const emojiLength = emojiChar.length
	let codePoints = []
	for (var i = 0; i < emojiLength; i++) {
		codePoints.push(emojiChar.codePointAt(i))
	}
	const codePointsString = codePoints.join('-')
	return codePointsString
}

function mapCodePointsToEmojiName() {
	let codePointMap = {}

	Object.keys(emojilib.lib).forEach(emojiNameKey => {
		const emojiChar = emojilib.lib[emojiNameKey]['char']
		if (!emojiChar) {
			return
		}

		const codePointsKey = emojiCharToCodePoints(emojiChar)
		//console.log(`${emojiChar} - ${codePointsKey}`)

		codePointMap[codePointsKey] = emojiNameKey
	})

	return codePointMap
}

const codePointsToEmojiName = mapCodePointsToEmojiName()

module.exports = {
	codePointsToEmojiName,
	emojiCharToCodePoints
}