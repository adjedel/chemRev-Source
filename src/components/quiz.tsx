'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AdaptiveQuizOutput } from '@/ai/flows/adaptive-quiz-generation';
import type { AnswerFeedbackOutput } from '@/ai/flows/feedback-on-answers';
import { handleGetAnswerFeedback } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Progress } from './ui/progress';
import type { Topic } from '@/lib/topics';

type QuizHistoryItem = {
  question: string;
  answer: string;
  isCorrect: boolean;
};

type QuizProps = {
  topic: Topic;
  questions: AdaptiveQuizOutput[];
};

export default function Quiz({ topic, questions }: QuizProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedbackOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { toast } = useToast();

  const QUIZ_LENGTH = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (!selectedAnswer || !currentQuestion) return;

    setIsSubmitting(true);
    const result = await handleGetAnswerFeedback(
      currentQuestion.question,
      selectedAnswer,
      currentQuestion.correctAnswer
    );
    setIsSubmitting(false);

    if (result.success && result.data) {
      setFeedback(result.data);
      const newHistoryItem = {
        question: currentQuestion.question,
        answer: selectedAnswer,
        isCorrect: result.data.isCorrect,
      };
      setHistory((prev) => [...prev, newHistoryItem]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get feedback for your answer.',
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_LENGTH - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setIsQuizComplete(true);
      // Clean up localStorage once the quiz is officially complete
      localStorage.removeItem(`quiz-${topic.slug}`);
    }
  };

  const handleTryAgain = () => {
    // Navigate back to the topic page to start a new quiz
    router.push(`/dashboard/topics/${topic.slug}`);
  };

  const score = history.filter((h) => h.isCorrect).length;
  const quizProgress = ((history.length) / QUIZ_LENGTH) * 100;
  
  if (isQuizComplete) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-accent" />
            <CardTitle className="mt-4 text-3xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-muted-foreground">You scored</p>
            <p className="my-4 text-6xl font-bold">
              {score} / {QUIZ_LENGTH}
            </p>
            <Button onClick={handleTryAgain}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>
              Question {currentQuestionIndex + 1} of {QUIZ_LENGTH}
            </span>
          </div>
          <Progress value={quizProgress} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer ?? ''}
              onValueChange={setSelectedAnswer}
              disabled={!!feedback}
            >
              {currentQuestion?.possibleAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 rounded-md border p-4 has-[:checked]:border-primary"
                >
                  <RadioGroupItem value={answer} id={`r${index}`} />
                  <Label
                    htmlFor={`r${index}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            {!feedback ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Submit Answer'
                )}
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="w-full">
                {currentQuestionIndex === QUIZ_LENGTH - 1
                  ? 'Finish Quiz'
                  : 'Next Question'}
              </Button>
            )}

            {feedback && (
              <Alert
                variant={feedback.isCorrect ? 'default' : 'destructive'}
              >
                {feedback.isCorrect ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {feedback.isCorrect ? 'Correct!' : 'Incorrect'}
                </AlertTitle>
                <AlertDescription>{feedback.feedback}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}