interface CookiesType {
    [property: string]: any
}

const CookieToString = (cookies: CookiesType): string => {
  let str = '';

  Object.keys(cookies).forEach(cookie => {
    str += `${cookie}=${cookies[cookie]}; `;
  });

  return str;
};

export default CookieToString;