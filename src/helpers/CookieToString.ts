interface CookiesType {
    [property: string]: any
}

const CookieToString = (cookies: CookiesType): string => Object.keys(cookies)
  .reduce(
    (str, cookie) => str + `${cookie}=${cookies[cookie]}`,
    '',
  )

export default CookieToString;
