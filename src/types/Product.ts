export interface ProductCategory {
  id: number;
  name: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  type: string;
  var_integer?: number;
  var_boolean?: boolean;
  var_real?: number;
}

export interface Product {
  id: number;
  name: string;
  photo?: string;
  number: number[];
  category: ProductCategory;
  atts: ProductAttribute[];
}
