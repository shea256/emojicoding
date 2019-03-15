function dec2bin(dec) {
	return (dec >>> 0).toString(2)
}

module.exports = {
	dec2bin
}