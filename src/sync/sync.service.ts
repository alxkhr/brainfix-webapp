import { ConfigService } from '../config/config.service';

export namespace SyncService {
  export async function getJson<T>(url: string): Promise<T | undefined> {
    const token = ConfigService.getToken();
    if (!token) {
      return;
    }
    const response = await fetch(`${ConfigService.getServerUrl()}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ lastSync: 0 }),
    });
    if (!response.ok) {
      return;
    }
    return response.json();
  }

  export async function synchronize<T>(
    url: string,
    resourceName: string,
    currentState: T,
    lastSync: string,
  ): Promise<T | undefined> {
    const token = ConfigService.getToken();
    if (!token) {
      return;
    }
    const response = await fetch(`${ConfigService.getServerUrl()}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ lastSync, [resourceName]: currentState }),
    });
    if (!response.ok) {
      return;
    }
    return response.json();
  }
}
