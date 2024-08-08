/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateZoneInput = {
	id?: string | null
	title: string
	description?: string | null
	imageKey?: string | null
}

export type ModelZoneConditionInput = {
	title?: ModelStringInput | null
	description?: ModelStringInput | null
	imageKey?: ModelStringInput | null
	and?: Array<ModelZoneConditionInput | null> | null
	or?: Array<ModelZoneConditionInput | null> | null
	not?: ModelZoneConditionInput | null
	createdAt?: ModelStringInput | null
	updatedAt?: ModelStringInput | null
}

export type ModelStringInput = {
	ne?: string | null
	eq?: string | null
	le?: string | null
	lt?: string | null
	ge?: string | null
	gt?: string | null
	contains?: string | null
	notContains?: string | null
	between?: Array<string | null> | null
	beginsWith?: string | null
	attributeExists?: boolean | null
	attributeType?: ModelAttributeTypes | null
	size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
	binary = 'binary',
	binarySet = 'binarySet',
	bool = 'bool',
	list = 'list',
	map = 'map',
	number = 'number',
	numberSet = 'numberSet',
	string = 'string',
	stringSet = 'stringSet',
	_null = '_null',
}

export type ModelSizeInput = {
	ne?: number | null
	eq?: number | null
	le?: number | null
	lt?: number | null
	ge?: number | null
	gt?: number | null
	between?: Array<number | null> | null
}

export type Zone = {
	__typename: 'Zone'
	id: string
	title: string
	description?: string | null
	imageKey?: string | null
	trails?: ModelTrailConnection | null
	createdAt: string
	updatedAt: string
}

export type ModelTrailConnection = {
	__typename: 'ModelTrailConnection'
	items: Array<Trail | null>
	nextToken?: string | null
}

export type Trail = {
	__typename: 'Trail'
	id: string
	zoneID: string
	title: string
	coordinates?: Array<Array<number | null> | null> | null
	zone?: Zone | null
	status: string
	createdAt: string
	updatedAt: string
	zoneTrailsId?: string | null
}

export type UpdateZoneInput = {
	id: string
	title?: string | null
	description?: string | null
	imageKey?: string | null
}

export type DeleteZoneInput = {
	id: string
}

export type CreateTrailInput = {
	id?: string | null
	zoneID: string
	title: string
	coordinates?: Array<Array<number | null> | null> | null
	status: string
	zoneTrailsId?: string | null
}

export type ModelTrailConditionInput = {
	zoneID?: ModelIDInput | null
	title?: ModelStringInput | null
	coordinates?: ModelFloatInput | null
	status?: ModelStringInput | null
	and?: Array<ModelTrailConditionInput | null> | null
	or?: Array<ModelTrailConditionInput | null> | null
	not?: ModelTrailConditionInput | null
	createdAt?: ModelStringInput | null
	updatedAt?: ModelStringInput | null
	zoneTrailsId?: ModelIDInput | null
}

export type ModelIDInput = {
	ne?: string | null
	eq?: string | null
	le?: string | null
	lt?: string | null
	ge?: string | null
	gt?: string | null
	contains?: string | null
	notContains?: string | null
	between?: Array<string | null> | null
	beginsWith?: string | null
	attributeExists?: boolean | null
	attributeType?: ModelAttributeTypes | null
	size?: ModelSizeInput | null
}

export type ModelFloatInput = {
	ne?: number | null
	eq?: number | null
	le?: number | null
	lt?: number | null
	ge?: number | null
	gt?: number | null
	between?: Array<number | null> | null
	attributeExists?: boolean | null
	attributeType?: ModelAttributeTypes | null
}

export type UpdateTrailInput = {
	id: string
	zoneID?: string | null
	title?: string | null
	coordinates?: Array<Array<number | null> | null> | null
	status?: string | null
	zoneTrailsId?: string | null
}

export type DeleteTrailInput = {
	id: string
}

export type ModelZoneFilterInput = {
	id?: ModelIDInput | null
	title?: ModelStringInput | null
	description?: ModelStringInput | null
	imageKey?: ModelStringInput | null
	createdAt?: ModelStringInput | null
	updatedAt?: ModelStringInput | null
	and?: Array<ModelZoneFilterInput | null> | null
	or?: Array<ModelZoneFilterInput | null> | null
	not?: ModelZoneFilterInput | null
}

