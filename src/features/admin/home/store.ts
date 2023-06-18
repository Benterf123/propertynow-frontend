import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import Property from '@/features/home/models/property.model'
import { type IPropertiesParams, propertiesService } from '@/features/home/services'

interface IState {
  propertiesApiStatus: IApiRequestStatus
  propertiesApiMsg: string
  properties: Property[] | null

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

export const useAdminPropertiesStore = defineStore('propertiesStore', {
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
				if (Object.keys(response.data).length === 0) {
					this.propertyApiStatus = IApiRequestStatus.Error
					this.propertyApiMsg = 'This product was not found'
					return;
				}
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
