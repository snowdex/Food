const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (buffer, fileName) => {
  return await imagekit.upload({
    file: buffer,
    fileName,
  });
};

module.exports = { uploadFile };
