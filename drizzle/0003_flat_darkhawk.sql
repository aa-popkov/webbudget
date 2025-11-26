PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_budget_table` (
	`id` text PRIMARY KEY NOT NULL,
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
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_category_table`("id", "userId", "name") SELECT "id", "userId", "name" FROM `category_table`;--> statement-breakpoint
DROP TABLE `category_table`;--> statement-breakpoint
ALTER TABLE `__new_category_table` RENAME TO `category_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `category_table_userId_name_unique` ON `category_table` (`userId`,`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);