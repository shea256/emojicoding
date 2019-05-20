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

	if (!(emojiChars instanceof Array)) {
		throw new TypeError('Input must be an array')
	}

	let emojiNames = []

	emojiChars.forEach(emojiChar => {
		if (!isEmoji(emojiChar)) {
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

function decodeFromEmoji(emojiChars, returnType) {
	// Convert the emoji chars to emoji names
	const emojiNames = emojiCharsToEmojiNames(emojiChars)

	// Convert the emoji names to a buffer
	const buffer = emojiNamesToBuffer(emojiNames)

	if (returnType === 'buffer') {
		// Return the buffer
		return buffer
	} else if (returnType === 'hex') {
		// Return the buffer as a hex string
		return buffer.toString('hex')
	} else {
		throw new Error('Invalid return type')
	}
}

module.exports = {
	decodeFromEmoji,
	emojiCharsToEmojiNames,
	emojiNamesToBuffer
}
