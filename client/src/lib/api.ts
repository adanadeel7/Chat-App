const API_URL = import.meta.env.VITE_API_URL as string;

let currentAccessToken: string | null = null;


export function setAccessToken (token: string | null) {
  currentAccessToken = token;
}

export interface ApiUser { 
    id: string;
    email: string;
}

export class ApiError extends Error { 
    status!: number; 
    errors ?: unknown; 

    constructor(message : string, status : number, errors ?: unknown){
        super(message);
        this.status = status; 
        this.errors = errors;
    }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(currentAccessToken ? { Authorization: `Bearer ${currentAccessToken}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.message ?? "Something went wrong", res.status, data.errors);
  }

  return data as T;
}

export function registerRequest(body: { name: string; email: string; password: string }) {
  return request<{ message: string; user: Pick<ApiUser, "id" | "email"> }>(
    "/auth/register",
    { method: "POST", body: JSON.stringify(body) },
  );
}

export function loginRequest(body: { email: string; password: string }) {
  return request<{ message: string; accessToken: string; user: ApiUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function refreshRequest() {
  return request<{ message: string; accessToken: string; user: ApiUser }>("/auth/refresh", {
    method: "POST",
  });
}

export function logoutRequest() {
  return request<{ message: string }>("/auth/logout", { method: "POST" });
}


