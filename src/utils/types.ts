import { Actions, Services } from './constrains'

export type AppContextState = { isSearchPopup: boolean; messageEditId: number | null; messageEdit: string }

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
  address: string
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
  id: number
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
export type UserPlaceIndex = {
  userId: number
  placeId: number
}
export type PlaceImage = {
  id: number
  placeId: number
  key: string
}
export type Coordinates = { longitude: number; latitude: number }
export type LocationState = {
  name: string
  description: string
  address: string
  latitude: number
  longitude: number
}
export type PlaceWithImage = Place & { images: PlaceImage[] }

export enum StatusCode {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export type RequestFriendRes = {
  id: number
  status: StatusCode
  requester: User
  receiver: User
  createdAt: Date
  updatedAt: Date
}
export type NotificationResponse = {
  id: number
  actor: User
  entity: number
  action: Actions
  content?: string
  service: Services
  createdAt: Date
  updatedAt: Date
}
export type NotificationRecipientResponse = {
  id: number
  readAt: null | Date
  createdAt: Date
  updatedAt: Date
  notification: NotificationResponse
}
export type NotificationState = {
  notifications: NotificationRecipientResponse[]
}
export type CreateLikeDto = {
  reviewId: number
  isLiked: boolean
}
export type LikeQuery = {
  review: number
  user: number
}
export type LikeType = {
  id: number
  createdAt: number
  review: Review
  user: User
  isLiked: boolean
}

export type CreateComment = {
  reviewId: number
  comment: string
}

export type CreateCommentResponse = {
  id: number
  review: ReviewByUserAndPlace
  user: UserProfile
  comment: string
  createdAt: Date
}
export type DeleteCommentResponse = {
  id: number
  review: Review
  user: User
  comment: string
  createdAt: Date
}
export type CommentResponse = {
  id: number
  review: Review
  user: UserProfile
  comment: string
  createdAt: Date
}
export type CreateConversationDto = { email: string; message: string }

export type CreateConversationResponse = {
  id: number
  creator: User
  recipient: User
  lastMessageSentAt: Date
  createdAt: Date
}
export type ConversationsResponse = {
  id: number
  creator: UserProfile
  recipient: UserProfile
  lastMessageSentAt: Date
  createdAt: Date
  lastMessageSent: Omit<Message, 'author'> | null
}

export type CreateMessageDto = { conversationId: number; content: string }

export type Message = {
  id: number
  content: string
  createdAt: Date
  author: UserProfile
}
export type MessagesByConversationId = {
  id: number
  messages: Message[]
}
export type EditMessageDto = CreateMessageDto & { messageId: number }

export type OnMessagePayload = {
  message: Message & { conversation: ConversationsResponse }
  conversation: ConversationsResponse
}

export type UpdateMessageResponse = Message & { conversation: ConversationsResponse }
export type DeleteMessagePayload = {
  conversationId: number
  messageId: number
  userId: number
}
