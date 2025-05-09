'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {personalizedRecommendations} from "@/ai/flows/personalized-recommendations";
import {toast} from "@/hooks/use-toast";

export default function PersonalizedRecommendationsPage() {
  const [questionnaireResponses, setQuestionnaireResponses] = useState('');
  const [careerRecommendations, setCareerRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!questionnaireResponses) {
      toast({
        title: 'Error',
        description: 'Please enter your questionnaire responses.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await personalizedRecommendations({
        questionnaireResponses: questionnaireResponses,
      });
      setCareerRecommendations(result.careerRecommendations);
      toast({
        title: 'Success',
        description: 'Career recommendations generated!',
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate career recommendations. Please try again.',
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
          <CardTitle className="text-3xl font-bold mb-4">Personalized Career Recommendations</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Based on your questionnaire responses, we provide personalized career recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="questionnaireResponses" className="block text-sm font-bold mb-2">
                Your Questionnaire Responses
              </label>
              <Textarea
                id="questionnaireResponses"
                rows={5}
                placeholder="Enter your questionnaire responses here"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={questionnaireResponses}
                onChange={(e) => setQuestionnaireResponses(e.target.value)}/>
            </div>
            <Button
              className="w-full font-bold py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Get Recommendations'}
            </Button>
          </form>
          {careerRecommendations && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Career Recommendations:</h3>
              <p className="text-gray-700">
                {careerRecommendations}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
