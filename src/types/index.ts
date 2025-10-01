export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCK = "BLOCK",
}
export interface IAuthor {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  picture: string;
  status: Status;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IBlog {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  tags: string[];
  authorId: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author: IAuthor;
}
