"use client";

import React, { useState } from "react";
import Input from "../components/inputs/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      f_name: "",
      l_name: "",
      ph_no: "",
      user_id: "",
      password: "",
      cafe_name: "",
      location: "",
      cafe_image: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center font-bold text-3xl">Register</h1>
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="f_name"
        label="First Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="l_name"
        label="Last Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="ph_no"
        label="Phone No."
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="user_id"
        label="Username"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <select
        {...register("category", { required: true })}
        id="type"
        onChange={(e) => setIsVendor(e.target.value === "vendor")}
      >
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
      </select>

      {isVendor && (
        <>
          <Input
            id="cafe_name"
            label="Cafe Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="location"
            label="Location"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="cafe_image"
            label="Cafe Image Link"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </>
      )}

      <Button
        label={isLoading ? "Loading" : "Register"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </p>
    </>
  );
}
