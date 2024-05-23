/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getZone = /* GraphQL */ `query GetZone($id: ID!) {
  getZone(id: $id) {
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
` as GeneratedQuery<APITypes.GetZoneQueryVariables, APITypes.GetZoneQuery>;
export const listZones = /* GraphQL */ `query ListZones(
  $filter: ModelZoneFilterInput
  $limit: Int
  $nextToken: String
) {
  listZones(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      imageKey
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListZonesQueryVariables, APITypes.ListZonesQuery>;
export const getTrail = /* GraphQL */ `query GetTrail($id: ID!) {
  getTrail(id: $id) {
    id
    zoneID
    title
    coordinates
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
` as GeneratedQuery<APITypes.GetTrailQueryVariables, APITypes.GetTrailQuery>;
export const listTrails = /* GraphQL */ `query ListTrails(
  $filter: ModelTrailFilterInput
  $limit: Int
  $nextToken: String
) {
  listTrails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      zoneID
      title
      coordinates
      status
      createdAt
      updatedAt
      zoneTrailsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTrailsQueryVariables,
  APITypes.ListTrailsQuery
>;
export const trailsByZoneIDAndTitle = /* GraphQL */ `query TrailsByZoneIDAndTitle(
  $zoneID: ID!
  $title: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelTrailFilterInput
  $limit: Int
  $nextToken: String
) {
  trailsByZoneIDAndTitle(
    zoneID: $zoneID
    title: $title
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      zoneID
      title
      coordinates
      status
      createdAt
      updatedAt
      zoneTrailsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TrailsByZoneIDAndTitleQueryVariables,
  APITypes.TrailsByZoneIDAndTitleQuery
>;
