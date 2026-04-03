export interface PublicUser {
  login: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface BaseUserResponse {
  user: PublicUser;
}

export interface BaseUtilResponse {
  message: string;
}

export type CreateUserDto = Omit<PublicUser, 'avatarUrl'> & { password: string };

export type LoginUserDto = Omit<CreateUserDto, 'firstName' | 'lastName'>;

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: PublicUser;
}

export type LogoutResponse = BaseUtilResponse;

export interface AvatarUploadDto {
  file: FormData;
  //вроде так но это не точно
}
export type AvatarUploadResponse = BaseUserResponse;

export type WhoAmIResponse = BaseUserResponse;

export interface SearchResponse {
  items: PublicUser[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type SearchUserResponse = BaseUserResponse;
