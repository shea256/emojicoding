// Create: emojilibKeywords
const emojilibKeywords = require('emojilib')
// Create: emojilibData
const unicodeEmojiJson = require('unicode-emoji-json')
/*for (const emoji in emojilibData) {
	emojilibData[emoji]['keywords'] = emojilibKeywords[emoji]
}*/
//console.log(emojilibData)

// Create: orderedEmoji
let orderedEmoji = require('unicode-emoji-json/data-ordered-emoji')

function dec2bin(dec) {
	return (dec >>> 0).toString(2)
}

function isHex(input) {
  var hexPattern = /([A-F]|[a-f]|\d)*/;
  return input.match(hexPattern)[0] === input;
}

function hexStringToBuffer(input) {
	if (!input.length) {
		return Buffer.from([])
	}
	let hexString = input.replace(/^0x/, '')
	return Buffer.from(hexString, 'hex')
}

function isEmoji(input) {
  var emojiPattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	if (input.match(emojiPattern)) {
		return true
	} else {
		return false
	}
}

function padArray(array, padWith, numTimes) {
	let paddedArray = []

	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < numTimes; j++) {
			paddedArray.push(padWith)
		}
		paddedArray.push(array[i])
	}

	return paddedArray
}

const emojiBreakpoints = [523, 1529, 1546, 1564]

function makeSlugsList1024() {
	let allSlugs = []
	for (var key in unicodeEmojiJson) {
		var value = unicodeEmojiJson[key]
		allSlugs.push(value.slug)
	}

	let slugsList1 = allSlugs.slice(emojiBreakpoints[0], emojiBreakpoints[1])
	let slugsList2 = allSlugs.slice(emojiBreakpoints[2], emojiBreakpoints[3])
	let slugs1024 = slugsList1.concat(slugsList2)

	return slugs1024
}

function makeEmojiSymbolsList1024() {
	let emojiList1 = orderedEmoji.slice(emojiBreakpoints[0], emojiBreakpoints[1])
	let emojiList2 = orderedEmoji.slice(emojiBreakpoints[2], emojiBreakpoints[3])
	let emojiList = emojiList1.concat(emojiList2)
	return emojiList
}

const slugs1024 = makeSlugsList1024()
const symbols1024 = makeEmojiSymbolsList1024()

function isEmojiSlug(input) {
	if (slugs1024.indexOf(input) < 0) {
		return false
	} else {
		return true
	}
}

module.exports = {
	dec2bin,
	isHex,
	hexStringToBuffer,
	isEmoji,
	isEmojiSlug,
	padArray,
	//emojilibData,
	unicodeEmojiJson,
	orderedEmoji,
	slugs1024,
	symbols1024
}