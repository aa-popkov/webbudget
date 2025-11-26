CREATE TABLE `budget_table` (
	`id` text PRIMARY KEY DEFAULT 'b1f59135-5864-43d2-8f6e-79be9fc5dd14' NOT NULL,
	`userId` text NOT NULL,
	`amount` numeric NOT NULL,
	`category` text NOT NULL,
	`date` text,
	`type` text,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category`) REFERENCES `category_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `category_table` (
	`id` text PRIMARY KEY DEFAULT 'ec9ec08b-7e39-49ea-8533-bb447ca45f8f' NOT NULL,
	`userId` text NOT NULL,
	`name` text,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users_table` (
	`id` text PRIMARY KEY DEFAULT '46fda85b-8130-440d-984d-4fb8eef1f103' NOT NULL,
	`email` text NOT NULL,
	`lastAuth` text
);
--> statement-breakpoint
INSERT INTO `__new_users_table`("id", "email", "lastAuth") SELECT "id", "email", "lastAuth" FROM `users_table`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
ALTER TABLE `__new_users_table` RENAME TO `users_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;