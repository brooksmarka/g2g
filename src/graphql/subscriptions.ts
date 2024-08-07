/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API'
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType
  __generatedSubscriptionOutput: OutputType
}

export const onCreateZone =
  /* GraphQL */ `subscription OnCreateZone($filter: ModelSubscriptionZoneFilterInput) {
  onCreateZone(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateZoneSubscriptionVariables,
    APITypes.OnCreateZoneSubscription
  >
export const onUpdateZone =
  /* GraphQL */ `subscription OnUpdateZone($filter: ModelSubscriptionZoneFilterInput) {
  onUpdateZone(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateZoneSubscriptionVariables,
    APITypes.OnUpdateZoneSubscription
  >
export const onDeleteZone =
  /* GraphQL */ `subscription OnDeleteZone($filter: ModelSubscriptionZoneFilterInput) {
  onDeleteZone(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteZoneSubscriptionVariables,
    APITypes.OnDeleteZoneSubscription
  >
export const onCreateTrail =
  /* GraphQL */ `subscription OnCreateTrail($filter: ModelSubscriptionTrailFilterInput) {
  onCreateTrail(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateTrailSubscriptionVariables,
    APITypes.OnCreateTrailSubscription
  >
export const onUpdateTrail =
  /* GraphQL */ `subscription OnUpdateTrail($filter: ModelSubscriptionTrailFilterInput) {
  onUpdateTrail(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateTrailSubscriptionVariables,
    APITypes.OnUpdateTrailSubscription
  >
export const onDeleteTrail =
  /* GraphQL */ `subscription OnDeleteTrail($filter: ModelSubscriptionTrailFilterInput) {
  onDeleteTrail(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteTrailSubscriptionVariables,
    APITypes.OnDeleteTrailSubscription
  >
