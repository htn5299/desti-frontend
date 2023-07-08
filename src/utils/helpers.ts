import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Actions, Services } from './constrains'

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
export function formatNotification(action: Actions, service: Services): string {
  let result = ''
  switch (service) {
    case Services.FRIENDS:
      if (action === Actions.POST) {
        result = 'da gui yeu cau ket ban.'
      }
      break
    case Services.AUTH:
      break
    case Services.USERS:
      break
    case Services.REFRESH_TOKEN:
      break
    case Services.REVIEWS:
      if (action === Actions.POST) {
        result = 'da review 1 dia diem.'
      }
      break
    case Services.PLACES:
      break
    case Services.IMAGE_STORAGE:
      break
    case Services.PROFILE:
      break
    case Services.FAVOURITES:
      break
    case Services.GATEWAY_SESSION_MANAGER:
      break
    case Services.COMMENTS:
      break
    case Services.NEWSFEED:
      break
    case Services.PLACE_IMAGES:
      break
    case Services.NOTIFICATION:
      break
  }
  return result
}
