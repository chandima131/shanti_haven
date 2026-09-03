# GoDaddy Node.js Hosting deployment

This project is prepared for GoDaddy Node.js Hosting as a standard Next.js application.

## 1. Create the GoDaddy app and database

1. Open GoDaddy Node.js Hosting and choose **Connect GitHub** or **Upload ZIP**.
2. Create/attach a managed MySQL database from the app's **Database** section.
3. Open **Secrets** and note the system-managed database credentials.

## 2. Add application secrets

Add these in the GoDaddy app's **Secrets** settings for both preview and published environments:

- `RESEND_API_KEY`
- `FROM_EMAIL` (for example, `Shanti Haven <appointments@shantihaven.co.uk>`)
- `BOOKING_NOTIFICATION_EMAIL` (`info@shantihaven.co.uk`)
- `SITE_URL` (`https://shantihaven.co.uk`)

For MySQL, either provide `DATABASE_URL`, or provide:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_SSL` (`false` unless GoDaddy says SSL is required)

The application also recognises equivalent `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD` names.

Do not upload or commit `.env` files. GoDaddy supplies `PORT` automatically.

## 3. Deploy and test

1. Import the repository/ZIP and wait for the preview build.
2. Open the preview URL and submit a test booking.
3. Confirm the booking appears in the GoDaddy database.
4. Confirm the customer receives a confirmation and `info@shantihaven.co.uk` receives the new-booking notification.
5. Check **Runtime Logs** if either step fails.
6. In **Settings**, connect `shantihaven.co.uk`, then select **Publish Now**.

The bookings table is created automatically on the first valid booking. The same schema is also available in `db/mysql-schema.sql` for manual database setup.
