import Header from '@/components/header';
import CategoryCard from '@/components/category-card';
import { categories } from '@/lib/topics';

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
            Choose a category to start reviewing or take a practice quiz.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
