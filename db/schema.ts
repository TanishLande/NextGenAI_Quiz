// db/schema.ts
import { pgTable, integer, varchar, text, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  // Store options as PostgreSQL text array
  options: text("options")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  correctIndex: integer("correct_index").notNull(),
  // Optional: createdAt
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});