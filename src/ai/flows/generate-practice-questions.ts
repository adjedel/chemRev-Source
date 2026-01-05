'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating practice chemistry questions on a specific topic.
 *
 * generatePracticeQuestions - A function that generates practice chemistry questions.
 * GeneratePracticeQuestionsInput - The input type for the generatePracticeQuestions function.
 * GeneratePracticeQuestionsOutput - The return type for the generatePracticeQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeQuestionsInputSchema = z.object({
  topic: z.string().describe('The specific chemistry topic for which to generate practice questions.'),
  numQuestions: z.number().int().positive().default(5).describe('The number of practice questions to generate.'),
});

export type GeneratePracticeQuestionsInput = z.infer<typeof GeneratePracticeQuestionsInputSchema>;

const GeneratePracticeQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of practice chemistry questions.'),
});

export type GeneratePracticeQuestionsOutput = z.infer<typeof GeneratePracticeQuestionsOutputSchema>;

export async function generatePracticeQuestions(input: GeneratePracticeQuestionsInput): Promise<GeneratePracticeQuestionsOutput> {
  return generatePracticeQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeQuestionsPrompt',
  input: {schema: GeneratePracticeQuestionsInputSchema},
  output: {schema: GeneratePracticeQuestionsOutputSchema},
  prompt: `You are an expert chemistry tutor. Generate {{numQuestions}} practice questions for the following topic: {{topic}}.

Each question should be challenging and designed to test the student's understanding of the core concepts.  The questions should be able to be answered with one to two sentences at most.

Return the questions as a numbered list.
`,
});

const generatePracticeQuestionsFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuestionsFlow',
    inputSchema: GeneratePracticeQuestionsInputSchema,
    outputSchema: GeneratePracticeQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
