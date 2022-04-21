/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine"
import { RiFacebookBoxFill } from "@react-icons/all-files/ri/RiFacebookBoxFill"
import { RiTwitterFill, } from "@react-icons/all-files/ri/RiTwitterFill"
import { RiYoutubeFill, } from "@react-icons/all-files/ri/RiYoutubeFill"
import { RiInstagramFill } from "@react-icons/all-files/ri/RiInstagramFill"
import { RiGithubFill } from "@react-icons/all-files/ri/RiGithubFill"
import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import Seo from "../components/seo"
import Stars from "../components/Stars"
import Icons from "../util/socialmedia.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        titleAlt
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED, 
              width: 585, 
              height: 439
            )
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  breakpoints: [250, 345, 585]
                  placeholder: DOMINANT_COLOR
                  quality: 90
                )
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""    
  const sIcons = Icons.socialIcons.map((icons, index) => {
    return (
      <div key={"social icons" + index}>
        {icons.icon === "facebook" ? (
          <Link to={icons.url} rel="noopener noreferrer" target="_blank" area-label="Facebook">
            <RiFacebookBoxFill alt='Facebook' />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "twitter" ? (
          <Link to={icons.url} rel="noopener noreferrer" target="_blank" area-label="Twitter">
            <RiTwitterFill alt='Twitter' />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "youtube" ? (
          <Link to={icons.url} rel="noopener noreferrer" target="_blank" area-label="Youtube">
            <RiYoutubeFill alt='Youtube' />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "instagram" ? (
          <Link to={icons.url} rel="noopener noreferrer" target="_blank" area-label="Instagram">
            <RiInstagramFill alt='Instagram' />
          </Link>
        ) : (
          ""
        )}        
        {icons.icon === "github" ? (
          <Link to={icons.url} rel="noopener noreferrer" target="_blank">
            <RiGithubFill alt='Github' />
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  })
  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
        image={Image}
        url={url}
      />
      <Helmet>
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta name="twitter:image:alt" content={frontmatter.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={frontmatter.title} />
        <meta property="twitter:description" content={frontmatter.description} />
      </Helmet>
      <Stars />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1>{frontmatter.titleAlt}</h1>
          <p
            className="tagline"
            sx={{
              color: "muted",
            }}
          >
            {frontmatter.tagline}
          </p>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <Link
            to={frontmatter.cta.ctaLink}
            className="button"
            sx={{
              variant: "variants.button",
            }}
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </Link>
          <div
            className="social-icons"
            sx={{
              variant: "variants.socialIcons",
            }}
          >
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="cover"
            />
             ) : (
               ""
          )}
        </div>
      </div>
      <BlogListHome data={posts} />
    </Layout>
  )
}

export default HomePage
