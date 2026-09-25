import ImageKit,{toFile} from "@imagekit/nodejs";

const privatekey = process.env.IMAGEKIT_PRIVATE_KEY;
if (!privatekey ) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured");
}

const imagekit = new ImageKit({
      
    privateKey : privatekey
});


function hasImageKitConfig() { 
    return Boolean(privatekey)
}

function createFileName(originalname = "upload") { 
    const safeName = originalname.replace(/[^a-zA-Z0-9._-]/g, "_")
    return `chat-${Date.now()}-${safeName}`;
}


async function uploadChatMedia(file : any) {
    const fileName = createFileName(file.originalname)
    

    const result = await imagekit.files.upload({
    file: await toFile(file.buffer, fileName, { type: file.mimetype }),
    fileName,
    folder: "/chat",
  });

  return result.url;
}

export {uploadChatMedia,createFileName};