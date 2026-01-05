import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Category } from '@/lib/topics';
import { Badge } from './ui/badge';

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const totalProgress = category.topics.reduce((acc, topic) => acc + topic.progress, 0);
  const averageProgress = totalProgress / category.topics.length;

  return (
    <Link href={`/dashboard/categories/${category.slug}`}>
      <Card className="flex h-full transform flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <category.icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {category.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <Badge variant="outline">{category.topics.length} {category.topics.length === 1 ? 'Topic' : 'Topics'}</Badge>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(averageProgress)}%</span>
          </div>
          <Progress value={averageProgress} aria-label={`${category.title} progress ${averageProgress}%`} />
        </CardFooter>
      </Card>
    </Link>
  );
}
