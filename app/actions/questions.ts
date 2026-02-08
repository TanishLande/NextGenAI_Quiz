// app/actions/questions.ts
"use server";

import { db } from "@/database";           // ← your drizzle db instance
import { questions } from "@/db/schema"; // adjust path
import { revalidatePath } from "next/cache";

export async function addNewQuestion(formData: FormData) {
  try {
    const question = formData.get("question") as string;
    const optionA = formData.get("optionA") as string;
    const optionB = formData.get("optionB") as string;
    const optionC = formData.get("optionC") as string;
    const optionD = formData.get("optionD") as string;
    const correctIndexStr = formData.get("correctIndex") as string;

    // Validation
    if (!question?.trim()) {
      return { success: false, error: "Question is required" };
    }

    const opts = [optionA, optionB, optionC, optionD].map(o => o?.trim() || "");
    if (opts.some(o => !o)) {
      return { success: false, error: "All 4 options are required" };
    }

    const correctIndex = parseInt(correctIndexStr);
    if (isNaN(correctIndex) || correctIndex < 0 || correctIndex > 3) {
      return { success: false, error: "Please select a valid correct answer" };
    }

    // Insert into database
    await db.insert(questions).values({
      question: question.trim(),
      options: opts,
      correctIndex,
    });

    // Revalidate quiz page (if you want fresh data)
    revalidatePath("/quiz");

    return { success: true, message: "Question added successfully!" };
  } catch (error) {
    console.error("Add question error:", error);
    return { success: false, error: "Failed to add question. Try again." };
  }
}