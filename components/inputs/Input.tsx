"use client";
import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  validationRules?: any;
  errors: FieldErrors;
  placeholder?: string;
  className?: string;
};

function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  className,
  register,
  validationRules,
  placeholder,
  errors,
}: Props) {
  const [visibility, setVisibility] = useState<boolean>(false);
  const toggleShowPassword = () => setVisibility(!visibility);
  return (
    <div className="w-full relative flex flex-col gap-2">
      {formatPrice && <BiDollar size={24} />}
      <label>{label}</label>
      <div className="relative w-full">
        <input
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id, validationRules)}
          type={type === "password" ? (visibility ? "text" : "password") : type}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors[id] ? "ring-1 ring-rose-500" : "border-neutral-300"} ${className}`}
        />
        {type === "password" && (
          <span
            className="absolute text-gray-500 cursor-pointer -translate-y-1/2 text-md lg:text-xl right-2 lg:right-4 top-1/2"
            onClick={toggleShowPassword}
          >
            {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        )}
      </div>
      {errors[id] && (
        <p className="text-rose-500 text-sm">
          {errors[id]?.message?.toString() ?? ""}
        </p>
      )}
    </div>
  );
}

export default Input;
