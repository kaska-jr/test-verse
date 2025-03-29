"use client";
import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { emailValidationRules, passwordValidationRules } from "@/lib/validate";
import axios from "axios";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fetchUser = async (userEmail: string) => {
    try {
      const response = await axios(`/api/users?email=${userEmail}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    setErrormsg("");
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (callback?.ok) {
        console.log("callback", callback);
        const userEmail = data.email;
        const response = await fetchUser(userEmail);
        const { role } = response?.data;
        setIsLoading(false);
        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
      if (callback?.error) {
        setErrormsg(callback.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-muted/40">
        <div className="bg-card relative w-full max-w-md my-6 mx-auto h-auto shadow-md rounded-2xl px-5 py-16">
          <div className="flex flex-col gap-4">
            <Heading
              title="Welcome Back"
              subtitle="Enter your email address and password to access your account."
              center
            />

            <Input
              id="email"
              label="Email Address"
              disabled={isLoading}
              placeholder="Email Address"
              register={register}
              validationRules={emailValidationRules}
              errors={errors}
              required
            />

            <div className="flex items-center justify-between relative">
              <Input
                id="password"
                label="Password"
                placeholder=".........."
                disabled={isLoading}
                validationRules={passwordValidationRules}
                register={register}
                errors={errors}
                type="password"
                required
              />
              <div className="text-neutral-500 text-center font-light absolute right-0 -top-0 cursor-pointer">
                <span className=" hover:text-black font-semibold cursor-pointer text-xs md:text-sm">
                  Forget password
                </span>
              </div>
            </div>

            <Button className="w-full">
              <div className="flex items-center justify-center gap-2">
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                <span>Login</span>
              </div>
            </Button>
            <span className="text-red-500 text-left text-xs md:text-sm">
              {errormsg}
            </span>
          </div>
          <div className="flex flex-col gap-4 mt-3">
            <hr />

            <div className="text-neutral-500 text-center font-light">
              <div>
                {`Didn't have an Account?`}{" "}
                <Link
                  href={"/signup"}
                  className=" hover:text-black font-semibold cursor-pointer text-xs md:text-sm"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
