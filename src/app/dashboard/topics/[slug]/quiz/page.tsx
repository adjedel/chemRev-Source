import { notFound } from 'next/navigation';
import Quiz from '@/components/quiz';
import { getTopicBySlug } from '@/lib/topics';
import Header from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function QuizPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
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
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/topics/${topic.slug}`}>
              <X />
              <span className="sr-only">End Quiz</span>
            </Link>
          </Button>
        }
      />
      <main className="flex-1 overflow-auto">
        <Quiz topicTitle={topic.title} />
      </main>
    </div>
  );
}
