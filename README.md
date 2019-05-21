# Emojicoding (Base 1024)

![Emojicoding: Base 1024](https://raw.githubusercontent.com/shea256/emojicoding/master/docs/emojicoding.png)

**WARNING: This library is not extensively tested, so please use at your own risk. Alternatively, feel free to help out by expanding on the test suite.**

## About

Emojicoding is a library for encoding data to and from emojibase - a base 1024 encoding (10 bits of entropy per character), where each character is displayed as a single emoji.

## Getting Started

### Step 1: Install with npm or Yarn

npm:

```
npm install emojicoding
```

Yarn:

```
yarn add emojicoding
```

### Step 2: Import the library

Modern JavaScript (ES6+)

```js
import emojicoding from 'emojicoding'
```

Legacy JavaScript (ES5-)

```js
var emojicoding = require('emojicoding')
```

## Encoding

First, generate your key:

```
> var keyBuffer = crypto.randomBytes(8); console.log(keyBuffer)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```

Then encode it with the buffer value:

```
> var emojiKey = emojicoding.encodeToEmoji(keyBuffer); console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

Or pass it in as a hex string:

```
> var keyHex = keyBuffer.toString('hex'); console.log(keyHex)
'e09c563a561de6ae'
> var emojiKey = emojicoding.encodeToEmoji(keyHex); console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

## Decoding

First, get your emoji key:

```
> console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

Then decode it to a buffer:

```
> var recoveredKey = emojicoding.decodeFromEmoji(emojiKey, 'buffer'); console.log(recoveredKey)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```

Or decode it to a hex string:

```
> var recoveredKey = emojicoding.decodeFromEmoji(emojiKey, 'hex'); console.log(recoveredKey)
'e09c563a561de6ae'
```

## Examples

### Example 1: Bitcoin Addresses

```
> var bs58check = require('bs58check')
> var bitcoinAddress = '1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs'
> var bitcoinAddressHex = bs58check.decode(bitcoinAddress).toString('hex')
> console.log(bitcoinAddressHex)
00f54a5851e9372b87810a8e60cdd2e7cfd80b6e31
> var emojiAddress = emojicoding.encodeToEmoji(bitcoinAddressHex)
> console.log(emojiAddress.join(' ')
😁 💾 🛹 🤢 🌡 🔦 🚲 🔧 😫 🧛‍♀️ 🤯 🍁 💉 🤦‍♀️ ☃ 📡 👩‍🏭
```
