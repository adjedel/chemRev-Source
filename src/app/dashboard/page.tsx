import Header from '@/components/header';
import TopicCard from '@/components/topic-card';
import { topics } from '@/lib/topics';

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      <Header
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }]}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Welcome Back!</h2>
          <p className="text-muted-foreground">
            Choose a topic to start reviewing or take a practice quiz.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </main>
    </div>
  );
}
