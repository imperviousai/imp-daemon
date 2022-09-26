/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDID = /* GraphQL */ `
  query GetDID($id: ID!) {
    getDID(id: $id) {
      id
      twitterUsername
      longFormDid
      shortFormDid
      avatarUrl
      lastUpdated
      name
      createdAt
      updatedAt
    }
  }
`;
export const listDIDS = /* GraphQL */ `
  query ListDIDS(
    $filter: ModelDIDFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDIDS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        twitterUsername
        longFormDid
        shortFormDid
        avatarUrl
        lastUpdated
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
