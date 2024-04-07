import React from "react";
import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3>Shop Categories</h3>
            <Link href="/">woo</Link>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
