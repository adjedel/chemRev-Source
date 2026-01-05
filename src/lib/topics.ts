import { Atom, Beaker, Dna, FlaskConical, TestTube, Thermometer, Zap } from 'lucide-react';
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
    slug: 'thermodynamics',
    title: 'Thermodynamics',
    category: 'Physical Chemistry',
    description: 'Understand energy, heat, and work in chemical systems with the laws of thermodynamics.',
    icon: Thermometer,
    progress: 25,
  },
  {
    slug: 'electrochemistry',
    title: 'Electrochemistry',
    category: 'Physical Chemistry',
    description: 'Learn about redox reactions, galvanic cells, and electrolysis.',
    icon: Zap,
    progress: 0,
  },
  {
    slug: 'organic-structures',
    title: 'Organic Structures',
    category: 'Organic Chemistry',
    description: 'An introduction to the structure, properties, and reactions of organic compounds.',
    icon: BenzeneRing,
    progress: 10,
  },
  {
    slug: 'functional-groups',
    title: 'Functional Groups',
    category: 'Organic Chemistry',
    description: 'Identify and understand the reactivity of common functional groups in organic molecules.',
    icon: Beaker,
    progress: 5,
  },
  {
    slug: 'stoichiometry',
    title: 'Stoichiometry',
    category: 'Inorganic Chemistry',
    description: 'Master the quantitative relationships between reactants and products in chemical reactions.',
    icon: Atom,
    progress: 75,
  },
  {
    slug: 'reaction-types',
    title: 'Reaction Types',
    category: 'Inorganic Chemistry',
    description: 'Explore synthesis, decomposition, single and double displacement reactions.',
    icon: FlaskConical,
    progress: 40,
  },
  {
    slug: 'amino-acids',
    title: 'Amino Acids & Proteins',
    category: 'Biochemistry',
    description: 'Learn the structures and properties of amino acids, the building blocks of proteins.',
    icon: Dna,
    progress: 0,
  },
  {
    slug: 'acids-and-bases',
    title: 'Acids and Bases',
    category: 'Analytical Chemistry',
    description: 'Delve into pH, pKa, buffers, and titration curves for acid-base chemistry.',
    icon: TestTube,
    progress: 90,
  },
];

export const getTopicBySlug = (slug: string) => {
  return topics.find(topic => topic.slug === slug);
};
