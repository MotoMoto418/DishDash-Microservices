"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

export default function UpdateForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockStatus, setStockStatus] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      availability: stockStatus,
      category: "",
      descr: "",
      image: "",
      name: "",
      price: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);

    const reqObj = {
      table: "food",
      id: props.food_id,
      data: data,
    };

    try {
      const response = await fetch("http://localhost:5006/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reqObj),
      });

      if (response.ok) {
        toast.success("Item updated successfully!");

        const responseData = await response.json();
        console.log("responseData", responseData);

        router.push("/vendor");
      } else {
        console.error("Updation failed");
      }
    } catch (error) {
      console.error("Error during updation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRadioChange = (event) => {
    setStockStatus(parseInt(event.target.value, 10));
  };

  return (
    <>
      <h1 className="text-center font-bold text-3xl">Update Item</h1>
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Item Name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="descr"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="category"
        label="Category"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="image"
        label="Image"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <div className="flex flex-col px-2">
        <div className="items-center mx-3">
          <label>
            <input
              type="radio"
              name="stockStatus"
              value="1"
              checked={stockStatus === 1}
              onChange={handleRadioChange}
            />
            In Stock
          </label>
        </div>

        <div className="items-center mx-3">
          <label>
            <input
              type="radio"
              name="stockStatus"
              value="0"
              checked={stockStatus === 0}
              onChange={handleRadioChange}
            />
            Out of Stock
          </label>
        </div>
      </div>
      <div>
        <p>
          Selected Stock Status:{" "}
          {stockStatus === 1 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
      <Button
        label={isLoading ? "Loading" : "Update"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
}
