import { Atom, Beaker, LayoutDashboard, TestTube, Thermometer, Zap } from 'lucide-react';
import { BenzeneRing } from '@/components/icons';
import type { LucideIcon } from 'lucide-react';

export type Topic = {
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  progress: number;
};

export const topics: Topic[] = [
  {
    slug: 'stoichiometry',
    title: 'Stoichiometry',
    category: 'Fundamentals',
    description: 'Master the quantitative relationships between reactants and products in chemical reactions.',
    icon: Atom,
    progress: 75,
  },
  {
    slug: 'chemical-reactions',
    title: 'Chemical Reactions',
    category: 'Fundamentals',
    description: 'Explore types of chemical reactions, balancing equations, and reaction kinetics.',
    icon: Beaker,
    progress: 50,
  },
  {
    slug: 'thermodynamics',
    title: 'Thermodynamics',
    category: 'Physical Chemistry',
    description: 'Understand energy, heat, and work in chemical systems with the laws of thermodynamics.',
    icon: Thermometer,
    progress: 25,
  },
  {
    slug: 'acids-and-bases',
    title: 'Acids and Bases',
    category: 'Physical Chemistry',
    description: 'Delve into pH, pKa, buffers, and titration curves for acid-base chemistry.',
    icon: TestTube,
    progress: 90,
  },
  {
    slug: 'organic-chemistry',
    title: 'Organic Chemistry',
    category: 'Advanced Topics',
    description: 'An introduction to the structure, properties, and reactions of organic compounds.',
    icon: BenzeneRing,
    progress: 10,
  },
  {
    slug: 'electrochemistry',
    title: 'Electrochemistry',
    category: 'Advanced Topics',
    description: 'Learn about redox reactions, galvanic cells, and electrolysis.',
    icon: Zap,
    progress: 0,
  },
];

export const getTopicBySlug = (slug: string) => {
  return topics.find(topic => topic.slug === slug);
};
