// ~/plugins/usePost.ts
import { FetchContext } from '@nuxt/types';

export async function useLogin(fetch: FetchContext['$fetch'], path: string, requestData: { email: string; password: string; }) {
  try {
    const response = await fetch(`http://209.38.204.242:7707/api/v1/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Ошибка при выполнении POST-запроса:', error);
    throw error;
  }
}
