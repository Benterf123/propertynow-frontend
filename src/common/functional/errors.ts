import type { IApiResponse } from '@/core/api';
import type { AxiosError } from 'axios';

export function getErrorMessage(
  err: any,
  message = 'An error occured. Please try again later.'
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errCode = (err as AxiosError).code;
  if (errCode && ['ERR_NETWORK', 'ECONNABORTED'].includes(errCode))
    message =
      'Could not connect to our the servers. Make sure you have an internet connection and try again.';

  const resp: IApiResponse = (err as any).response;
  if (resp) {
    message = resp.data.message;
  }

  return message;
}
