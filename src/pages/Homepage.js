import React from "react";
import { Layout } from "../components/hoc/Layout";
import Container from "react-bootstrap/esm/Container";
import Products from "./Products";

const Homepage = () => {
  return (
    <Layout>
      <Container className="custom-mt-7">
        <Products />
      </Container>
    </Layout>
  );
};

export default Homepage;
