export const formatFilter = (query) => {
  if (Object.keys(query).length === 0) return {}
  const finalQuery = {}
  const queryCopy = { ...query }

  const excludedFileds = [
    'colors',
    'sizes',
    'sort',
    'price',
    'category',
    'types',
    'category_hierarchy',
    'currency',
    'lang',
  ]

  excludedFileds.forEach((field) => delete queryCopy[field])

  // Format Arrays Fields
  for (const prop in queryCopy) {
    if (queryCopy[prop].length > 0)
      finalQuery[prop] = { in: [...queryCopy[prop]] }
  }

  // format sizes field
  if (query.types && query.types.length > 0) {
    finalQuery.type = {
      in: query.types,
    }
  }

  if (query.category_hierarchy && query.category_hierarchy.length > 0) {
    finalQuery['category_hierarchy'] = {
      in: query.category_hierarchy,
    }
  }

  // format sizes field
  if (query.sizes && query.sizes.length > 0) {
    finalQuery['colors.sizes.size'] = {
      in: query.sizes,
    }
  }

  // format colors field
  if (query.colors && query.colors.length > 0) {
    finalQuery['colors.colorName'] = {
      in: query.colors,
    }
  }

  // format sort field
  const sortValues = {
    price: 'colors.price',
    'most recent': '-createdAt',
    rating: '-ratingsAverage',
  }

  if (query.sort) finalQuery.sort = sortValues[query.sort]

  // format price field
  if (query.price) {
    finalQuery['colors.price'] = {
      gt: query.price[0],
      lt: query.price[1],
    }
  }

  // format category field
  if (query.category) finalQuery.category = query.category

  if (query.skip) finalQuery.skip = query.skip
  if (query.limit) finalQuery.limit = query.limit
  if (query.currency) finalQuery.currency = query.currency
  if (query.lang) finalQuery.lang = query.lang

  return finalQuery
}
