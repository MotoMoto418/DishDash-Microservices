"use client";

import React, { useState } from "react";
import Input from "../components/inputs/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Signed in successfully!");

        const responseData = await response.json();
        console.log(responseData);

        Cookies.set("user_id", responseData.user_id);

        router.push("/");
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
      <h1 className="text-center font-bold text-3xl">Login</h1>
      <hr className="bg-slate-300 w-full h-px" />
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
      <Button
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        New around here?{" "}
        <Link href={"/register"} className="underline">
          Register
        </Link>
      </p>
    </>
  );
}
