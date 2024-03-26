/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createZone = /* GraphQL */ `mutation CreateZone(
  $input: CreateZoneInput!
  $condition: ModelZoneConditionInput
) {
  createZone(input: $input, condition: $condition) {
    id
    title
    description
    imageKey
    trails {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateZoneMutationVariables,
  APITypes.CreateZoneMutation
>;
export const updateZone = /* GraphQL */ `mutation UpdateZone(
  $input: UpdateZoneInput!
  $condition: ModelZoneConditionInput
) {
  updateZone(input: $input, condition: $condition) {
    id
    title
    description
    imageKey
    trails {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateZoneMutationVariables,
  APITypes.UpdateZoneMutation
>;
export const deleteZone = /* GraphQL */ `mutation DeleteZone(
  $input: DeleteZoneInput!
  $condition: ModelZoneConditionInput
) {
  deleteZone(input: $input, condition: $condition) {
    id
    title
    description
    imageKey
    trails {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteZoneMutationVariables,
  APITypes.DeleteZoneMutation
>;
export const createTrail = /* GraphQL */ `mutation CreateTrail(
  $input: CreateTrailInput!
  $condition: ModelTrailConditionInput
) {
  createTrail(input: $input, condition: $condition) {
    id
    zoneID
    title
    coordinates {
      nextToken
      __typename
    }
    zone {
      id
      title
      description
      imageKey
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    updatedAt
    zoneTrailsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTrailMutationVariables,
  APITypes.CreateTrailMutation
>;
export const updateTrail = /* GraphQL */ `mutation UpdateTrail(
  $input: UpdateTrailInput!
  $condition: ModelTrailConditionInput
) {
  updateTrail(input: $input, condition: $condition) {
    id
    zoneID
    title
    coordinates {
      nextToken
      __typename
    }
    zone {
      id
      title
      description
      imageKey
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    updatedAt
    zoneTrailsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTrailMutationVariables,
  APITypes.UpdateTrailMutation
>;
export const deleteTrail = /* GraphQL */ `mutation DeleteTrail(
  $input: DeleteTrailInput!
  $condition: ModelTrailConditionInput
) {
  deleteTrail(input: $input, condition: $condition) {
    id
    zoneID
    title
    coordinates {
      nextToken
      __typename
    }
    zone {
      id
      title
      description
      imageKey
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    updatedAt
    zoneTrailsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTrailMutationVariables,
  APITypes.DeleteTrailMutation
>;
export const createCoordinate = /* GraphQL */ `mutation CreateCoordinate(
  $input: CreateCoordinateInput!
  $condition: ModelCoordinateConditionInput
) {
  createCoordinate(input: $input, condition: $condition) {
    id
    trailID
    latitude
    longitude
    trail {
      id
      zoneID
      title
      status
      createdAt
      updatedAt
      zoneTrailsId
      __typename
    }
    createdAt
    updatedAt
    trailCoordinatesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCoordinateMutationVariables,
  APITypes.CreateCoordinateMutation
>;
export const updateCoordinate = /* GraphQL */ `mutation UpdateCoordinate(
  $input: UpdateCoordinateInput!
  $condition: ModelCoordinateConditionInput
) {
  updateCoordinate(input: $input, condition: $condition) {
    id
    trailID
    latitude
    longitude
    trail {
      id
      zoneID
      title
      status
      createdAt
      updatedAt
      zoneTrailsId
      __typename
    }
    createdAt
    updatedAt
    trailCoordinatesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCoordinateMutationVariables,
  APITypes.UpdateCoordinateMutation
>;
export const deleteCoordinate = /* GraphQL */ `mutation DeleteCoordinate(
  $input: DeleteCoordinateInput!
  $condition: ModelCoordinateConditionInput
) {
  deleteCoordinate(input: $input, condition: $condition) {
    id
    trailID
    latitude
    longitude
    trail {
      id
      zoneID
      title
      status
      createdAt
      updatedAt
      zoneTrailsId
      __typename
    }
    createdAt
    updatedAt
    trailCoordinatesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCoordinateMutationVariables,
  APITypes.DeleteCoordinateMutation
>;
