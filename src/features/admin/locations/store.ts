import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import { propertiesService } from '@/features/common/service'
import { LocationModel } from '@/features/common/models'

import { adminLocationService, type ILocationAddPayload } from './service'

interface IState {
  locationsApiStatus: IApiRequestStatus
  locationsApiMsg: string
  locations: LocationModel[] | null

  locationAddApiStatus: IApiRequestStatus
  locationAddApiMsg: string
}

const state = (): IState => ({
  locationsApiStatus: IApiRequestStatus.Default,
  locationsApiMsg: '',
  locations: null,

  locationAddApiStatus: IApiRequestStatus.Default,
  locationAddApiMsg: '',
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

    async addLocation(payload: ILocationAddPayload) {
      try {
        ;(this.locationAddApiStatus = IApiRequestStatus.Loading), (this.locationAddApiMsg = '')

        await adminLocationService.addLocation(payload)

        this.locationAddApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.locationAddApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.locationAddApiMsg = message
      }
    },
  },
})
