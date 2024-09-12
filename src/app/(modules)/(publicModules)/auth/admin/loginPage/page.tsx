"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/services/authService";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
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
  const { loading, loginData, socialLoginUserData } = useSelector(
    (state: any) => state.root.signIn
  );
  const Role = loginData?.user?.role || socialLoginUserData?.user?.role;

  const router = useRouter();

  // Form setup with react-hook-form and Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await dispatch(LoginUser(data));
      if (LoginUser.rejected.match(response)) {
        router.push("/auth/admin/loginPage");
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
          Welcome to Admin Sign In Page
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
        </form>
      </div>
    </div>
  );
}

export default withAuthPublic(Login);
