import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine"
import { RiBugLine } from "@react-icons/all-files/ri/RiBugLine"
import { RiSkullLine } from "@react-icons/all-files/ri/RiSkullLine"

import Seo from "../components/seo"
import Layout from "../components/layout"

const NotFound = () => (
  <Layout className="not-found-page">
    <Seo title="Page not found" />
    <div
      className="wrapper"
      style={{
        textAlign: "center",
      }}
    >
      <header>
        <RiSkullLine
          style={{
            fontSize: "128px",
            color: "var(--primary-color)",
          }}
        />
        <h1>Oops we did not expect that to happen</h1>
        <p>
          Have you wondered into the unknown. Let us help you, Please take a look
          at below options
        </p>
      </header>
      <Link to="/" className="button">
        <RiArrowLeftSLine className="icon -left" />
        Back to Homepage
      </Link>
      <Link to="/contact" className="button -outline"
        sx={{  
          variant: "variants.button",      
        }}
      >
        Report this <RiBugLine className="icon -right" />
      </Link>
    </div>
  </Layout>
)

export default NotFound
