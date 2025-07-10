"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const FormSubmitBtn = () => {
  const status = useFormStatus();
  return (
    <p className="form-actions">
      <button>{status.pending ? "Submitting" : "Create Post"}</button>
    </p>
  );
};

export default FormSubmitBtn;
