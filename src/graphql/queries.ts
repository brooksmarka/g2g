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
export const getCoordinate = /* GraphQL */ `query GetCoordinate($id: ID!) {
  getCoordinate(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCoordinateQueryVariables,
  APITypes.GetCoordinateQuery
>;
export const listCoordinates = /* GraphQL */ `query ListCoordinates(
  $filter: ModelCoordinateFilterInput
  $limit: Int
  $nextToken: String
) {
  listCoordinates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      trailID
      latitude
      longitude
      createdAt
      updatedAt
      trailCoordinatesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoordinatesQueryVariables,
  APITypes.ListCoordinatesQuery
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
export const coordinatesByTrailIDAndLatitudeAndLongitude = /* GraphQL */ `query CoordinatesByTrailIDAndLatitudeAndLongitude(
  $trailID: ID!
  $latitudeLongitude: ModelCoordinateListCoordinatesCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCoordinateFilterInput
  $limit: Int
  $nextToken: String
) {
  coordinatesByTrailIDAndLatitudeAndLongitude(
    trailID: $trailID
    latitudeLongitude: $latitudeLongitude
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      trailID
      latitude
      longitude
      createdAt
      updatedAt
      trailCoordinatesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CoordinatesByTrailIDAndLatitudeAndLongitudeQueryVariables,
  APITypes.CoordinatesByTrailIDAndLatitudeAndLongitudeQuery
>;
