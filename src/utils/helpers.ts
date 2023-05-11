import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

// interface ErrorFormObject {
//   [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
// }

interface EntityError {
  status: number
  data: {
    message: string | string[]
  }
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function isUserNotFoundError(error: unknown): error is FetchBaseQueryError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 404 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
}

export function isErrorWithMessage(error: unknown): error is EntityError {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    'message' in (error.data as object)
    // typeof (error as any).data.message === 'string'
  )
}
