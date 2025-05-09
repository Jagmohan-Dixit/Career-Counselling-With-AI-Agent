'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';

export default function QuestionnairePage() {
  const [questionnaireResponses, setQuestionnaireResponses] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Questionnaire Responses:', questionnaireResponses);
  };

  return (
    <div className="container relative mx-auto mt-24 max-w-5xl p-8 rounded-lg shadow-xl overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 blur-2xl"></div>
      <Card className="relative z-10 bg-transparent text-foreground shadow-none">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-3xl font-bold mb-4">Interactive Questionnaire</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Answer the following questions to help us personalize your career recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question1" className="block text-sm font-bold mb-2">
                What subjects do you enjoy studying the most?
              </label>
              <Textarea
                id="question1"
                rows={3}
                placeholder="e.g., Physics, Chemistry, Biology, Mathematics"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={questionnaireResponses}
                onChange={(e) => setQuestionnaireResponses(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="question2" className="block text-sm font-bold mb-2">
                What are your strengths in academics?
              </label>
              <Textarea
                id="question2"
                rows={3}
                placeholder="e.g., Problem-solving, Critical thinking, Memorization"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={questionnaireResponses}
                onChange={(e) => setQuestionnaireResponses(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="question3" className="block text-sm font-bold mb-2">
                What are your career aspirations?
              </label>
              <Textarea
                id="question3"
                rows={3}
                placeholder="e.g., Engineering, Medicine, Research"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={questionnaireResponses}
                onChange={(e) => setQuestionnaireResponses(e.target.value)}/>
            </div>
            <Button className="w-full font-bold py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary">
              Submit Questionnaire
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
