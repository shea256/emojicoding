# Emojicoding

### About

Emojicoding is a library for encoding data to and from emojibase - a base 1024 encoding (10 bits of entropy per character), where each character is displayed as a single emoji.

### Getting Started

##### Step 1: Install with NPM or Yarn

```
npm install emojicoding
```

##### Step 2: Import the library

```js
import emojicoding from 'emojicoding'
```

### Encode as Emoji

```
> var emojicoding = require('./src')
> var key = crypto.randomBytes(8); console.log(key)
<Buffer e0 9c 56 3a 56 1d e6 ae>
> var emojiKey = emojicoding.encode(key); console.log(emojiKey)
[ '🔨', '🌵', '🦖', '🍮', '✊', '🍷', '🧰' ]
```

### Decode from Emoji

```
> var recoveredKey = emojicoding.decode(emojiKey); console.log(recoveredKey)
<Buffer e0 9c 56 3a 56 1d e6 ae>
```
