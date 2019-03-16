function dec2bin(dec) {
	return (dec >>> 0).toString(2)
}

function hexStringToBuffer(hexString) {
	if (!hexString.length) {
		return Buffer.from([])
	}
	return Buffer.from(hexString.match(/.{1,2}/g).map(chunk => '0x' + chunk))
}

module.exports = {
	dec2bin,
	hexStringToBuffer
}