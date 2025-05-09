// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized career path and field recommendations related to JEE/NEET based on questionnaire responses.
 *
 * - personalizedRecommendations - A function that takes questionnaire responses and returns personalized career recommendations.
 * - PersonalizedRecommendationsInput - The input type for the personalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the personalizedRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  questionnaireResponses: z
    .string()
    .describe(
      'A string containing the student responses to the career questionnaire.'
    ),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .string()
    .describe(
      'A list of career paths and fields related to JEE/NEET, personalized based on the student responses.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function personalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {
    schema: z.object({
      questionnaireResponses: z
        .string()
        .describe(
          'A string containing the student responses to the career questionnaire.'
        ),
    }),
  },
  output: {
    schema: z.object({
      careerRecommendations: z
        .string()
        .describe(
          'A list of career paths and fields related to JEE/NEET, personalized based on the student responses.'
        ),
    }),
  },
  prompt: `Based on the following questionnaire responses, recommend suitable career paths and fields related to JEE/NEET. Provide personalized recommendations.

Questionnaire Responses: {{{questionnaireResponses}}}`,
});

const personalizedRecommendationsFlow = ai.defineFlow<
  typeof PersonalizedRecommendationsInputSchema,
  typeof PersonalizedRecommendationsOutputSchema
>(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
