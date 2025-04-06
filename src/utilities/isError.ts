/**
+ * Type guard to check if a value is an instance of Error
+ * @param error - The value to check
+ * @returns True if the value is an Error instance, false otherwise
+ */
export function isError(error: unknown): error is Error {
  return error instanceof Error
}
