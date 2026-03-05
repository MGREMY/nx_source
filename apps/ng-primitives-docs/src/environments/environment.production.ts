export const environment = {
  production: true,
  appUrl: (window as any)["runtime_config"]["APP_URL"] ?? "http://localhost:4200",
  appBaseHref: (window as any)["runtime_config"]["APP_BASE_HREF"] ?? "/",
};
