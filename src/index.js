module.exports = {
	encodeToEmoji: require('./encode').encodeToEmoji,
	decodeFromEmoji: require('./decode').decodeFromEmoji,
	convertBase: require('./convertBase'),
	emojiNamesToBuffer: require('./decode').emojiNamesToBuffer,
	bufferToEmojiNames: require('./encode').bufferToEmojiNames,
	emojiNamesToEmojiChars: require('./encode').emojiNamesToEmojiChars,
	emojiCharsToEmojiNames: require('./decode').emojiCharsToEmojiNames,
	isHex: require('./utils').isHex,
	hexStringToBuffer: require('./utils').hexStringToBuffer,
	isEmoji: require('./utils').isEmoji,
	isEmojiName: require('./utils').isEmojiName,
	orderedEmoji: require('./utils').orderedEmoji,
	emojilibData: require('./utils').emojilibData
}