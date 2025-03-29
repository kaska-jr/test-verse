"use client";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/SelectDropdown";
import { Button } from "@/components/ui/button";
// import useCountries from "@/hook/useCountries";
import {
  emailValidationRules,
  nameValidationRules,
  passwordValidationRules,
  phoneValidationRules,
} from "@/lib/validate";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        ...data,
        role: "USER",
      };
      await axios.post("/api/register", payload);
      console.log("request Successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // const countries = useCountries().getAll() || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="outline-none focus:outline-none h-screen bg-muted/40 grid md:grid-cols-6">
        <div className="relative w-full max-w-xl my-6 mx-auto min-h-screen px-5 py-16 col-span-3">
          <Heading
            title="Free Sign Up"
            subtitle="Don't have an account? Create your account, it takes less than a minute"
            center
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Input
              id="name"
              label="Full Name"
              placeholder="Your Name"
              disabled={isLoading}
              validationRules={nameValidationRules}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="username"
              label="Username"
              placeholder="Your Username"
              validationRules={nameValidationRules}
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="email"
              label="Email Address"
              placeholder="Your Email"
              disabled={isLoading}
              validationRules={emailValidationRules}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="number"
              label="Phone Number"
              placeholder="Your Phone Number"
              disabled={isLoading}
              validationRules={phoneValidationRules}
              register={register}
              errors={errors}
              required
            />
            {/* <div className="w-full relative flex flex-col gap-3">
              <label>Nationality</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Your Nationality" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.label}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <Input
              id="referral"
              placeholder="Your Referral ID"
              label="Referral ID (Optional)"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="password"
              label="Password"
              placeholder="..........."
              disabled={isLoading}
              register={register}
              errors={errors}
              type="password"
              validationRules={passwordValidationRules}
              required
            />
            <Input
              id="confirm_password"
              label="Confirm Password"
              placeholder="..........."
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
              validationRules={passwordValidationRules}
              required
            />
          </div>
          <Button className="w-full mt-4" type="submit">
            Get Started
          </Button>
          <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div className="text-neutral-500 text-center font-light">
              <div>
                {`Already registered? `}
                <Link
                  href={"/login"}
                  className=" hover:text-black font-semibold cursor-pointer text-xs md:text-sm"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block bg-[url('/background.jpg')] bg-center bg-cover col-span-3"></div>
      </div>
    </form>
  );
};

export default Register;
