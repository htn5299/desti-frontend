import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Kiểu ErrorFormObject dành cho trường hợp bao quát
 */

interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
}

interface EntityError {
  status: number
  data: {
    message: string | ErrorFormObject | ErrorFormObject[]
  }
}

/**
 * Phương pháp "type predicate" dùng để thu hẹp kiểu của một biến
 * ✅ Đầu tiên chúng ta sẽ khai báo một function check kiểm tra cấu trúc về mặc logic javascript
 * ✅ Tiếp theo chúng ta thêm `parameterName is Type` làm kiểu return của function thay vì boolean
 * ✅ Khi dùng function kiểu tra kiểu này, ngoài việc kiểm tra về mặc logic cấu trúc, nó còn chuyển kiểu
 *
 * So sánh với phương pháp ép kiểu "Type Assertions" thì ép kiểu chúng giúp chúng ta đúng về mặc Type, chưa chắc về logic
 *
 */

/**
 * Thu hẹp một error có kiểu không xác định về `FetchBaseQueryError`
 */

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

/**
 * Thu hẹp một error có kiểu không xác định về một object với thuộc tính message: string (SerializedError)
 */

/**
 * Thu hẹp một error có kiểu không xác định về lỗi liên quan đến POST PUT không đúng field (EntityError)
 */

export function isUserNotFoundError(error: unknown): error is FetchBaseQueryError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 404 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
}
export function isErrorWithMessage(error: unknown): error is {
  status: number
  data: { message: string }
} {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    'message' in (error.data as object) &&
    typeof (error as any).data.message === 'string'
  )
}
