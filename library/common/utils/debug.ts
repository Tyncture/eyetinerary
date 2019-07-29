export function debug(message: any) {
   if (process.env.NODE_ENV !== "production") {
     console.log("DEBUG:", message);
   }
}

export function debugSSR(message: any) {
  const isSeverSideRenderer = typeof window === "undefined";
  if (isSeverSideRenderer) {
    console.log("SSR:", message);
  }
}
