CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`gender` text NOT NULL,
	`email` text NOT NULL,
	`service` text NOT NULL,
	`appointment_time` text NOT NULL,
	`timezone` text,
	`notes` text,
	`zoom_join_url` text,
	`zoom_meeting_id` text,
	`status` text DEFAULT 'received' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_bookings_appointment_time` ON `bookings` (`appointment_time`);
