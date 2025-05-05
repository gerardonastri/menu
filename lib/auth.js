// Credenziali pre-impostate
export const ADMIN_USERS = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin",
  },
  {
    email: "manager@example.com",
    password: "manager123",
    name: "Manager",
  },
];

// Funzione per verificare le credenziali
export function verifyCredentials(email, password) {
  const user = ADMIN_USERS.find(
    (user) => user.email === email && user.password === password
  );
  return user || null;
}

// Chiavi per localStorage
export const AUTH_TOKEN_KEY = "menu_admin_auth_token";
export const USER_DATA_KEY = "menu_admin_user";

// Funzione per generare un token semplice (in un'app reale, usare JWT o altro)
export function generateToken() {
  return `token_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
}
