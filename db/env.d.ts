declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    RESEND_API_KEY?: string;
    FROM_EMAIL?: string;
  }
}
