import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'

import Property from './models/property.model'
import type { IPropertiesParams } from './services/interface'
import { propertiesService } from './services/properties.service'

interface IState {
  propertiesApiStatus: IApiRequestStatus
  propertiesApiMsg: string
  properties: Property[]

  propertyApiStatus: IApiRequestStatus
  propertyApiMsg: string
  property: Property | null
}

const state = (): IState => ({
  propertiesApiStatus: IApiRequestStatus.Default,
  propertiesApiMsg: '',
  properties: [],

  propertyApiStatus: IApiRequestStatus.Default,
  propertyApiMsg: '',
  property: null,
})

export const usePropertiesStore = defineStore('propertiesStore', {
  state,
  actions: {
    async retrieveAll(params: IPropertiesParams) {
      try {
        this.propertiesApiStatus = IApiRequestStatus.Loading
        this.propertiesApiMsg = ''

        const response = await propertiesService.retrieveAll(params)
        this.properties = response.data.map((p) => Property.fromJson(p))

        this.propertiesApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.propertiesApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.propertiesApiMsg = message
      }
    },

    async retrieveOne(id: string) {
      try {
				const property = this.properties?.find((p) => p.id === id)
				if (property) {
					this.property = property;
					return;
				}

        this.propertyApiStatus = IApiRequestStatus.Loading
        this.propertyApiMsg = ''

        const response = await propertiesService.retrieveOne(id)
        this.property = Property.fromJson(response.data)

        this.propertyApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.propertyApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.propertyApiMsg = message
      }
    },
  },
})
