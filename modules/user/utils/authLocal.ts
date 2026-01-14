export type AppUser = {
  id: string;
  email: string;
  role?: string;
  createdAt?: string;
};

const KEY = 'app_user_v1';

export function saveUserToLocal(user: AppUser) {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (err) {
    // falha silenciosa — localStorage pode não estar disponível no SSR
    console.warn('saveUserToLocal failed', err);
  }
}

export function getUserFromLocal(): AppUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function removeUserFromLocal() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
