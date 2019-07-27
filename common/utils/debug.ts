export function debug(message: any) {
   if (process.env.NODE_ENV !== "production") {
     console.log(message);
   }
}

export function debugSSR(message: any) {
  const isSeverSideRenderer = typeof process.browser === "undefined";
  if (isSeverSideRenderer) {
    debug(message);
  }
}
