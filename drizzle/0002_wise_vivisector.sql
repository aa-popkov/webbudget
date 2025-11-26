PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_budget_table` (
	`id` text PRIMARY KEY DEFAULT '676cc72b-e5f0-4e79-bc57-16c80145e986' NOT NULL,
	`userId` text NOT NULL,
	`amount` numeric NOT NULL,
	`category` text NOT NULL,
	`date` text,
	`type` text,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category`) REFERENCES `category_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_budget_table`("id", "userId", "amount", "category", "date", "type") SELECT "id", "userId", "amount", "category", "date", "type" FROM `budget_table`;--> statement-breakpoint
DROP TABLE `budget_table`;--> statement-breakpoint
ALTER TABLE `__new_budget_table` RENAME TO `budget_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_category_table` (
	`id` text PRIMARY KEY DEFAULT '7f0db942-9be9-4826-a72a-71a13c2582b1' NOT NULL,
	`userId` text NOT NULL,
	`name` text,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_category_table`("id", "userId", "name") SELECT "id", "userId", "name" FROM `category_table`;--> statement-breakpoint
DROP TABLE `category_table`;--> statement-breakpoint
ALTER TABLE `__new_category_table` RENAME TO `category_table`;--> statement-breakpoint
CREATE TABLE `__new_users_table` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`lastAuth` text
);
--> statement-breakpoint
INSERT INTO `__new_users_table`("id", "email", "lastAuth") SELECT "id", "email", "lastAuth" FROM `users_table`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
ALTER TABLE `__new_users_table` RENAME TO `users_table`;