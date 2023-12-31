import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import { Property } from '@/features/common/models'
import { type IPropertiesParams } from '@/features/common/interface'
import { propertiesService } from '@/features/common/service'

import { type TPropertyAddPayload, propertiesService as adminPropertiesService } from './services'

interface IState {
  propertiesApiStatus: IApiRequestStatus
  propertiesApiMsg: string
  properties: Property[] | null

  propertyApiStatus: IApiRequestStatus
  propertyApiMsg: string
  property: Property | null

  propertyAddApiStatus: IApiRequestStatus
  propertyAddApiMsg: string

  propertyDeleteApiStatus: IApiRequestStatus
  propertyDeleteApiMsg: string
}

const state = (): IState => ({
  propertiesApiStatus: IApiRequestStatus.Default,
  propertiesApiMsg: '',
  properties: null,

  propertyApiStatus: IApiRequestStatus.Default,
  propertyApiMsg: '',
  property: null,

  propertyAddApiStatus: IApiRequestStatus.Default,
  propertyAddApiMsg: '',

  propertyDeleteApiStatus: IApiRequestStatus.Default,
  propertyDeleteApiMsg: '',
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
          this.property = property
          return
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

    async addProperty(payload: TPropertyAddPayload) {
      try {
        this.propertyAddApiStatus = IApiRequestStatus.Loading
        this.propertyAddApiMsg = ''

        const response = await adminPropertiesService.addProperty(payload)
        const property = Property.fromJson(response.data)
        this.properties?.unshift(property)

        this.propertyAddApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.propertyAddApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.propertyAddApiMsg = message
      }
    },

    async deleteProperty(id: string) {
      try {
        this.propertyDeleteApiStatus = IApiRequestStatus.Loading
        this.propertyDeleteApiMsg = ''

        await adminPropertiesService.deleteProperty(id)
				const idx = this.properties?.findIndex((p) => p.id === id)
				if (idx && idx > -1) 
					this.properties!.splice(idx, 1);
				
        this.propertyDeleteApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.propertyDeleteApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.propertyDeleteApiMsg = message
      }
    },
  },
})
