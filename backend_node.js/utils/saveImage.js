const fs        = require('fs');
const logger    = require('../lib/logger');

function saveImage(data, filename) {
    if(!data || !filename)
        logger(`Error saving image file => Invalid data: ${data} - ${filename}`);

    // Save the image file received.
    // Remove the header from the base64 data chunk.
    const base64Data = data.replace(/^data:image\/png;base64,/,"");

    fs.open(filename, 'w', (err, fd) => {
        if (err) throw err;

        fs.writeFile(fd, base64Data, "base64", (err) => {
            if (err) throw err;
        });
    });
}

module.exports  = saveImage;