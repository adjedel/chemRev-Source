'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { handleGeneratePracticeQuestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

type PracticeQuestionsProps = {
  topic: string;
};

export default function PracticeQuestions({ topic }: PracticeQuestionsProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    setQuestions([]);
    const result = await handleGeneratePracticeQuestions(topic);
    setIsLoading(false);

    if (result.success && result.data?.questions) {
      setQuestions(result.data.questions);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <div>
      <Button onClick={onGenerate} disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
        Generate Questions
      </Button>

      {isLoading && (
        <div className="mt-4 space-y-2">
            <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
            <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
            <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
        </div>
      )}

      {questions.length > 0 && (
        <Card className="mt-6">
            <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                {questions.map((q, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{q}</AccordionTrigger>
                    <AccordionContent>
                        Answer will be revealed in quiz mode. Use these questions to test your recall!
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
