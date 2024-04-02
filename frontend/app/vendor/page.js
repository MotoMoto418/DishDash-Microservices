import React from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import Inventory from "./inventory/inventory";

export default function Register() {
  return (
    <Container>
      <FormWrap>
        <Inventory />
      </FormWrap>
    </Container>
  );
}
