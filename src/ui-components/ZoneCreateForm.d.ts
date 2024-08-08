/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react'
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react'
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>
} | null
export declare type VariantValues = {
  [key: string]: string
}
export declare type Variant = {
  variantValues: VariantValues
  overrides: EscapeHatchProps
}
export declare type ValidationResponse = {
  hasError: boolean
  errorMessage?: string
}
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>
export declare type ZoneCreateFormInputValues = {
  title?: string
  description?: string
  imageKey?: string
}
export declare type ZoneCreateFormValidationValues = {
  title?: ValidationFunction<string>
  description?: ValidationFunction<string>
  imageKey?: ValidationFunction<string>
}
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>
export declare type ZoneCreateFormOverridesProps = {
  ZoneCreateFormGrid?: PrimitiveOverrideProps<GridProps>
  title?: PrimitiveOverrideProps<TextFieldProps>
  description?: PrimitiveOverrideProps<TextFieldProps>
  imageKey?: PrimitiveOverrideProps<TextFieldProps>
} & EscapeHatchProps
export declare type ZoneCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ZoneCreateFormOverridesProps | undefined | null
  } & {
    clearOnSuccess?: boolean
    onSubmit?: (fields: ZoneCreateFormInputValues) => ZoneCreateFormInputValues
    onSuccess?: (fields: ZoneCreateFormInputValues) => void
    onError?: (fields: ZoneCreateFormInputValues, errorMessage: string) => void
    onChange?: (fields: ZoneCreateFormInputValues) => ZoneCreateFormInputValues
    onValidate?: ZoneCreateFormValidationValues
  } & React.CSSProperties
>
export default function ZoneCreateForm(
  props: ZoneCreateFormProps,
): React.ReactElement
