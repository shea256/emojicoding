# Emojicoding

### About

Emojicoding is a library for encoding data to and from emojibase - a base 1024 encoding (10 bits of entropy per character), where each character is displayed as a single emoji.

### Getting Started

##### Step 1: Install with npm or Yarn

npm:

```
npm install emojicoding
```

Yarn:

```
yarn add emojicoding
```

##### Step 2: Import the library

```js
import emojicoding from 'emojicoding'
```

### Encode to Emoji

First, generate your key:

```
> var keyBuffer = crypto.randomBytes(8); console.log(keyBuffer)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```

...then encode it with the buffer value:

```
> var emojiKey = emojicoding.encodeToEmoji(keyBuffer); console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

...or pass it in as a hex string:

```
> var keyHex = keyBuffer.toString('hex'); console.log(keyHex)
'e09c563a561de6ae'
> var emojiKey = emojicoding.encodeToEmoji(keyHex); console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

### Decode from Emoji

First, get your emoji key:

```
> console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

...then decode it to a buffer:

```
> var recoveredKey = emojicoding.decodeFromEmoji(emojiKey, 'buffer'); console.log(recoveredKey)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```

...or decode it to a hex string:

```
> var recoveredKey = emojicoding.decodeFromEmoji(emojiKey, 'hex'); console.log(recoveredKey)
'e09c563a561de6ae'
```