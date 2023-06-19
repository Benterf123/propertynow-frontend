import { IApiRequestStatus } from '@/core/api'

import { propertiesService } from '@/features/common/service'
import { LocationModel } from '@/features/common/models'
import { defineStore } from 'pinia'
import { getErrorMessage } from '@/core/api/utils'

interface IState {
  locationsApiStatus: IApiRequestStatus
  locationsApiMsg: string
  locations: LocationModel[] | null
}

const state = (): IState => ({
  locationsApiStatus: IApiRequestStatus.Default,
  locationsApiMsg: '',
  locations: null,
})

export const useAdminLocationsStore = defineStore('admin-locations', {
  state,
  actions: {
    async getLocations() {
      try {
        this.locationsApiStatus = IApiRequestStatus.Loading
        this.locationsApiMsg = ''

        const response = await propertiesService.getLocations()
        const data = response.data
        this.locations = data.map((e) => LocationModel.fromJson(e))

        this.locationsApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.locationsApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.locationsApiMsg = message
      }
    },
  },
})
