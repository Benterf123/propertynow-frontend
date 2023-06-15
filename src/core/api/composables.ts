import { computed, type ComputedRef, type Ref } from "vue";
import { IApiRequestStatus } from "@/core/api";

export interface IApiHandle {
  status: Ref<IApiRequestStatus>;

  isLoading: ComputedRef<boolean>;
  isSuccess: ComputedRef<boolean>;
  isError: ComputedRef<boolean>;
}

class ApiHandle implements IApiHandle {
  status: Ref<IApiRequestStatus>;

  constructor(apiStatus: Ref<IApiRequestStatus>) {
    this.status = apiStatus;
  }

  isLoading = computed<boolean>(
    () => this.status.value === IApiRequestStatus.Loading
  );
  isSuccess = computed<boolean>(
    () => this.status.value === IApiRequestStatus.Success
  );
  isError = computed<boolean>(
    () => this.status.value === IApiRequestStatus.Error
  );
}

export function useApiHandle(apiStatus: Ref<IApiRequestStatus>) {
  return new ApiHandle(apiStatus);
}
