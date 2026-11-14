CREATE TABLE `answers` (
	`room` text NOT NULL,
	`player` text NOT NULL,
	`question` integer NOT NULL,
	`choice` integer NOT NULL,
	`correct` integer NOT NULL,
	`points` integer NOT NULL,
	`answered_at` integer NOT NULL,
	PRIMARY KEY(`room`, `player`, `question`),
	FOREIGN KEY (`room`) REFERENCES `rooms`(`code`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`name` text NOT NULL,
	`token_hash` text NOT NULL,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`room`) REFERENCES `rooms`(`code`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `room_player_name` ON `players` (`room`,`name`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`host_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`start_at` integer,
	`question_ids` text NOT NULL
);
