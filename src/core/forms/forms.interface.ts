import type { Ref, UnwrapRef } from 'vue'

export type TFormFieldValue = number | string | File | File[] | FileList | null

export type TValidatorFn<T = any> = (v: T, msg?: string) => true | string
export type TFieldValidatorWithArgs = [TValidatorFn, string]

export type TValidators = TValidatorFn<any>[] | TFieldValidatorWithArgs[]

export interface IFormFieldConfig {
  value: TFormFieldValue
}

export enum IFormFieldState {
  Valid = 'valid',
  Invalid = 'invalid',
}

export interface IFormField<T> {
  value: Ref<UnwrapRef<T> | null>
  state: Ref<IFormFieldState>
  errors: Ref<string[]>
  validators?: TValidators
}
