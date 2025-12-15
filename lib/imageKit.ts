import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!, // Safe for client
  privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY!, // Server-only key
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!, // Safe for client
});

export default imagekit;
