/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDID = /* GraphQL */ `
  query GetDID($shortFormDid: String!, $username: String!) {
    getDID(shortFormDid: $shortFormDid, username: $username) {
      shortFormDid
      username
      longFormDid
      avatarUrl
      lastUpdated
      name
      email
      profileType
      createdAt
      updatedAt
    }
  }
`;
export const listDIDS = /* GraphQL */ `
  query ListDIDS(
    $shortFormDid: String
    $username: ModelStringKeyConditionInput
    $filter: ModelDIDFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDIDS(
      shortFormDid: $shortFormDid
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        shortFormDid
        username
        longFormDid
        avatarUrl
        lastUpdated
        name
        email
        profileType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
