import { CLOUD_NAME, PRESET_KEY, CLOUDINARY_URL } from '../utils/config';

export const checkImage = (file) => {
  if (!file) {
    throw new Error("File does not exist.");
  }

  // 1 MB
  if (file.size > 1024 * 1024) {
    throw new Error("File size must be less than 1 Mb.");
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    throw new Error("Image must be jpeg or png.");
  }
};

export const imageUpload = async (images) => {
  let imgArr = [];

  for (const item of images) {
    try {
      checkImage(item);

      const formData = new FormData();
      formData.append("file", item.camera || item);
      formData.append("upload_preset", PRESET_KEY);
      formData.append("cloud_name", CLOUD_NAME);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Image upload failed with status ${res.status}`);
      }

      const data = await res.json();
      imgArr.push({ public_id: data.public_id, url: data.secure_url });
    } catch (error) {
      console.error("Image upload error:", error);
      // Handle the error as needed, e.g., show a user-friendly message
    }
  }

  return imgArr;
};

