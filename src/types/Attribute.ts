export interface Attribute {
  id: number;
  name: string;
  type: "integer" | "real" | "boolean";
  var_integer?: number;
  var_boolean?: boolean;
  var_real?: number;
}
export type ProductAttribute = Pick<Attribute, "id" | "name" | "type"> & {
  value: number | boolean;
};

export type Filter = Pick<Attribute, "id" | "name" | "type" | "var_boolean"> & {
  range_min?: number;
  range_max?: number;
};

export type Range = { id_att: number; minValue: number; maxValue: number };

export type CategoryAttribute = Pick<Attribute, "id" | "name" | "type">;
