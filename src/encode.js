const convertBase = require('./convertBase')
const isEmojiSlug = require('./utils').isEmojiSlug
const hexStringToBuffer = require('./utils').hexStringToBuffer
const isHex = require('./utils').isHex
//const orderedEmoji = require('./utils').orderedEmoji
const slugs1024 = require('./utils').slugs1024
const symbols1024 = require('./utils').symbols1024

function bufferToEmojiSlugs(input) {
	let dataBuffer
	if (!input || input === undefined || !Buffer.isBuffer(input)) {
		throw new TypeError('Input must be a valid buffer')
	} else {
		dataBuffer = input
	}

	let emojiSlugs = []

	const tenBitChunks = convertBase(dataBuffer, 8, 10, true)

	tenBitChunks.map(emojiIndex => {
		const emojiSlug = slugs1024[emojiIndex]
		emojiSlugs.push(emojiSlug)
	})

	return emojiSlugs
}

function emojiSlugsToEmojiSymbols(emojiSlugs) {
	if (!emojiSlugs) {
		throw new TypeError('Input must not be empty')
	}

	let emojiSymbols = []

	emojiSlugs.forEach(emojiSlug => {
		if (!isEmojiSlug(emojiSlug)) {
			throw new TypeError('Input contains invalid emoji slug')
		}

		const emojiIndex = slugs1024.indexOf(emojiSlug)

		const emojiSymbol = symbols1024[emojiIndex]

		emojiSymbols.push(emojiSymbol)
	})

	return emojiSymbols
}

function encodeToEmoji(input) {
	// Validate the input and extract the buffer
	let dataBuffer = undefined
	if (input === undefined) {
		throw new TypeError('Input must not be undefined')
	} else if (Buffer.isBuffer(input)) {
		dataBuffer = input
	} else if (isHex(input)) {
		dataBuffer = hexStringToBuffer(input)
	} else {
		throw new TypeError('Input must be a buffer or hex string')
	}

	// Convert the buffer to emoji slugs
	const emojiSlugs = bufferToEmojiSlugs(dataBuffer)

	// Convert the emoji slugs to emoji symbols
	const emojiSymbols = emojiSlugsToEmojiSymbols(emojiSlugs)

	// Return the emoji symbols
	return emojiSymbols
}

module.exports = {
	encodeToEmoji,
	bufferToEmojiSlugs,
	emojiSlugsToEmojiSymbols
}