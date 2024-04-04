import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import React from "react";
import UpdateForm from "./UpdateForm";

export default function Update({ params }) {

  console.log("props", params)
  return (
    <Container>
      <FormWrap>
        <UpdateForm food_id={params.foodId}/>
      </FormWrap>
    </Container>
  );
}
