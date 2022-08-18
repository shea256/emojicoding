const convertBase = require('./convertBase')
const isEmoji = require('./utils').isEmoji
const isEmojiSlug = require('./utils').isEmojiSlug
const orderedEmoji = require('./utils').orderedEmoji
const codePointsToEmojiSlug = require('./codePoints').codePointsToEmojiSlug
const emojiSymbolToCodePoints = require('./codePoints').emojiSymbolToCodePoints
//const dec2bin = require('./utils').dec2bin
const emojiSlugs = require('./utils').emojiSlugs

function emojiCharsToEmojiSlugs(emojiChars) {
	if (!emojiChars) {
		throw new TypeError('Input must not be empty')
	}

	if (!(emojiChars instanceof Array)) {
		throw new TypeError('Input must be an array')
	}

	let emojiSlugs = []

	emojiChars.forEach(emojiChar => {
		if (!isEmoji(emojiChar)) {
			throw 'Input contains non-emoji'
		}

		const codePoints = emojiSymbolToCodePoints(emojiChar)
		const emojiSlug = codePointsToEmojiSlug[codePoints]
		emojiSlugs.push(emojiSlug)
	})

	return emojiSlugs
}

function emojiSlugsToBuffer(emojiSlugs) {
	if (!emojiSlugs) {
		throw new TypeError('Input must not be empty')
	}

	let emojiIndices = []

	emojiSlugs.forEach(emojiSlug => {
		if (!isEmojiSlug(emojiSlug)) {
			console.log(emojiSlug)
			throw new TypeError('Input contains invalid emoji name')
		}

		const emojiIndex = emojiSlugs.indexOf(emojiSlug)

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
	const emojiSlugs = emojiCharsToEmojiSlugs(emojiChars)

	// Convert the emoji names to a buffer
	const buffer = emojiSlugsToBuffer(emojiSlugs)

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
	emojiCharsToEmojiSlugs,
	emojiSlugsToBuffer
}
