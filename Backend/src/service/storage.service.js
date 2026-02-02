const ImageKit = require("imagekit");

// Connection Setup
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(buffer) {
    try {
        const result = await imagekit.upload({
            file: buffer,
            fileName: `image-${Date.now()}.jpg`
        });

        return result;

    } catch (error) {
        console.log("❌ ImageKit Upload Failed:", error.message);
        throw error;
    }
}

module.exports = uploadFile;