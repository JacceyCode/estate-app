import { ReactNode } from "react";

export type AuthContextProviderProps = {
  children: ReactNode;
};

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  createdAT: Date;
};

export type AuthContextType = {
  currentUser: AuthUser | null;
  updateUser: (data: AuthUser | null) => void;
};
