export default async function handler(req, res) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const auth = Buffer.from(
    `${apiKey}:${apiSecret}`
  ).toString("base64");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=portfolio/&max_results=100`,
    {
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data.resources || []);
}