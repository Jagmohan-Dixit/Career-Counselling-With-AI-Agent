'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {generateStudySchedule} from "@/ai/flows/personalized-study-schedule";
import {toast} from "@/hooks/use-toast";

export default function StudySchedulePage() {
  const [learningStyle, setLearningStyle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [topics, setTopics] = useState('');
  const [availableHours, setAvailableHours] = useState('');
  const [studySchedule, setStudySchedule] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!learningStyle || !examDate || !topics || !availableHours) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateStudySchedule({
        learningStyle: learningStyle,
        examDate: examDate,
        topics: topics,
        availableHoursPerDay: parseInt(availableHours),
      });
      setStudySchedule(result.studySchedule);
      toast({
        title: 'Success',
        description: 'Study schedule generated!',
      });
    } catch (error) {
      console.error('Error generating study schedule:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate study schedule. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative mx-auto mt-24 max-w-5xl p-8 rounded-lg shadow-xl overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 blur-2xl"></div>
      <Card className="relative z-10 bg-transparent text-foreground shadow-none">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-3xl font-bold mb-4">Smart Study Schedule Generator</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Generate a personalized study schedule based on your learning style and exam date.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="learningStyle" className="block text-sm font-bold mb-2">
                Learning Style
              </label>
              <Input
                type="text"
                id="learningStyle"
                placeholder="e.g., Visual, Auditory, Kinesthetic"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="examDate" className="block text-sm font-bold mb-2">
                Exam Date
              </label>
              <Input
                type="date"
                id="examDate"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="topics" className="block text-sm font-bold mb-2">
                Topics to Cover
              </label>
              <Textarea
                id="topics"
                rows={3}
                placeholder="e.g., Physics, Chemistry, Mathematics"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="availableHours" className="block text-sm font-bold mb-2">
                Available Hours per Day
              </label>
              <Input
                type="number"
                id="availableHours"
                placeholder="e.g., 4, 6, 8"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={availableHours}
                onChange={(e) => setAvailableHours(e.target.value)}/>
            </div>
            <Button
              className="w-full font-bold py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Schedule'}
            </Button>
          </form>
          {studySchedule && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Generated Study Schedule:</h3>
              <Textarea
                rows={5}
                value={studySchedule}
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                readOnly/>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
