import "dotenv/config";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

try {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: (() => {
        const form = new FormData();
        form.append("file", "https://res.cloudinary.com/demo/image/upload/sample.jpg");
        form.append("folder", "shopease/test");
        return form;
      })(),
    }
  );

  console.log("Status:", response.status);
  console.log("X-Cld-Error:", response.headers.get("x-cld-error"));
  console.log("Response:", await response.text());
} catch (error) {
  console.error("Request failed:", error.message);
}