export enum ModelSortDirection {
	ASC = 'ASC',
	DESC = 'DESC',
}

export type ModelZoneConnection = {
	__typename: 'ModelZoneConnection'
	items: Array<Zone | null>
	nextToken?: string | null
}

export type ModelTrailFilterInput = {
	id?: ModelIDInput | null
	zoneID?: ModelIDInput | null
	title?: ModelStringInput | null
	coordinates?: ModelFloatInput | null
	status?: ModelStringInput | null
	createdAt?: ModelStringInput | null
	updatedAt?: ModelStringInput | null
	and?: Array<ModelTrailFilterInput | null> | null
	or?: Array<ModelTrailFilterInput | null> | null
	not?: ModelTrailFilterInput | null
	zoneTrailsId?: ModelIDInput | null
}

export type ModelStringKeyConditionInput = {
	eq?: string | null
	le?: string | null
	lt?: string | null
	ge?: string | null
	gt?: string | null
	between?: Array<string | null> | null
	beginsWith?: string | null
}

export type ModelSubscriptionZoneFilterInput = {
	id?: ModelSubscriptionIDInput | null
	title?: ModelSubscriptionStringInput | null
	description?: ModelSubscriptionStringInput | null
	imageKey?: ModelSubscriptionStringInput | null
	createdAt?: ModelSubscriptionStringInput | null
	updatedAt?: ModelSubscriptionStringInput | null
	and?: Array<ModelSubscriptionZoneFilterInput | null> | null
	or?: Array<ModelSubscriptionZoneFilterInput | null> | null
	zoneTrailsId?: ModelSubscriptionIDInput | null
}

export type ModelSubscriptionIDInput = {
	ne?: string | null
	eq?: string | null
	le?: string | null
	lt?: string | null
	ge?: string | null
	gt?: string | null
	contains?: string | null
	notContains?: string | null
	between?: Array<string | null> | null
	beginsWith?: string | null
	in?: Array<string | null> | null
	notIn?: Array<string | null> | null
}

export type ModelSubscriptionStringInput = {
	ne?: string | null
	eq?: string | null
	le?: string | null
	lt?: string | null
	ge?: string | null
	gt?: string | null
	contains?: string | null
	notContains?: string | null
	between?: Array<string | null> | null
	beginsWith?: string | null
	in?: Array<string | null> | null
	notIn?: Array<string | null> | null
}

export type ModelSubscriptionTrailFilterInput = {
	id?: ModelSubscriptionIDInput | null
	zoneID?: ModelSubscriptionIDInput | null
	title?: ModelSubscriptionStringInput | null
	coordinates?: ModelSubscriptionFloatInput | null
	status?: ModelSubscriptionStringInput | null
	createdAt?: ModelSubscriptionStringInput | null
	updatedAt?: ModelSubscriptionStringInput | null
	and?: Array<ModelSubscriptionTrailFilterInput | null> | null
	or?: Array<ModelSubscriptionTrailFilterInput | null> | null
}

export type ModelSubscriptionFloatInput = {
	ne?: number | null
	eq?: number | null
	le?: number | null
	lt?: number | null
	ge?: number | null
	gt?: number | null
	between?: Array<number | null> | null
	in?: Array<number | null> | null
	notIn?: Array<number | null> | null
}

export type CreateZoneMutationVariables = {
	input: CreateZoneInput
	condition?: ModelZoneConditionInput | null
}

