'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from 'react';
import {performanceAnalysis} from "@/ai/flows/performance-analysis";
import {toast} from "@/hooks/use-toast";

export default function PerformanceAnalysisPage() {
  const [testName, setTestName] = useState('');
  const [studentAnswers, setStudentAnswers] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [examType, setExamType] = useState('');
  const [weaknesses, setWeaknesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!testName || !studentAnswers || !correctAnswers || !examType) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await performanceAnalysis({
        testName: testName,
        studentAnswers: studentAnswers,
        correctAnswers: correctAnswers,
        examType: examType,
      });
      setWeaknesses(result.weaknesses);
      toast({
        title: 'Success',
        description: 'Performance analysis completed!',
      });
    } catch (error) {
      console.error('Error analyzing performance:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to analyze performance. Please try again.',
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
          <CardTitle className="text-3xl font-bold mb-4">Performance Analysis &amp; Weakness Identifier</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Analyze your performance on practice tests and identify areas of weakness.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="testName" className="block text-sm font-bold mb-2">
                Test Name
              </label>
              <Input
                type="text"
                id="testName"
                placeholder="e.g., Mock Test 1, Practice Exam"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="studentAnswers" className="block text-sm font-bold mb-2">
                Your Answers
              </label>
              <Textarea
                id="studentAnswers"
                rows={3}
                placeholder="Enter your answers separated by commas (e.g., A, B, C, D)"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={studentAnswers}
                onChange={(e) => setStudentAnswers(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="correctAnswers" className="block text-sm font-bold mb-2">
                Correct Answers
              </label>
              <Textarea
                id="correctAnswers"
                rows={3}
                placeholder="Enter the correct answers separated by commas (e.g., A, B, C, D)"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                value={correctAnswers}
                onChange={(e) => setCorrectAnswers(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="examType" className="block text-sm font-bold mb-2">
                Exam Type
              </label>
              <Select onValueChange={setExamType}>
                <SelectTrigger className="w-full shadow-sm focus-visible:ring-2 focus-visible:ring-primary">
                  <SelectValue placeholder="Select exam type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JEE">JEE</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full font-bold py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze Performance'}
            </Button>
          </form>
          {weaknesses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Identified Weaknesses:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
