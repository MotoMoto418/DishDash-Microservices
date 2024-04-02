"use client";

import React, { useState } from "react";
import Input from "../components/inputs/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
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
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
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
        // You can handle the failed registration response here
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle any other errors that may occur during registration
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
      <select {...register("category", { required: true })} id="type">
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
      </select>
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
