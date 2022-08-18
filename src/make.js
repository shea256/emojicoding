const fs = require('fs');
const path = require('path');
const slugs1024 = require('../src/utils').slugs1024
const symbols1024 = require('../src/utils').symbols1024

fs.mkdir(path.join(__dirname, '../data'), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});

// Write slugs list to file
const slugsFilename = 'data/emojis-slugs.json';
fs.writeFile(
    slugsFilename,
    JSON.stringify(slugs1024),
    'utf8',
    function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('the file was saved');
    }
);

// Write emojis list to file
const emojisFilename = 'data/emojis-symbols.json';
fs.writeFile(
    emojisFilename,
    JSON.stringify(symbols1024),
    'utf8',
    function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('the file was saved');
    }
)