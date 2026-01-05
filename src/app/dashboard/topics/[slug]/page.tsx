'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/header';
import { getTopicBySlug } from '@/lib/topics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { generateFullQuiz } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export default function TopicPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const handleStartQuiz = async () => {
    setIsGenerating(true);
    const result = await generateFullQuiz({ topic: topic.title, difficulty });
    setIsGenerating(false);

    if (result.success && result.data) {
      // Save to localStorage to pass to the quiz page
      localStorage.setItem(`quiz-${topic.slug}`, JSON.stringify(result.data));
      router.push(`/dashboard/topics/${topic.slug}/quiz`);
    } else {
      toast({
        variant: 'destructive',
        title: 'Quiz Generation Failed',
        description: 'There was an error generating the quiz questions. Please try again.',
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        title={topic.title}
        breadcrumbs={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Categories', href: `/dashboard/categories` },
          { name: topic.category, href: `/dashboard/categories/${topic.category.toLowerCase().replace(/ /g, '-')}` },
          { name: topic.title, href: `/dashboard/topics/${topic.slug}` },
        ]}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <topic.icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{topic.description}</p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Start Quiz</CardTitle>
              </div>
              <CardDescription>
                Select a difficulty and start the quiz to test your knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Choose Difficulty</Label>
                <RadioGroup
                  value={difficulty}
                  onValueChange={(value: any) => setDifficulty(value)}
                  className="mt-2 grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="easy" id="easy" className="peer sr-only" />
                    <Label
                      htmlFor="easy"
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Easy
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                    <Label
                      htmlFor="medium"
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Medium
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="hard" id="hard" className="peer sr-only" />
                    <Label
                      htmlFor="hard"
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Hard
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleStartQuiz} disabled={isGenerating} size="lg" className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  'Start Quiz'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
