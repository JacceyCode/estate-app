type Data = {
  id: number;
  title: string;
  images: string[];
  bedroom?: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
};

export type SingleData = {
  id: number;
  title: string;
  price: number;
  images: string[];
  bedRooms?: number;
  bathroom: number;
  size: number;
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  school: string;
  bus: string;
  restaurant: string;
  description: string;
};

export type ListDataProp = Data[];

export interface CardProp {
  item: Data;
}

export interface MapProp {
  items: ListDataProp | SingleData[];
}

export type UserData = {
  id: number;
  name: string;
  img: string;
};

export interface SLiderProp {
  images: string[];
}
