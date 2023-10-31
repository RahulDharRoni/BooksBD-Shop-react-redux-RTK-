export interface IProduct {
  _id: number;
  id: number;
  name: string;
  author: string;
  language: string;
  image_link: string;
  pricing: number;
  pages: number;
  popularity: number;
  category?: string;
  status: boolean;
  quantity?: number;
}
