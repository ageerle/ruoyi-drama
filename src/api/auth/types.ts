export interface LoginRequest {
  username: string;
  password: string;
  clientId: string;
  grantType: 'password';
  tenantId: string;
  uuid: string;
}

export interface LoginUser {
  avatar?: string;
  nickName?: string;
  username?: string;
  userId?: number;
}

export interface LoginResponse {
  access_token?: string;
  token?: string;
  userInfo?: LoginUser;
}
