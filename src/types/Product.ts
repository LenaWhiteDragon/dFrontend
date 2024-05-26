import { Attribute } from "./Attribute";

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  photo?: string;
  number: number[];
  category: ProductCategory;
  atts: Attribute[];
}

export type ProductSearch = Omit<Product, "number">;
