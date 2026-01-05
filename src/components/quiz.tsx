'use client';

import { useState, useEffect } from 'react';
import type { AdaptiveQuizOutput } from '@/ai/flows/adaptive-quiz-generation';
import type { AnswerFeedbackOutput } from '@/ai/flows/feedback-on-answers';
import { handleGenerateAdaptiveQuiz, handleGetAnswerFeedback } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Progress } from './ui/progress';

type QuizHistory = {
  question: string;
  answer: string;
  isCorrect: boolean;
};

const QUIZ_LENGTH = 5;

export default function Quiz({ topicTitle }: { topicTitle: string }) {
  const [question, setQuestion] = useState<AdaptiveQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedbackOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [history, setHistory] = useState<QuizHistory[]>([]);
  const { toast } = useToast();

  const fetchQuestion = async (currentHistory: QuizHistory[], currentDifficulty: 'easy' | 'medium' | 'hard') => {
    setIsLoading(true);
    setFeedback(null);
    setSelectedAnswer(null);
    setQuestion(null);

    const result = await handleGenerateAdaptiveQuiz({
      topic: topicTitle,
      difficulty: currentDifficulty,
      studentPreviousAnswers: currentHistory,
    });

    setIsLoading(false);
    if (result.success && result.data) {
      setQuestion(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load the next question. Please try again later.',
      });
    }
  };

  useEffect(() => {
    fetchQuestion([], 'medium');
  }, [topicTitle]);

  const handleSubmit = async () => {
    if (!selectedAnswer || !question) return;

    setIsSubmitting(true);
    const result = await handleGetAnswerFeedback(question.question, selectedAnswer, question.correctAnswer);
    setIsSubmitting(false);

    if (result.success && result.data) {
      setFeedback(result.data);
      const newHistoryItem = { question: question.question, answer: selectedAnswer, isCorrect: result.data.isCorrect };
      const updatedHistory = [...history, newHistoryItem];
      setHistory(updatedHistory);
      
      // Adjust difficulty
      const correctAnswers = updatedHistory.filter(h => h.isCorrect).length;
      if (correctAnswers > history.length / 2 && difficulty !== 'hard') {
        setDifficulty('hard');
      } else if (correctAnswers < history.length / 2 && difficulty !== 'easy') {
        setDifficulty('easy');
      } else {
        setDifficulty('medium');
      }

    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get feedback for your answer.',
      });
    }
  };

  const handleNextQuestion = () => {
    fetchQuestion(history, difficulty);
  };
  
  const score = history.filter(h => h.isCorrect).length;
  const quizProgress = (history.length / QUIZ_LENGTH) * 100;

  if (isLoading) {
    return (
        <div className="flex h-full items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="h-8 w-3/4 animate-pulse rounded-md bg-muted"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-6 w-full animate-pulse rounded-md bg-muted"></div>
                    <div className="h-6 w-5/6 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-6 w-full animate-pulse rounded-md bg-muted"></div>
                </CardContent>
            </Card>
      </div>
    );
  }

  if (history.length >= QUIZ_LENGTH) {
    return (
        <div className="flex h-full items-center justify-center p-4">
            <Card className="w-full max-w-2xl text-center">
                <CardHeader>
                    <Trophy className="mx-auto h-16 w-16 text-accent" />
                    <CardTitle className="mt-4 text-3xl">Quiz Complete!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl text-muted-foreground">You scored</p>
                    <p className="my-4 text-6xl font-bold">{score} / {QUIZ_LENGTH}</p>
                    <Button onClick={() => {
                        setHistory([]);
                        fetchQuestion([], 'medium');
                    }}>
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <div className='mb-4'>
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>Question {history.length + 1} of {QUIZ_LENGTH}</span>
            </div>
            <Progress value={quizProgress} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{question?.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer ?? ''}
              onValueChange={setSelectedAnswer}
              disabled={!!feedback}
            >
              {question?.possibleAnswers.map((answer, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-md border p-4 has-[:checked]:border-primary">
                  <RadioGroupItem value={answer} id={`r${index}`} />
                  <Label htmlFor={`r${index}`} className="flex-1 cursor-pointer text-base">{answer}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            {!feedback ? (
              <Button onClick={handleSubmit} disabled={!selectedAnswer || isSubmitting} className="w-full">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Answer'}
              </Button>
            ) : (
                <Button onClick={handleNextQuestion} className="w-full">Next Question</Button>
            )}

            {feedback && (
                <Alert variant={feedback.isCorrect ? 'default' : 'destructive'}>
                    {feedback.isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle>{feedback.isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
                    <AlertDescription>
                        {feedback.feedback}
                    </AlertDescription>
                </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
