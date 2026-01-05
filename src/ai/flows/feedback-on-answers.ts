'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing feedback on student answers to chemistry questions.
 *
 * The flow takes a question, the student's answer, and the correct answer as input, and returns detailed feedback
 * explaining the reasoning behind the solution, whether the student's answer was correct or incorrect.
 *
 * @exported
 * - `getAnswerFeedback` -  A function that calls the feedbackOnAnswersFlow with the provided input.
 * - `AnswerFeedbackInput` - The input type for the getAnswerFeedback function.
 * - `AnswerFeedbackOutput` - The return type for the getAnswerFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFeedbackInputSchema = z.object({
  question: z.string().describe('The chemistry question.'),
  studentAnswer: z.string().describe('The student\u0027s answer to the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
});
export type AnswerFeedbackInput = z.infer<typeof AnswerFeedbackInputSchema>;

const AnswerFeedbackOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the student\u0027s answer is correct.'),
  feedback: z.string().describe('Detailed feedback explaining the solution and reasoning.'),
});
export type AnswerFeedbackOutput = z.infer<typeof AnswerFeedbackOutputSchema>;

export async function getAnswerFeedback(input: AnswerFeedbackInput): Promise<AnswerFeedbackOutput> {
  return feedbackOnAnswersFlow(input);
}

const feedbackOnAnswersPrompt = ai.definePrompt({
  name: 'feedbackOnAnswersPrompt',
  input: {schema: AnswerFeedbackInputSchema},
  output: {schema: AnswerFeedbackOutputSchema},
  prompt: `You are an expert chemistry tutor providing feedback to students.

  Evaluate the student\'s answer to the following question, and provide detailed feedback explaining the reasoning behind the solution. Tell them if they got the answer correct or not.

  Question: {{{question}}}
  Student\'s Answer: {{{studentAnswer}}}
  Correct Answer: {{{correctAnswer}}}
  `,
});

const feedbackOnAnswersFlow = ai.defineFlow(
  {
    name: 'feedbackOnAnswersFlow',
    inputSchema: AnswerFeedbackInputSchema,
    outputSchema: AnswerFeedbackOutputSchema,
  },
  async input => {
    const {output} = await feedbackOnAnswersPrompt(input);
    return output!;
  }
);
