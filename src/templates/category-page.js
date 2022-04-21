/** @jsx jsx */
import { jsx, Container, Heading } from "theme-ui"
import PropTypes from "prop-types"
import { Helmet } from 'react-helmet'
import { MdList } from "@react-icons/all-files/md/MdList";
// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Stars from "../components/Stars"

const Category = ({ pageContext, data }) => {
  const { category } = pageContext
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } categorized with “${category}”`

  return (
    <Layout className="not-found-page">
      <Seo />
      <Helmet>
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={categoryHeader} />
        <meta property="og:description" content={category} />
        <meta property="twitter:title" content={categoryHeader} />
        <meta property="twitter:description" content={category} />
      </Helmet>
      <Stars />
      <div
         className="wrapper"
      >
        <Container p={4} bg="primary"
          sx={{
            borderRadius: "12px",
          }}
        >
          <Heading as='h2'>{categoryHeader}</Heading>
          <div>
            <ul className="tagsPage">
              {edges.map(({ node }) => {
                const { slug } = node.fields
                const { title } = node.frontmatter
                return (
                  <li key={slug}>
                    <Link to={slug}>{title}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <span className="icon -category">
              <MdList />
            </span>{" "} 
            <Link to="/categories">All Categories</Link>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Category

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            path
            description            
          }
        }
      }
    }
  }
`