'use server';

import { generatePracticeQuestions } from '@/ai/flows/generate-practice-questions';
import { generateAdaptiveQuiz, type AdaptiveQuizInput } from '@/ai/flows/adaptive-quiz-generation';
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
