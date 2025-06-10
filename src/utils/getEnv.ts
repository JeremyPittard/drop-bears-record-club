export function getEnvVar(key: string): string {
  // need to ignore the following as they might not be defined in the each environment.
  // cant do ts-expect as only one will error.
  //@ts-ignore
  const devValue = import.meta.env[key];
  //@ts-ignore
  const prodValue = process.env[key];

  const value = devValue ?? prodValue;

  if (!value) {
    throw new Error(`Environment variable "${key}" is not set.`);
  }

  return value;
}
