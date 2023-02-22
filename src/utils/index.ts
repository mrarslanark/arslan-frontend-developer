export function makeUnique(arr: any[], property: string): Array<any> {
  return Array.from(new Set(arr.map((item: any) => item[property])).values());
}
