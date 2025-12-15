import ImageKit from "imagekit";

export async function POST(req: Request) {
  const { fileId } = await req.json();

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!, // Safe for client
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY!, // Server-only key
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!, // Safe for client
  });

  await imagekit.deleteFile(fileId);

  return Response.json({ success: true });
}
