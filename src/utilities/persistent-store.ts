type ValueKey = 'users' 

interface ValueObject<T> {
  value: T;
}

export function getValue<T>(key: ValueKey): T | null {
  const valueObjectString = localStorage.getItem(key)
  if (!valueObjectString) {
    return null
  }

  try {
    const valueObject: ValueObject<T> = JSON.parse(valueObjectString)
    return valueObject.value
  } catch {
    return null
  }
}

export function storeValue<T>(key: ValueKey, value: T) {
  const valueObject: ValueObject<T> = { value }
  return localStorage.setItem(
    key,
    JSON.stringify(valueObject)
  )
}
