import ImageKit from "@imagekit/nodejs";

const privatekey = process.env.IMAGEKIT_PRIVATE_KEY;

if (!privatekey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured");
}

const imagekit = new ImageKit({
    privateKey : privatekey
});


function hasImageKitConfig() { 
    return Boolean(privatekey)
}

export default imagekit;