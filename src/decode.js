const emojilib = require('emojilib')
const convertBase = require('./convertBase')
const dec2bin = require('./utils').dec2bin
const bitwise = require('bitwise')
const codePointsToEmojiName = require('./codePoints').codePointsToEmojiName
const emojiCharToCodePoints = require('./codePoints').emojiCharToCodePoints

function emojiCharsToEmojiNames(emojiChars) {
	let emojiNames = []

	emojiChars.forEach(emojiChar => {
		const codePoints = emojiCharToCodePoints(emojiChar)
		const emojiName = codePointsToEmojiName[codePoints]
		emojiNames.push(emojiName)
	})

	return emojiNames
}

function emojiNamesToBuffer(emojiNames) {
	let emojiIndices = []

	emojiNames.forEach(emojiName => {
		const emojiIndex = emojilib.ordered.indexOf(emojiName)
		emojiIndices.push(emojiIndex)
	})

	const buffer = Buffer.from(convertBase(emojiIndices, 10, 8, true))
	return buffer
}

function decode(emojiChars) {
	const emojiNames = emojiCharsToEmojiNames(emojiChars)
	const buffer = emojiNamesToBuffer(emojiNames)
	return buffer
}

module.exports = {
	decode,
	emojiCharsToEmojiNames,
	emojiNamesToBuffer
}
