'use server';
/**
 * @fileOverview A personalized study schedule generator AI agent.
 *
 * - generateStudySchedule - A function that handles the study schedule generation process.
 * - GenerateStudyScheduleInput - The input type for the generateStudySchedule function.
 * - GenerateStudyScheduleOutput - The return type for the generateStudySchedule function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateStudyScheduleInputSchema = z.object({
  learningStyle: z
    .string()
    .describe(
      'The learning style of the student (e.g., visual, auditory, kinesthetic).'
    ),
  examDate: z.string().describe('The date of the exam (e.g., YYYY-MM-DD).'),
  topics: z.string().describe('The topics to be covered in the study schedule.'),
  availableHoursPerDay: z
    .number()
    .describe('The number of hours available for study each day.'),
});
export type GenerateStudyScheduleInput = z.infer<
  typeof GenerateStudyScheduleInputSchema
>;

const GenerateStudyScheduleOutputSchema = z.object({
  studySchedule: z.string().describe('The generated study schedule.'),
});
export type GenerateStudyScheduleOutput = z.infer<
  typeof GenerateStudyScheduleOutputSchema
>;

export async function generateStudySchedule(
  input: GenerateStudyScheduleInput
): Promise<GenerateStudyScheduleOutput> {
  return generateStudyScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudySchedulePrompt',
  input: {
    schema: z.object({
      learningStyle: z
        .string()
        .describe(
          'The learning style of the student (e.g., visual, auditory, kinesthetic).'
        ),
      examDate: z.string().describe('The date of the exam (e.g., YYYY-MM-DD).'),
      topics: z.string().describe('The topics to be covered in the study schedule.'),
      availableHoursPerDay: z
        .number()
        .describe('The number of hours available for study each day.'),
    }),
  },
  output: {
    schema: z.object({
      studySchedule: z.string().describe('The generated study schedule.'),
    }),
  },
  prompt: `You are an AI study schedule generator. You are given the learning style of the student, the date of the exam, the topics to be covered, and the number of hours available per day. You will generate a personalized study schedule for the student.

Learning Style: {{{learningStyle}}}
Exam Date: {{{examDate}}}
Topics: {{{topics}}}
Available Hours Per Day: {{{availableHoursPerDay}}}

Study Schedule:`,
});

const generateStudyScheduleFlow = ai.defineFlow<
  typeof GenerateStudyScheduleInputSchema,
  typeof GenerateStudyScheduleOutputSchema
>(
  {
    name: 'generateStudyScheduleFlow',
    inputSchema: GenerateStudyScheduleInputSchema,
    outputSchema: GenerateStudyScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
