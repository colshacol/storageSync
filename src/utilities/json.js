// Try to stringify complex data. If it is a string
// already, just return it.
export const stringify = (target) => {
  return typeof target === 'string' ? target : JSON.stringify(target)
}

// Try to parse stringified data. If data is a string
// already, just return it.
export const parse = (target) => {
  if (typeof target !== 'string') return target

  try {
    return JSON.parse(target)
  } catch (e) {
    return target
  }
}

// Try to parse stringified data. If data is a string
// already, just return it.
export const parseDeep = (target) => {
  return Object.entries(target).reduce((final, entry) => {
    final[entry[0]] = parse(entry[1])
    return final
  }, {})
}
