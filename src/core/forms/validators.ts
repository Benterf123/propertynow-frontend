import type { TValidatorFn } from './forms.interface'

export const Validators: { [name: string]: TValidatorFn<any> } = {
  required(v, msg) {
    return !!v || msg || 'This field is required'
  },
  email(v: string, msg) {
    return /^(\w+\.?)+@\w+\.\w{2,}$/.test(v) || msg || 'Email is invalid'
  },
}
