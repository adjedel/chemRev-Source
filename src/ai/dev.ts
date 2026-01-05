import { config } from 'dotenv';
config();

import '@/ai/flows/generate-practice-questions.ts';
import '@/ai/flows/adaptive-quiz-generation.ts';
import '@/ai/flows/feedback-on-answers.ts';