export function hasProperty<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return typeof value === 'object' && value !== null && value !== undefined && key in value;
}
