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

Node

```js
const emojicoding = require('emojicoding')
```

## Encoding

First, get the value you'd like to encode. Here we'll create a random sequence of bytes:

```
> let bufferValue = crypto.randomBytes(8); console.log(bufferValue)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```

Then encode it with the buffer value:

```
> let emojiValue = emojicoding.encodeToEmoji(bufferValue); console.log(emojiValue)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

Or pass it in as a hex string:

```
> let hexValue = bufferValue.toString('hex'); console.log(hexValue)
'e09c563a561de6ae'
> let emojiValue = emojicoding.encodeToEmoji(hexValue); console.log(emojiValue)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

## Decoding

First, get your emoji value:

```
> console.log(emojiValue)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

Then decode it to a buffer:

```
> let recoveredBuffer = emojicoding.decodeFromEmoji(emojiValue, 'buffer'); console.log(recoveredBuffer)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```

Or decode it to a hex string:

```
> let recoveredHex = emojicoding.decodeFromEmoji(emojiValue, 'hex'); console.log(recoveredHex)
'e09c563a561de6ae'
```

## Examples

### Example 1: Bitcoin Addresses

```
> const bs58check = require('bs58check')
> let bitcoinAddress = '1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs'
> let bitcoinAddressHex = bs58check.decode(bitcoinAddress).toString('hex')
> console.log(bitcoinAddressHex)
00f54a5851e9372b87810a8e60cdd2e7cfd80b6e31
> let emojiAddress = emojicoding.encodeToEmoji(bitcoinAddressHex)
> console.log(emojiAddress.join(' ')
😁 💾 🛹 🤢 🌡 🔦 🚲 🔧 😫 🧛‍♀️ 🤯 🍁 💉 🤦‍♀️ ☃ 📡 👩‍🏭
```

### Example 2: Ethereum Accounts

```
> let ethereumAccount = '0x02F024e0882B310c6734703AB9066EdD3a10C6e0'
> let trimmedAccount = ethereumAccount.replace(/^0x/, '').toLowerCase()
> let emojiAccount = emojicoding.encodeToEmoji(trimmedAccount).join(' ')
> console.log(emojiAccount)
🙂 🚀 🧶 👋 👲 🏗 🌋 🏠 🐿 🚿 🍜 🍾 🧯 🦠 😡 🏍
```

### Example 3: Stacks Addresses

```
> const c32check = require('c32check')
> let stacksAddress = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7'
> let decodedAddress = c32check.c32addressDecode(stacksAddress)
> console.log(decodedAddress)
[ 22, 'a46ff88886c2ef9762d970b4d2c63678835bd39d' ]
> let emojiAddress = emojicoding.encodeToEmoji(decodedAddress[1])
> console.log(emojiAddress.join(' '))
🤸‍♂️ 🚤 🌶 🖐 🚥 🛩 🌷 🚑 🐾 🖥 👮 🍔 🌗 🥵 🚇 🕳
```
