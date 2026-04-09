export const DEMO_AUTH_STORAGE_KEY = "cardwise-demo-user";

export type DemoUser = {
  id: string;
  email: string;
  name: string;
};

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(DEMO_AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function signInDemoUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const user: DemoUser = {
    id: "demo-user-cardwise",
    email: "demo@cardwiseindia.com",
    name: "CardWise Demo User"
  };

  window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("cardwise-demo-auth-changed", { detail: user }));
  return user;
}

export function signInDemoAdminUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const user: DemoUser = {
    id: "demo-admin-cardwise",
    email: "admin@cardwiseindia.com",
    name: "CardWise Demo Admin"
  };

  window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("cardwise-demo-auth-changed", { detail: user }));
  return user;
}

export function signOutDemoUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("cardwise-demo-auth-changed", { detail: null }));
}
