import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('User', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
});
