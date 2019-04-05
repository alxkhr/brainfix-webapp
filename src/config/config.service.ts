export namespace ConfigService {
  export function getToken(): string | null {
    return localStorage.getItem('token');
  }

  export function setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  export function getServerUrl(): string {
    return localStorage.getItem('serverUrl') || 'https://brainfix.retterdesapok.de/api';
  }

  export function setServerUrl(url: string): void {
    localStorage.setItem('serverUrl', url);
  }
}
