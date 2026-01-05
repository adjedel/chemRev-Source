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
import { Button } from '@/components/ui/button';
import type { Topic } from '@/lib/topics';
import { ArrowRight } from 'lucide-react';

type TopicCardProps = {
  topic: Topic;
};

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link href={`/dashboard/topics/${topic.slug}`}>
      <Card className="flex h-full transform flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <topic.icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>{topic.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {topic.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{topic.progress}%</span>
          </div>
          <Progress value={topic.progress} aria-label={`${topic.title} progress ${topic.progress}%`} />
        </CardFooter>
      </Card>
    </Link>
  );
}
