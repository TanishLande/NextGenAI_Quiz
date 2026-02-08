// app/actions/quiz.ts
"use server"

import { db } from "@/database"           // your Drizzle DB instance
import { questions } from "@/db/schema"   // your questions table
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// Action 1: Get all questions
export async function getAllQuestions() {
  try {
    const allQuestions = await db
      .select({
        id: questions.id,
        question: questions.question,
        options: questions.options,
        correctIndex: questions.correctIndex,
      })
      .from(questions)
      .orderBy(questions.id)

    return { success: true, questions: allQuestions }
  } catch (error) {
    console.error("Fetch questions error:", error)
    return { success: false, error: "Failed to load questions" }
  }
}

// Action 2: Submit score / save result (optional - if you want to persist score)
export async function submitQuizScore(userId: number | null, score: number, total: number) {
  // If you have a users or scores table, you can save here
  // For now just returning success (you can expand later)
  try {
    // Example: await db.insert(scoresTable).values({ userId, score, total, createdAt: ... })
    revalidatePath("/quiz")
    return { success: true, message: `Score submitted: ${score}/${total}` }
  } catch (error) {
    console.error("Score submit error:", error)
    return { success: false, error: "Failed to save score" }
  }
}