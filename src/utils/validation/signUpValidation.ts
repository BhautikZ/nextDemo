// utils/validationSchemas.ts
import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .test(
      "no-start-space",
      "Name cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .test(
      "no-start-space",
      "Email cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .test(
      "no-start-space",
      "Password cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .test(
      "no-start-space",
      "Confirm password cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Confirm password is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .test(
      "no-start-space",
      "Phone number cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Phone number is required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Please select a gender")
    .required("Gender is required"),
  skills: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "Select at least one skill")
    .required("Skills are required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  images: Yup.array()
    .of(
      Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File size is too large", (value) => {
          if (value && value instanceof File) {
            return value.size <= 5 * 1024 * 1024; // 5MB
          }
          return false;
        })
        .test("fileFormat", "Unsupported file format", (value) => {
          if (value && value instanceof File) {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type
            );
          }
          return false;
        })
    )
    .min(1, "At least one image is required")
    .required("Images are required"),
});

export const profileValidationSchema = Yup.object({
  name: Yup.string()
    .test(
      "no-start-space",
      "Name cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .test(
      "no-start-space",
      "Email cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .test(
      "no-start-space",
      "Phone number cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Phone number is required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Please select a gender")
    .required("Gender is required"),
  skills: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "Select at least one skill")
    .required("Skills are required"),
  images: Yup.array()
    .of(
      Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File size is too large", (value) => {
          if (typeof value === "string") return true;

          if (value && value instanceof File) {
            return value.size <= 5 * 1024 * 1024; // 5MB
          }
          return false;
        })
        .test("fileFormat", "Unsupported file format", (value) => {
          if (typeof value === "string") return true;

          if (value && value instanceof File) {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type
            );
          }
          return false;
        })
    )
    .test(
      "minImages",
      "At least one valid image is required",
      (imagesArray) => {
        console.log(imagesArray, "image");
        if (typeof imagesArray === "string") return true;
        // Ensure that there's at least one valid image (either a string or File)
        return imagesArray && imagesArray.length > 0;
      }
    )
    .required("Images are required"),
});
