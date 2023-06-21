import { ref, computed, watch, type UnwrapRef } from 'vue'
import {
  IFormFieldState,
  type IFormField,
  type TValidatorFn,
  type TValidators,
} from './forms.interface'

export class FormField<T = any> implements IFormField<T> {
  private _initialValue: T | null
  public value: IFormField<T>['value']
  public validators?: TValidators

  public state = ref(IFormFieldState.Valid)

  errors: IFormField<T>['errors']

  constructor(value: T | null, validators?: TValidators) {
    this._initialValue = value
    this.value = ref(value)
    this.validators = validators

    this.errors = ref([])
  }

  validate(): boolean {
    this._resetErrors()
    if (!this.validators) return this.isValid.value

    for (const validator of this.validators) {
      let fn: TValidatorFn
      let msg = ''
      if (validator instanceof Array) {
        fn = validator[0] as TValidatorFn
        msg = validator[1]
      } else {
        fn = validator
      }

      const ret = fn(this.value.value, msg)
      if (ret === true) {
        this.state.value = IFormFieldState.Valid
      } else {
        this.state.value = IFormFieldState.Invalid
        this.errors.value.push(ret)
      }
    }

    return this.isValid.value
  }

  reset(): void {
    this.value = ref(this._initialValue)
    this.errors.value = []
  }

  onInputChange(callback: (value: UnwrapRef<T | null>) => void): FormField {
		watch(this.value, (v) => callback(v))
    return this
  }

  private _resetErrors() {
    this.errors.value = []
    this.state.value = IFormFieldState.Valid
  }

  isValid = computed<boolean>(() => this.state.value === IFormFieldState.Valid)
}

interface IFormFields {
  [fieldName: string]: FormField
}
interface IFormOptions {
  sameValueFields?: string[] | [string[], string]
  validator?: () => boolean
}
export class Form {
  // eslint-disable-next-line no-useless-constructor
  constructor(private _fields: IFormFields, private _opts?: IFormOptions) {}

  validate(): boolean {
    const fields = this._fields
    let formValid = true

    for (const field of Object.values(fields)) {
      if (!field.validate()) formValid = false
    }

    const optsValid = this._validateFormFormOpts()
    if (!formValid) return false
    return optsValid
  }

  getField<T>(name: string): FormField<T> | null {
    return (this._fields[name] as FormField<T> | undefined) ?? null
  }

  setField<T>(name: string, value: T) {
    const field = this.getField(name)
    if (!field) return

    field.value.value = value
    if (field.validate()) {
      this._validateFormFormOpts()
    }
  }

  reset(): void {
    Object.values(this._fields).forEach((field) => field.reset())
  }

  private _validateFormFormOpts(): boolean {
    if (!this._opts) return true

    if (this._opts.sameValueFields && this._opts.sameValueFields.length >= 2) {
      const fs = this._opts.sameValueFields
      let fields: string[] = []
      let msg = 'The fields do not match'
      if (fs[0] instanceof Array) {
        fields = fs[0] as string[]
        msg = fs[1]
      } else {
        fields = fs as string[]
      }

      let value: any = null
      for (const [index, name] of Object.entries(fields)) {
        const field = this.getField(name)
        if (!field || !field.value) continue
        if (+index === 0) {
          value = field.value.value
          continue
        }

        field.errors.value = []
        const isValid = field.value.value === value
        if (!isValid && +index === this._opts.sameValueFields.length - 1) {
          field.state.value = IFormFieldState.Invalid
          field.errors.value.push(msg)
          return false
        }

        value = field.value.value
      }
    }
    if (this._opts.validator) {
      return this._opts.validator()
    }

    return true
  }
}
