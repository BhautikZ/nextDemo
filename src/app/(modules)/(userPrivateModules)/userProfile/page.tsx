"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import Select from "react-select";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, GetProfile } from "@/services/authService";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { profileValidationSchema } from "@/utils/validation/signUpValidation";

interface ProfileFormValue {
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  skills: { label: string; value: number }[];
  images: File[];
}

const skillOptions = [
  { value: 1, label: "JavaScript" },
  { value: 2, label: "React" },
  { value: 3, label: "Node.js" },
  { value: 4, label: "TypeScript" },
  { value: 5, label: "CSS" },
];

const UserProfile = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const { loading } = useSelector((state: any) => state.root.signIn);
  const UserData = useSelector((state: any) => state.root.signIn.loginData);
  const SocialUserData = useSelector(
    (state: any) => state.root.signIn.socialLoginUserData
  );
  const ProfileData = useSelector(
    (state: any) => state.root.signIn.profileData
  );

  const userID = UserData?.user?._id || SocialUserData?.user?._id;
  const Token = UserData?.token || SocialUserData?.token;
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userID && Token) {
      dispatch(GetProfile({ id: userID, token: Token }));
    }
  }, [userID, Token, dispatch]);

  const initialValues: ProfileFormValue = {
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    skills: [],
    images: [],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 max-h-screen overflow-y-auto relative">
        <button
          onClick={() => router.push("/home")}
          className="absolute top-4 left-4 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back to Home
        </button>

        <h1 className="text-2xl font-bold text-center mb-8 mt-10">
          My Profile
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={profileValidationSchema}
          onSubmit={async (
            values: ProfileFormValue,
            { resetForm }: FormikHelpers<ProfileFormValue>
          ) => {
            console.log(values, "values");
            const formData = new FormData();
            const skillValues = values.skills.map((skill) => skill.value);

            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("gender", values.gender);
            formData.append("skills", JSON.stringify(skillValues));

            values.images.forEach((image) => {
              formData.append("profile_image", image);
            });

            try {
              console.log(formData, "formData");
              const response = await dispatch(
                editProfile({ userID, formData })
              ).unwrap();
              console.log("Success:", response);
            } catch (error) {
              console.error("Error:", error);
            }
          }}
          enableReinitialize={true}
        >
          {({ setFieldValue, setValues, values }) => {
            useEffect(() => {
              if (ProfileData?.user) {
                const profile = ProfileData.user;
                const skillsOptions = skillOptions.filter((option) =>
                  profile.skills.includes(option.value)
                );
                setPreviews(
                  profile.profile_image.map(
                    (image: string) =>
                      `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
                  )
                );

                // Update form values
                setValues({
                  name: profile?.name,
                  email: profile?.email,
                  phoneNumber: profile?.phoneNumber?.toString(),
                  gender: profile?.gender,
                  skills: skillsOptions,
                  images: profile?.profile_image,
                });
              }
            }, [ProfileData, setValues]);

            return (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <Field
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="male"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Field
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="female"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills
                    </label>
                    <Field name="skills">
                      {({ field, form }: any) => (
                        <Select
                          isMulti
                          options={skillOptions}
                          value={field.value}
                          onChange={(options) =>
                            setFieldValue("skills", options || [])
                          }
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="images"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profile Images
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={(event) => {
                          const files = event.currentTarget.files;
                          if (files) {
                            const fileArray = Array.from(files);
                            setFieldValue("images", fileArray);
                            setPreviews(
                              fileArray.map((file) => URL.createObjectURL(file))
                            );
                          }
                        }}
                        className="absolute left-0 top-0 opacity-0 h-full w-full cursor-pointer"
                      />
                      <div className="flex items-center justify-center py-3 px-6 border border-dashed border-gray-300 rounded-md text-gray-500">
                        <AiOutlineCloudUpload className="w-6 h-6 mr-2" />
                        <span>Upload Images</span>
                      </div>
                    </div>
                    <ErrorMessage
                      name="images"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                    {previews.length > 0 && (
                      <div className="mt-4 grid grid-cols-4 gap-4">
                        {previews.map((preview, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={preview}
                              alt="Preview"
                              width={100}
                              height={100}
                              className="object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newPreviews = previews.filter(
                                  (_, i) => i !== index
                                );
                                setPreviews(newPreviews);
                                setFieldValue(
                                  "images",
                                  newPreviews.map((url) =>
                                    URL.revokeObjectURL(url)
                                  )
                                );
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : "Update Profile"}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UserProfile;
