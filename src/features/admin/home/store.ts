import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import Property from '@/features/home/models/property.model'
import { type IPropertiesParams, propertiesService } from '@/features/home/services'

interface IState {
  propertiesApiStatus: IApiRequestStatus
  propertiesApiMsg: string
  properties: Property[]
}

const state = (): IState => ({
  propertiesApiStatus: IApiRequestStatus.Default,
  propertiesApiMsg: '',
  properties: []
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
    }
  }
})
