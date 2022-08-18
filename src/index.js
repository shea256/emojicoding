module.exports = {
	convertBase: require('./convertBase'),

	encodeToEmoji: require('./encode').encodeToEmoji,
	decodeFromEmoji: require('./decode').decodeFromEmoji,

	emojiSlugsToBuffer: require('./decode').emojiSlugsToBuffer,
	bufferToEmojiSlugs: require('./encode').bufferToEmojiSlugs,

	emojiSlugsToEmojiSymbols: require('./encode').emojiSlugsToEmojiSymbols,
	emojiSymbolsToEmojiSlugs: require('./decode').emojiSymbolsToEmojiSlugs,

	isHex: require('./utils').isHex,
	hexStringToBuffer: require('./utils').hexStringToBuffer,
	isEmoji: require('./utils').isEmoji,
	isEmojiSlug: require('./utils').isEmojiSlug,

	symbols1024: require('./utils').symbols1024,
	slugs1024: require('./utils').slugs1024,

	emojiSymbolToCodePoints: require('./codePoints').emojiSymbolToCodePoints,

	// This is an object, not a function
	codePointsToEmojiSlug: require('./codePoints').codePointsToEmojiSlug,
	// This is an object, not a function
	emojiSlugToCodePoints: require('./codePoints').emojiSlugToCodePoints,
}

//orderedEmoji: require('./utils').orderedEmoji,
//emojilibData: require('./utils').emojilibData