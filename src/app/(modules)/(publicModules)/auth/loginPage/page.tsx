"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession, signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, SocialLoginUser } from "@/services/authService";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";
import Spinner from "@/components/Spinner";
import CustomInput from "@/components/CustomeInput";
import PasswordInput from "@/components/CustomePasswordInput";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .trim("No leading or trailing spaces allowed")
    .strict(true),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .trim("No leading or trailing spaces allowed")
    .strict(true),
});

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.root.signIn);
  const router = useRouter();
  const { data: session } = useSession();

  // Form setup with react-hook-form and Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (session) {
      const data: any = {
        email: session.user?.email,
      };

      dispatch(SocialLoginUser(data));
      localStorage.setItem("userSession", JSON.stringify(session));
      router.push("/home");
    }
  }, [session]);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await dispatch(LoginUser(data));
      if (LoginUser.rejected.match(response)) {
        router.push("/auth/loginPage");
      } else if (LoginUser.fulfilled.match(response)) {
        const userRole = response.payload?.user?.role;
        console.log(userRole, "userRole");
        userRole === "admin"
          ? router.push("/users")
          : router.push("/userDashboard");
      }
    } catch (error) {
      // Handle error
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 animate-fade-in">
          Welcome to my Next Website
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mb-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <CustomInput
              type="text"
              name="email"
              label="Email"
              id="name"
              //onKeyDown={handleKeyDown}
              autoComplete="company-name"
              placeholder="E-mail"
              register={{ ...register("email") }}
              error={errors?.email}
            />
          </div>
          <div className="mb-4">
            <PasswordInput
              label="Password"
              id="name"
              //onKeyDown={handleKeyDown}
              autoComplete="company-name"
              placeholder="Password"
              register={{ ...register("password") }}
              error={errors?.password}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
            >
              {loading ? <Spinner /> : "Sign in"}
            </button>
          </div>
          <Link href="/auth/forgotPassword" className="text-sm text-right">
            <p className="text-blue-600 font-semibold hover:underline">
              Forgot Password?
            </p>
          </Link>
          <br />
          <Link href="/auth/signupPage">
            <p className="text-sm mt-1 text-center text-gray-700">
              Don't Have an Account?{" "}
              <span className="text-blue-600 font-semibold hover:underline">
                Sign Up
              </span>
            </p>
          </Link>
        </form>
        <p className="text-2xl mb-2">Or sign in with</p>
        <div className="flex space-x-4">
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-200"
            onClick={() => signIn("github")}
          >
            <FaGithub size={24} />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300"
            onClick={() => signIn("google")}
          >
            <FaGoogle size={24} />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300"
            onClick={() => signIn("twitter")}
          >
            <FaTwitter size={24} />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300"
            onClick={() => signIn("facebook")}
          >
            <FaFacebook size={24} />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300"
            onClick={() => signIn("linkedin")}
          >
            <FaLinkedin size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuthPublic(Login);