export type CreateZoneMutation = {
	createZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type UpdateZoneMutationVariables = {
	input: UpdateZoneInput
	condition?: ModelZoneConditionInput | null
}

export type UpdateZoneMutation = {
	updateZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type DeleteZoneMutationVariables = {
	input: DeleteZoneInput
	condition?: ModelZoneConditionInput | null
}

export type DeleteZoneMutation = {
	deleteZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type CreateTrailMutationVariables = {
	input: CreateTrailInput
	condition?: ModelTrailConditionInput | null
}

export type CreateTrailMutation = {
	createTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}

export type UpdateTrailMutationVariables = {
	input: UpdateTrailInput
	condition?: ModelTrailConditionInput | null
}

export type UpdateTrailMutation = {
	updateTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}

export type DeleteTrailMutationVariables = {
	input: DeleteTrailInput
	condition?: ModelTrailConditionInput | null
}

export type DeleteTrailMutation = {
	deleteTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}

export type GetZoneQueryVariables = {
	id: string
}

export type GetZoneQuery = {
	getZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type ListZonesQueryVariables = {
	id?: string | null
	filter?: ModelZoneFilterInput | null
	limit?: number | null
	nextToken?: string | null
	sortDirection?: ModelSortDirection | null
}

export type ListZonesQuery = {
	listZones?: {
		__typename: 'ModelZoneConnection'
		items: Array<{
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null>
		nextToken?: string | null
	} | null
}

export type GetTrailQueryVariables = {
	id: string
}

export type GetTrailQuery = {
	getTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}

export type ListTrailsQueryVariables = {
	id?: string | null
	filter?: ModelTrailFilterInput | null
	limit?: number | null
	nextToken?: string | null
	sortDirection?: ModelSortDirection | null
}

export type ListTrailsQuery = {
	listTrails?: {
		__typename: 'ModelTrailConnection'
		items: Array<{
			__typename: 'Trail'
			id: string
			zoneID: string
			title: string
			coordinates?: Array<Array<number | null> | null> | null
			status: string
			createdAt: string
			updatedAt: string
			zoneTrailsId?: string | null
		} | null>
		nextToken?: string | null
	} | null
}

export type TrailsByZoneIDAndTitleQueryVariables = {
	zoneID: string
	title?: ModelStringKeyConditionInput | null
	sortDirection?: ModelSortDirection | null
	filter?: ModelTrailFilterInput | null
	limit?: number | null
	nextToken?: string | null
}

export type TrailsByZoneIDAndTitleQuery = {
	trailsByZoneIDAndTitle?: {
		__typename: 'ModelTrailConnection'
		items: Array<{
			__typename: 'Trail'
			id: string
			zoneID: string
			title: string
			coordinates?: Array<Array<number | null> | null> | null
			status: string
			createdAt: string
			updatedAt: string
			zoneTrailsId?: string | null
		} | null>
		nextToken?: string | null
	} | null
}

export type OnCreateZoneSubscriptionVariables = {
	filter?: ModelSubscriptionZoneFilterInput | null
}

export type OnCreateZoneSubscription = {
	onCreateZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type OnUpdateZoneSubscriptionVariables = {
	filter?: ModelSubscriptionZoneFilterInput | null
}

export type OnUpdateZoneSubscription = {
	onUpdateZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type OnDeleteZoneSubscriptionVariables = {
	filter?: ModelSubscriptionZoneFilterInput | null
}

export type OnDeleteZoneSubscription = {
	onDeleteZone?: {
		__typename: 'Zone'
		id: string
		title: string
		description?: string | null
		imageKey?: string | null
		trails?: {
			__typename: 'ModelTrailConnection'
			nextToken?: string | null
		} | null
		createdAt: string
		updatedAt: string
	} | null
}

export type OnCreateTrailSubscriptionVariables = {
	filter?: ModelSubscriptionTrailFilterInput | null
}

export type OnCreateTrailSubscription = {
	onCreateTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}

export type OnUpdateTrailSubscriptionVariables = {
	filter?: ModelSubscriptionTrailFilterInput | null
}

export type OnUpdateTrailSubscription = {
	onUpdateTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}

export type OnDeleteTrailSubscriptionVariables = {
	filter?: ModelSubscriptionTrailFilterInput | null
}

export type OnDeleteTrailSubscription = {
	onDeleteTrail?: {
		__typename: 'Trail'
		id: string
		zoneID: string
		title: string
		coordinates?: Array<Array<number | null> | null> | null
		zone?: {
			__typename: 'Zone'
			id: string
			title: string
			description?: string | null
			imageKey?: string | null
			createdAt: string
			updatedAt: string
		} | null
		status: string
		createdAt: string
		updatedAt: string
		zoneTrailsId?: string | null
	} | null
}
