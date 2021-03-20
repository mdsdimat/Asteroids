const basePath = 'https://ya-praktikum.tech/api/v2/';
const oAuthUrl = 'https://oauth.yandex.ru/authorize';

const localPath = 'https://helsinki-asteroids-02.ya-praktikum.tech/api/';

export const apiUrl = (path: string): string => localPath + path;

export const buildUrl = (path: string): string => basePath + path;

export const getOAuthUrl = (serviceId: string): string => {
  const { protocol } = window.location;
  const { hostname } = window.location;
  const { port } = window.location;
  return `${oAuthUrl}?response_type=code&client_id=${serviceId}&redirect_uri=${protocol}//${hostname}:${port}`;
};
