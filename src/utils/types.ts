export type UserCredentialsParams = {
  email: string
  password: string
}
export type UserCreateBody = {
  email: string
  password: string
  name: string
}
export type LoginResponse = {
  accessToken: string
  refreshToken: string
}
export type AuthState = {
  email: string
  accessToken: string
  refreshToken: string
}
export type Place = {
  id: number
  createdAt: Date
  description: string
  latitude: number
  longitude: number
  name: string
  status: string
  updatedAt: Date
  createdBy?: User
}
export type User = {
  email: string
  id: number | null
  name: string
}
export type Profile = {
  about: string
  avatar: string
  id: number | null
}
export type UserProfile = User & { profile: Profile }
