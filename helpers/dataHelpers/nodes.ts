import { LocalStorage } from '../localStorage';

const ERROR_COUNTS_KEY = 'nodeErrorCounts';

// Retrieve error counts from localStorage
export const getNodeErrorCounts = async (): Promise<Record<string, number>> => {
  const errorCounts = await LocalStorage.getItem<string>(ERROR_COUNTS_KEY);
  return errorCounts ? JSON.parse(errorCounts) : {};
};

// Store error counts in localStorage
export const storeNodeErrorCounts = (
  errorCounts: Record<string, number>,
): void => {
  LocalStorage.setItem(ERROR_COUNTS_KEY, JSON.stringify(errorCounts));
};

// Reset error counts (e.g., on login)
export const resetNodeErrorCounts = (): void => {
  LocalStorage.removeItem(ERROR_COUNTS_KEY);
};
