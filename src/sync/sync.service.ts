const serverUrl = 'https://brainfix.retterdesapok.de/api';

export namespace SyncService {
  export async function getJson<T>(url: string): Promise<T | undefined> {
    const token = localStorage.getItem('token') || '';
    const response = await fetch(`${serverUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ lastSync: 0 }),
    });
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  }

  export async function synchronize<T>(
    url: string,
    resourceName: string,
    currentState: T,
    lastSync: string,
  ): Promise<T | undefined> {
    const token = localStorage.getItem('token') || '';
    const response = await fetch(`${serverUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ lastSync, [resourceName]: currentState }),
    });
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  }
}
