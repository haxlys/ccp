import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import coinapi from "~/apis/coinapi"
import Layout from "~/components/layout"
import SEO from "~/components/seo"

interface Site {
  buildTime: string
}

interface DataProps {
  site: Site
}

const UsingTypescript: React.FC<PageProps> = ({ data, path }) => {
  const [images, setImages] = React.useState([])
  React.useEffect(() => {
    coinapi("/v1/assets/icons/200", { callback: setImages })
  }, [])

  return (
    <Layout>
      <SEO title="Using coinapi" />
      <img src={images[0]?.url} alt="icon" width="200" />
    </Layout>
  )
}

export default UsingTypescript
