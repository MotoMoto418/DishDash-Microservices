import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import React from "react";
import NewItemForm from "./NewItemForm";

export default function Update() {

  return (
    <Container>
      <FormWrap>
        <NewItemForm />
      </FormWrap>
    </Container>
  );
}
