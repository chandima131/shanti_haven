import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(), name: text('name').notNull(), gender: text('gender').notNull(), email: text('email').notNull(), mobile: text('mobile').notNull().default(''), service: text('service').notNull(), appointmentTime: text('appointment_time').notNull(), timezone: text('timezone'), notes: text('notes'), zoomJoinUrl: text('zoom_join_url'), zoomMeetingId: text('zoom_meeting_id'), status: text('status').notNull().default('received'), createdAt: text('created_at').notNull(),
});
