'use server';

/**
 * @fileOverview Generates adaptive chemistry quiz questions based on student performance.
 *
 * - generateAdaptiveQuiz - A function that generates quiz questions, adapting difficulty based on the student's previous responses.
 * - AdaptiveQuizInput - The input type for the generateAdaptiveQuiz function, including the topic and previous answers.
 * - AdaptiveQuizOutput - The return type for the generateAdaptiveQuiz function, providing a quiz question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveQuizInputSchema = z.object({
  topic: z.string().describe('The chemistry topic for which to generate a question.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium').describe('The difficulty level of the question.'),
  studentPreviousAnswers: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    isCorrect: z.boolean()
  })).optional().describe('Array of the student\'s previous answers to adapt difficulty.'),
  questionsToAvoid: z.array(z.string()).optional().describe('An array of questions that have already been generated in this session to ensure variety.'),
});

export type AdaptiveQuizInput = z.infer<typeof AdaptiveQuizInputSchema>;

const AdaptiveQuizOutputSchema = z.object({
  question: z.string().describe('The generated quiz question.'),
  possibleAnswers: z.array(z.string()).describe('The possible answers for the question.'),
  correctAnswer: z.string().describe('The correct answer for the question.'),
  explanation: z.string().describe('An explanation of why the correct answer is correct.'),
});

export type AdaptiveQuizOutput = z.infer<typeof AdaptiveQuizOutputSchema>;

export async function generateAdaptiveQuiz(input: AdaptiveQuizInput): Promise<AdaptiveQuizOutput> {
  return adaptiveQuizFlow(input);
}

const adaptiveQuizPrompt = ai.definePrompt({
  name: 'adaptiveQuizPrompt',
  input: { schema: AdaptiveQuizInputSchema },
  output: { schema: AdaptiveQuizOutputSchema },
  prompt: `You are an expert chemistry teacher, skilled at creating practice quiz questions.

  Generate a quiz question on the topic of {{{topic}}}. The difficulty should be {{{difficulty}}}.

  {{#if questionsToAvoid}}
  IMPORTANT: Avoid generating questions that are too similar to the following already-generated questions:
  {{#each questionsToAvoid}}
  - {{{this}}}
  {{/each}}
  {{/if}}

  Here are some of the student\'s previous answers:
  {{#if studentPreviousAnswers}}
    {{#each studentPreviousAnswers}}
      Question: {{{question}}}
      Answer: {{{answer}}}
      Correct: {{{isCorrect}}}
    {{/each}}
  {{else}}
    The student has not answered any questions yet.
  {{/if}}

  Make sure to generate a unique question with plausible possible answers, and indicate which one is correct, and explain why that answer is correct.
`,
});

const adaptiveQuizFlow = ai.defineFlow(
  {
    name: 'adaptiveQuizFlow',
    inputSchema: AdaptiveQuizInputSchema,
    outputSchema: AdaptiveQuizOutputSchema,
  },
  async (input) => {
    const { output } = await adaptiveQuizPrompt(input);
    return output!;
  }
);
