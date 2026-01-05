'use client';
import { notFound, useRouter, useParams } from 'next/navigation';
import Quiz from '@/components/quiz';
import { getTopicBySlug } from '@/lib/topics';
import Header from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AdaptiveQuizOutput } from '@/ai/flows/adaptive-quiz-generation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [questions, setQuestions] = useState<AdaptiveQuizOutput[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const topic = getTopicBySlug(slug);

  useEffect(() => {
    if (!slug) return;
    const storedQuestions = localStorage.getItem(`quiz-${slug}`);
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions);
        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
        } else {
          setError('No quiz questions found. Please generate them first.');
        }
      } catch (e) {
        setError('Failed to load quiz questions. Please try generating them again.');
      }
      // Optional: Clean up localStorage after loading
      // localStorage.removeItem(`quiz-${slug}`);
    } else {
      setError('No quiz questions found. Please generate them first.');
    }
  }, [slug]);


  if (!topic) {
    notFound();
  }

  const handleEndQuiz = () => {
    // Clean up localStorage when the user manually ends the quiz
    localStorage.removeItem(`quiz-${slug}`);
    router.push(`/dashboard/topics/${topic.slug}`);
  };
  
  if (error) {
    return (
      <div className="flex h-svh flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-lg text-center">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="mt-4">Quiz Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-6 text-muted-foreground">{error}</p>
                <Button asChild>
                    <Link href={`/dashboard/topics/${topic.slug}`}>Go Back</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-svh flex-col bg-background">
       <Header
        title={`${topic.title} Quiz`}
        breadcrumbs={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Categories', href: `/dashboard/categories` },
          { name: topic.category, href: `/dashboard/categories/${topic.category.toLowerCase().replace(/ /g, '-')}` },
          { name: topic.title, href: `/dashboard/topics/${topic.slug}` },
          { name: 'Quiz', href: `/dashboard/topics/${topic.slug}/quiz` },
        ]}
        action={
          <Button variant="ghost" size="icon" onClick={handleEndQuiz}>
            <X />
            <span className="sr-only">End Quiz</span>
          </Button>
        }
      />
      <main className="flex-1 overflow-auto">
        {questions ? <Quiz topic={topic} questions={questions} /> : (
            <div className="flex h-full items-center justify-center p-4">
                <Card className="w-full max-w-2xl animate-pulse">
                    <CardHeader>
                        <div className="h-8 w-3/4 rounded-md bg-muted"></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-6 w-full rounded-md bg-muted"></div>
                        <div className="h-6 w-5/6 rounded-md bg-muted"></div>
                        <div className="h-6 w-full rounded-md bg-muted"></div>
                    </CardContent>
                </Card>
            </div>
        )}
      </main>
    </div>
  );
}
