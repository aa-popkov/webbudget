PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_budget_table` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`amount` numeric NOT NULL,
	`categoryId` text NOT NULL,
	`date` text,
	`type` text,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `category_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_budget_table`("id", "userId", "amount", "categoryId", "date", "type") SELECT "id", "userId", "amount", "category", "date", "type" FROM `budget_table`;--> statement-breakpoint
DROP TABLE `budget_table`;--> statement-breakpoint
ALTER TABLE `__new_budget_table` RENAME TO `budget_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;