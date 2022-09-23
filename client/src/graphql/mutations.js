/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDID = /* GraphQL */ `
  mutation CreateDID(
    $input: CreateDIDInput!
    $condition: ModelDIDConditionInput
  ) {
    createDID(input: $input, condition: $condition) {
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
export const updateDID = /* GraphQL */ `
  mutation UpdateDID(
    $input: UpdateDIDInput!
    $condition: ModelDIDConditionInput
  ) {
    updateDID(input: $input, condition: $condition) {
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
export const deleteDID = /* GraphQL */ `
  mutation DeleteDID(
    $input: DeleteDIDInput!
    $condition: ModelDIDConditionInput
  ) {
    deleteDID(input: $input, condition: $condition) {
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
