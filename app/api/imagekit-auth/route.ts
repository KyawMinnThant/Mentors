import ImageKit from "imagekit";

export async function GET() {
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!, // Safe for client
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY!, // Server-only key
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!, // Safe for client
  });

  const authParams = imagekit.getAuthenticationParameters();

  return Response.json(authParams);
}
