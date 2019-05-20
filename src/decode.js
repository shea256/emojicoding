const emojilib = require('emojilib')
const convertBase = require('./convertBase')
const dec2bin = require('./utils').dec2bin
const isEmoji = require('./utils').isEmoji
const isEmojiName = require('./utils').isEmojiName
const codePointsToEmojiName = require('./codePoints').codePointsToEmojiName
const emojiCharToCodePoints = require('./codePoints').emojiCharToCodePoints

function emojiCharsToEmojiNames(emojiChars) {
	if (!emojiChars) {
		throw new TypeError('Input must not be empty')
	}

	let emojiNames = []

	emojiChars.forEach(emojiChar => {
		if (!isEmoji) {
			throw 'Input contains non-emoji'
		}

		const codePoints = emojiCharToCodePoints(emojiChar)
		const emojiName = codePointsToEmojiName[codePoints]
		emojiNames.push(emojiName)
	})

	return emojiNames
}

function emojiNamesToBuffer(emojiNames) {
	if (!emojiNames) {
		throw new TypeError('Input must not be empty')
	}

	let emojiIndices = []

	emojiNames.forEach(emojiName => {
		if (!isEmojiName(emojiName)) {
			throw new TypeError('Input contains invalid emoji name')
		}

		const emojiIndex = emojilib.ordered.indexOf(emojiName)

		if (emojiIndex > 1023) {
			throw new TypeError('Input contains characters outside the first 1024 emojis')
		} else {
			emojiIndices.push(emojiIndex)
		}
	})

	const buffer = Buffer.from(convertBase(emojiIndices, 10, 8, false))
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
