import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import { sentence } from "case"

export const query = graphql`
  query($owner: String!, $name: String!) {
    github {
      repository(owner: $owner, name: $name) {
        owner {
          login
        }
        id
        pushedAt
        name
        url
        description
        homepageUrl
        openGraphImageUrl
        object(expression: "master:README.md") {
          ... on GitHub_Blob {
            text
          }
        }
      }
    }
  }
`

export default function RepoTemplate({ data }) {
  return (
    <React.Fragment>
      <h1>{sentence(data.github.repository.name)}</h1>
      <div>
        <time dateTime={data.github.repository.pushedAt}>
          {new Date(data.github.repository.pushedAt).toLocaleDateString(
            "en-US"
          )}
        </time>
      </div>
      <a
        href={data.github.repository.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Repository
      </a>
      {" · "}
      <a
        href={data.github.repository.homepageUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Published
      </a>
      <p>{data.github.repository.description}</p>
      <div>
        <em>Customize your repo social media image in settings</em>
      </div>
      <img src={data.github.repository.openGraphImageUrl} />
      <hr />
      <ReactMarkdown source={data.github.repository.object.text} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  )
}
