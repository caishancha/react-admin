export interface ReactAdminAppConfigRaw {
  VITE_GLOB_API_URL: string;
  VITE_GLOB_AUTH_DINGDING_CLIENT_ID: string;
  VITE_GLOB_AUTH_DINGDING_CORP_ID: string;
}

declare global {
  interface window {
    _REACT_ADMIN_APP_CONF_: ReactAdminAppConfigRaw;
  }
}
