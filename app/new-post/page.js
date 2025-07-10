"use client";
import FormSubmitBtn from "./formSubmit";
import { useActionState } from "react";
import { createPostAction, testaction } from "../actions/post";

export default function NewPostPage() {
  const [formstate, createPost] = useActionState(createPostAction, {
    errors: [],
  });
  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <button onClick={() => testaction("ABCD")} type="button">
          Test
        </button>
        <FormSubmitBtn />
        {formstate.errors && formstate.errors.length > 0 && (
          <ul className="form-errors">
            {formstate.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
