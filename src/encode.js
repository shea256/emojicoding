const emojilib = require('emojilib')
const convertBase = require('./convertBase')

function bufferToEmojiNames(dataBuffer) {
	let emojiNames = []

	const tenBitChunks = convertBase(dataBuffer, 8, 10, true)

	tenBitChunks.map(emojiIndex => {
		const emojiName = emojilib.ordered[emojiIndex]
		emojiNames.push(emojiName)
	})

	return emojiNames
}

function emojiNamesToEmojiChars(emojiNames) {
	let emojiChars = []

	emojiNames.forEach(emojiName => {
		const emojiChar = emojilib.lib[emojiName].char
		emojiChars.push(emojiChar)
	})

	return emojiChars
}

function encode(dataBuffer) {
	const emojiNames = bufferToEmojiNames(dataBuffer)
	const emojiChars = emojiNamesToEmojiChars(emojiNames)
	return emojiChars
}

module.exports = {
	encode,
	bufferToEmojiNames,
	emojiNamesToEmojiChars
}