import { notFound } from 'next/navigation';
import Header from '@/components/header';
import TopicCard from '@/components/topic-card';
import { getCategoryBySlug } from '@/lib/topics';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={category.title}
        breadcrumbs={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: category.title, href: `/dashboard/categories/${category.slug}` },
        ]}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-6 flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <category.icon className="h-8 w-8" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
                <p className="mt-1 text-lg text-muted-foreground">{category.description}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </main>
    </div>
  );
}
