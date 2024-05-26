export interface Attribute {
  id: number;
  name: string;
  type: "integer" | "real" | "boolean";
  var_integer?: number;
  var_boolean?: boolean;
  var_real?: number;
}

export type CategoryAttribute = Pick<Attribute, "id" | "name" | "type">;
