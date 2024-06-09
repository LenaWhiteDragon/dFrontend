export function removeLeadingZeros(numberStr: string) {
  return numberStr.toString().replace(/^0+/, "") || "0";
}
