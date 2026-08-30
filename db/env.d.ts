declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    ZOOM_ACCOUNT_ID?: string;
    ZOOM_CLIENT_ID?: string;
    ZOOM_CLIENT_SECRET?: string;
    RESEND_API_KEY?: string;
    FROM_EMAIL?: string;
  }
}
