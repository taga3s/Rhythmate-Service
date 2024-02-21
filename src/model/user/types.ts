export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

// export interface UserModel { }