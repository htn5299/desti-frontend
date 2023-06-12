export type UserCredentialsParams = {
  email: string
  password: string
}
export type UserCreateBody = {
  email: string
  password: string
  name: string
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
  updatedAt?: Date
  createdBy?: User
}
export type User = {
  email: string
  id: number | null
  name: string
}
export type Profile = {
  about: string | null
  avatar: string | null
  id: number | null
}
export type Review = {
  id: number | null
  review: string
  rating: number
  updatedAt?: Date
  createdAt?: Date
}
export type UserProfile = User & { profile: Profile }
export type ReviewsByPlace = Review & { user: User }
export type AddReview = Partial<Omit<Review, 'id' | 'updatedAt' | 'createdAt'>> & { placeId: number }
export type ReviewByUserAndPlace = Review & { user: User } & { place: Place }
export type ReviewFeedResponse = Review & { user: UserProfile } & { place: Place }

export type SetFavouriteParams = {
  placeId: number
  here?: boolean
  want?: boolean
}
export type ResponseFavourite = {
  userId: number
  placeId: number
  here: boolean
  want: boolean
}
export type ReviewsState = {
  reviews: ReviewByUserAndPlace[]
}
