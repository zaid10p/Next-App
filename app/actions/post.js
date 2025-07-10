"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPostAction = async (_prevstate, formData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");
  const errors = [];
  if (!title || !content) {
    errors.push("Title and content are required.");
  }
  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl = "";
  try {
    imageUrl = await uploadImage(image);
  } catch (e) {
    console.error("Image upload failed:", e);
    return { errors: ["Image upload failed. Please try again."] };
  }

  await storePost({
    imageUrl,
    // "https://dummyjson.com/image/300x200/008080/ffffff?text=" +
    title: formData.get("title"),
    content: formData.get("content"),
    userId: 1,
  });
  revalidatePath("/feed");
  redirect("/feed");
};

export async function likePost(postId) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}

export const testaction = async (param) => {
  console.log("testaction called", param);
  console.log("reading env .. ", process.env.TEST_SECRET);
};
