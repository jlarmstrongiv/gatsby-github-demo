/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const repos = await graphql(`
    {
      github {
        viewer {
          repositories(
            first: 100
            privacy: PUBLIC
            orderBy: { field: PUSHED_AT, direction: DESC }
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              owner {
                login
              }
              name
              id
            }
          }
        }
      }
    }
  `)
  if (repos.errors) throw repos.errors

  repos.data.github.viewer.repositories.nodes.forEach(node => {
    createPage({
      component: path.resolve("src/templates/Repo/Repo.js"),
      path: `/projects/${node.name}`,
      context: {
        owner: node.owner.login,
        name: node.name,
        id: node.id,
      },
    })
  })
}
