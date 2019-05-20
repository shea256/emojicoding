module.exports = {
	encode: require('./encode').encode,
	decode: require('./decode').decode,
	convertBase: require('./convertBase'),
	emojiNamesToBuffer: require('./decode').emojiNamesToBuffer,
	bufferToEmojiNames: require('./encode').bufferToEmojiNames,
	emojiNamesToEmojiChars: require('./encode').emojiNamesToEmojiChars,
	emojiCharsToEmojiNames: require('./decode').emojiCharsToEmojiNames,
	hexStringToBuffer: require('./utils').hexStringToBuffer,
	isEmoji: require('./utils').isEmoji
}