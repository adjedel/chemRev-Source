'use server';

import { generatePracticeQuestions } from '@/ai/flows/generate-practice-questions';
import { generateAdaptiveQuiz, type AdaptiveQuizInput, type AdaptiveQuizOutput } from '@/ai/flows/adaptive-quiz-generation';
import { getAnswerFeedback } from '@/ai/flows/feedback-on-answers';

export async function handleGeneratePracticeQuestions(topic: string) {
  try {
    const result = await generatePracticeQuestions({ topic, numQuestions: 5 });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating practice questions:', error);
    return { success: false, error: 'Failed to generate practice questions.' };
  }
}

export async function handleGenerateAdaptiveQuiz(input: AdaptiveQuizInput) {
    try {
      const result = await generateAdaptiveQuiz(input);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error generating adaptive quiz:', error);
      return { success: false, error: 'Failed to generate quiz question.' };
    }
  }
  
  export async function handleGetAnswerFeedback(
    question: string,
    studentAnswer: string,
    correctAnswer: string
  ) {
    try {
      const result = await getAnswerFeedback({ question, studentAnswer, correctAnswer });
      return { success: true, data: result };
    } catch (error) {
      console.error('Error getting answer feedback:', error);
      return { success: false, error: 'Failed to get feedback.' };
    }
  }

  export async function generateFullQuiz(input: { topic: string, difficulty: 'easy' | 'medium' | 'hard' }) {
    const questions: AdaptiveQuizOutput[] = [];
    const generatedQuestions: string[] = [];

    try {
      for (let i = 0; i < 5; i++) {
        const result = await generateAdaptiveQuiz({
          topic: input.topic,
          difficulty: input.difficulty,
          studentPreviousAnswers: [],
          questionsToAvoid: generatedQuestions, // Pass already generated questions
        });
        
        if (result) {
          questions.push(result);
          generatedQuestions.push(result.question); // Add the new question to our avoidance list
        } else {
          // If a single generation fails, we can stop and return what we have.
          break;
        }
      }
      // Return success even if we got fewer than 5 questions.
      return { success: true, data: questions };
    } catch (error) {
      console.error('Error generating full quiz:', error);
      // Even in case of a total failure, return the (potentially empty) list of questions we have.
      // This prevents a server crash and allows the client to handle the empty/partial state.
      return { success: true, data: questions, error: 'Failed to generate the complete quiz.' };
    }
  }
