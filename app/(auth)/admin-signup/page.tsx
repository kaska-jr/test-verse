"use client";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import {
  emailValidationRules,
  nameValidationRules,
  passwordValidationRules,
  phoneValidationRules,
} from "@/lib/validate";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AdminRegister = () => {
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
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        role: "ADMIN",
      };
      await axios.post("/api/register", payload);
      console.log("request Successful");
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="outline-none focus:outline-none h-screen bg-muted/40">
        <div className="relative w-full max-w-xl my-6 mx-auto min-h-screen px-5 py-16 ">
          <Heading
            title="Register An Admin Account"
            subtitle="Don't have an account? Create your account, it takes less than a minute"
            center
          />
          <div className="flex flex-col gap-5 mt-5">
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
          </div>
          <Button className="w-full mt-4" type="submit">
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            )}
            Create Admin
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AdminRegister;
