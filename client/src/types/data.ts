export type Data = {
  id: string;
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: string;
  longitude: string;
};

type User = {
  avatar: string;
  username: string;
};

type PostDetail = {
  bus: number;
  desc: string;
  id: string;
  income: string;
  pet: string;
  postId: string;
  restaurant: number;
  school: number;
  size: number;
  utilities: string;
};

export type SingleData = {
  address: string;
  bathroom: number;
  bedroom: number;
  city: string;
  id: string;
  images: string[];
  latitude: string;
  longitude: string;
  postDetail: PostDetail;
  price: number;
  property: string;
  title: string;
  type: string;
  user: User;
  userId: string;
  isSaved: boolean;
};

export type ListDataProp = {
  postResponse: {
    data: Data[];
  };
};

export type UserPostProp = {
  id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: string;
  property: string;
  createdAT: Date;
  userId: string;
};

export type ReceiverProp = {
  id: string;
  username: string;
  avatar: string | null;
};

export type ChatProp = {
  id: string;
  userIDs: string[];
  createdAT: Date;
  seenBy: string[];
  lastMessage: string;
  receiver: ReceiverProp;
  sender: ReceiverProp;
};

type Message = {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAT: Date;
};

export type ChatMessage = {
  id: string;
  userIDs: string[];
  createdAT: Date;
  seenBy: string[];
  lastMessage: string;
  messages: Message[];
  receiver: ReceiverProp;
  sender: ReceiverProp;
};

export type ProfileDataProp = {
  postResponse: {
    data: {
      userPosts: UserPostProp[];
      savedPosts: UserPostProp[];
    };
  };
  chatResponse: {
    data: ChatProp[];
  };
};

export interface CardProp {
  item: Data;
}

export interface MapProp {
  items: SingleData[];
}

export type UserData = {
  id: number;
  name: string;
  img: string;
};

export interface SLiderProp {
  images: string[];
}
