export const deleteItemsInObject = (object: any) => {
  for (const key in object) delete object[key]

  return object
}

export const formatNumber = (lang: string, value: number) => {
  return new Intl.NumberFormat(lang).format(value)
}
