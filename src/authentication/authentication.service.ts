import { ConfigService } from '../config/config.service';

export namespace AuthenticationService {
  export async function login(username: string, password: string): Promise<void> {
    const response = await fetch(`${ConfigService.getServerUrl()}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Connection failed.');
    }
    const token = await response.text();
    if (!token) {
      throw new Error('Connection failed.');
    }
    ConfigService.setToken(token);
  }

  export async function register(username: string, password: string): Promise<void> {
    const response = await fetch(`${ConfigService.getServerUrl()}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Connection failed.');
    }
    const token = await response.text();
    if (!token) {
      throw new Error('Connection failed.');
    }
    ConfigService.setToken(token);
  }
}
