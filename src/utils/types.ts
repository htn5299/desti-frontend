export type UserCredentialsParams = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
  refreshToken: string
}
export type accessTokenState = {
  email: string
  accessToken: string
}
