//const emojilibData = require('./utils').emojilibData
const unicodeEmojiJson = require('./utils').unicodeEmojiJson

function emojiSymbolToCodePoints(emojiSymbol) {
	const emojiLength = emojiSymbol.length
	let codePoints = []
	for (var i = 0; i < emojiLength; i++) {
		codePoints.push(emojiSymbol.codePointAt(i))
	}
	const codePointsString = codePoints.join('-')
	return codePointsString
}

/*function mapCodePointsToEmojiName() {
	let codePointMap = {}

	Object.keys(unicodeEmojiJson).forEach(emojiNameKey => {
		const emojiChar = unicodeEmojiJson[emojiNameKey]['char']
		if (!emojiChar) {
			return
		}

		const codePointsKey = emojiCharToCodePoints(emojiChar)
		//console.log(`${emojiChar} - ${codePointsKey}`)

		codePointMap[codePointsKey] = emojiNameKey
	})

	return codePointMap
}*/

function mapCodePointsToEmojiSlug() {
	let codePointMap = {}

	Object.keys(unicodeEmojiJson).forEach(emojiSymbolKey => {
		const emojiSlug = unicodeEmojiJson[emojiSymbolKey]['slug']

		const codePointsKey = emojiSymbolToCodePoints(emojiSymbolKey)

		codePointMap[codePointsKey] = emojiSlug
	})

	return codePointMap
}

//const codePointsToEmojiName = mapCodePointsToEmojiName()
const codePointsToEmojiSlug = mapCodePointsToEmojiSlug()

module.exports = {
	codePointsToEmojiSlug,
	mapCodePointsToEmojiSlug,
	emojiSymbolToCodePoints
}