const emojilib = require('emojilib')
const convertBase = require('./convertBase')
const isEmojiName = require('./utils').isEmojiName
const hexStringToBuffer = require('./utils').hexStringToBuffer
const isHex = require('./utils').isHex

function bufferToEmojiNames(input) {
	let dataBuffer
	if (!input || input === undefined || !Buffer.isBuffer(input)) {
		throw new TypeError('Input must be a valid buffer')
	} else {
		dataBuffer = input
	}

	let emojiNames = []

	const tenBitChunks = convertBase(dataBuffer, 8, 10, true)

	tenBitChunks.map(emojiIndex => {
		const emojiName = emojilib.ordered[emojiIndex]
		emojiNames.push(emojiName)
	})

	return emojiNames
}

function emojiNamesToEmojiChars(emojiNames) {
	if (!emojiNames) {
		throw new TypeError('Input must not be empty')
	}

	let emojiChars = []

	emojiNames.forEach(emojiName => {
		if (!isEmojiName(emojiName)) {
			throw new TypeError('Input contains invalid emoji name')
		}

		const emojiChar = emojilib.lib[emojiName].char
		emojiChars.push(emojiChar)
	})

	return emojiChars
}

function encode(input) {
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

	const emojiNames = bufferToEmojiNames(dataBuffer)
	const emojiChars = emojiNamesToEmojiChars(emojiNames)
	return emojiChars
}

module.exports = {
	encode,
	bufferToEmojiNames,
	emojiNamesToEmojiChars
}