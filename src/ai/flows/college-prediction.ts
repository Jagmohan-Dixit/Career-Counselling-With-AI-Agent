// college-prediction.ts
'use server';
/**
 * @fileOverview A college prediction chatbot flow.
 *
 * - collegePrediction - A function that handles the college prediction process.
 * - CollegePredictionInput - The input type for the collegePrediction function.
 * - CollegePredictionOutput - The return type for the collegePrediction function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CollegePredictionInputSchema = z.object({
  openRank: z
    .number()
    .describe('The open rank of the student.'),
  categoryRank: z
    .number()
    .describe('The category rank of the student.'),
  category: z.string().describe('The category of the student (e.g., OBC, SC, ST).'),
  examType: z.string().describe('The type of exam (JEE or NEET).'),
});
export type CollegePredictionInput = z.infer<typeof CollegePredictionInputSchema>;

const CollegePredictionOutputSchema = z.object({
  predictedColleges: z
    .array(z.string())
    .describe('An array of predicted colleges based on the provided ranks and category.'),
});
export type CollegePredictionOutput = z.infer<typeof CollegePredictionOutputSchema>;

export async function collegePrediction(input: CollegePredictionInput): Promise<CollegePredictionOutput> {
  return collegePredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'collegePredictionPrompt',
  input: {
    schema: z.object({
      openRank: z
        .number()
        .describe('The open rank of the student.'),
      categoryRank: z
        .number()
        .describe('The category rank of the student.'),
      category: z.string().describe('The category of the student (e.g., OBC, SC, ST).'),
      examType: z.string().describe('The type of exam (JEE or NEET).'),
    }),
  },
  output: {
    schema: z.object({
      predictedColleges: z
        .array(z.string())
        .describe('An array of predicted colleges based on the provided ranks and category.'),
    }),
  },
  prompt: `You are a college prediction chatbot for JEE and NEET students.

  Based on the student's open rank, category rank, category, and exam type, predict the colleges where the student has a high chance of getting admission.

  Open Rank: {{{openRank}}}
  Category Rank: {{{categoryRank}}}
  Category: {{{category}}}
  Exam Type: {{{examType}}}

  Predicted Colleges:`,
});

const collegePredictionFlow = ai.defineFlow<
  typeof CollegePredictionInputSchema,
  typeof CollegePredictionOutputSchema
>({
  name: 'collegePredictionFlow',
  inputSchema: CollegePredictionInputSchema,
  outputSchema: CollegePredictionOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
