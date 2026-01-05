import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import { getTopicBySlug } from '@/lib/topics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sparkles } from 'lucide-react';
import PracticeQuestions from '@/components/practice-questions';

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={topic.title}
        breadcrumbs={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: topic.title, href: `/dashboard/topics/${topic.slug}` },
        ]}
        action={
          <Button asChild>
            <Link href={`/dashboard/topics/${topic.slug}/quiz`}>
              <BrainCircuit />
              Start Quiz
            </Link>
          </Button>
        }
      />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
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
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <CardTitle>Practice Problems</CardTitle>
              </div>
              <CardDescription>
                Generate AI-powered practice questions to test your knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PracticeQuestions topic={topic.title} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
