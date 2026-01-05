import { Atom, Beaker, Dna, FlaskConical, TestTube, Thermometer, Zap, Microscope, Scale, Pipette, Flame, Droplet, Recycle, Wind, HeartPulse, DnaIcon } from 'lucide-react';
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

export type Category = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  topics: Topic[];
};

export const categories: Category[] = [
  {
    slug: 'physical-chemistry',
    title: 'Physical Chemistry',
    description: 'The study of macroscopic and particulate phenomena in chemical systems.',
    icon: Thermometer,
    topics: [
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
        slug: 'quantum-mechanics',
        title: 'Quantum Mechanics',
        category: 'Physical Chemistry',
        description: 'Explore the bizarre world of atoms and subatomic particles.',
        icon: Atom,
        progress: 0,
      },
    ],
  },
  {
    slug: 'organic-chemistry',
    title: 'Organic Chemistry',
    description: 'The study of the structure, properties, composition, reactions, and preparation of carbon-containing compounds.',
    icon: BenzeneRing,
    topics: [
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
        slug: 'spectroscopy',
        title: 'Spectroscopy',
        category: 'Organic Chemistry',
        description: 'Learn to determine the structure of organic compounds using spectroscopic methods.',
        icon: Microscope,
        progress: 0,
      },
    ],
  },
  {
    slug: 'inorganic-chemistry',
    title: 'Inorganic Chemistry',
    description: 'The study of the synthesis and behavior of inorganic and organometallic compounds.',
    icon: FlaskConical,
    topics: [
      {
        slug: 'stoichiometry',
        title: 'Stoichiometry',
        category: 'Inorganic Chemistry',
        description: 'Master the quantitative relationships between reactants and products in chemical reactions.',
        icon: Scale,
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
        slug: 'atomic-structure',
        title: 'Atomic Structure',
        category: 'Inorganic Chemistry',
        description: 'Understand the fundamental structure of atoms, including protons, neutrons, and electrons.',
        icon: Atom,
        progress: 50,
      },
    ],
  },
  {
    slug: 'biochemistry',
    title: 'Biochemistry',
    description: 'The study of chemical processes within and relating to living organisms.',
    icon: Dna,
    topics: [
      {
        slug: 'hydrocarbons',
        title: 'Hydrocarbons',
        category: 'Biochemistry',
        description: 'The fundamental building blocks of organic molecules and life.',
        icon: Flame,
        progress: 0,
      },
      {
        slug: 'lipids',
        title: 'Lipids',
        category: 'Biochemistry',
        description: 'Explore the structure and function of fats, oils, and membranes.',
        icon: Droplet,
        progress: 0,
      },
      {
        slug: 'amino-acids-and-proteins',
        title: 'Amino Acids & Proteins',
        category: 'Biochemistry',
        description: 'Learn the structures and properties of amino acids, the building blocks of proteins.',
        icon: Dna,
        progress: 0,
      },
      {
        slug: 'nucleic-acid',
        title: 'Nucleic Acid',
        category: 'Biochemistry',
        description: 'Understand DNA and RNA, the molecules that carry genetic information.',
        icon: DnaIcon,
        progress: 0,
      },
      {
        slug: 'enzymes',
        title: 'Enzymes',
        category: 'Biochemistry',
        description: 'Discover how enzymes catalyze biochemical reactions.',
        icon: Beaker,
        progress: 0,
      },
      {
        slug: 'cellular-respiration',
        title: 'Cellular Respiration',
        category: 'Biochemistry',
        description: 'The process of converting biochemical energy from nutrients into ATP.',
        icon: Zap,
        progress: 0,
      },
      {
        slug: 'pentose-phosphate-pathway',
        title: 'Pentose Phosphate Pathway',
        category: 'Biochemistry',
        description: 'A metabolic pathway parallel to glycolysis that generates NADPH and pentoses.',
        icon: Recycle,
        progress: 0,
      },
      {
        slug: 'glycogen-metabolism',
        title: 'Glycogen Metabolism',
        category: 'Biochemistry',
        description: 'The regulation of glycogen synthesis and breakdown.',
        icon: Wind,
        progress: 0,
      },
      {
        slug: 'gluconeogenesis',
        title: 'Gluconeogenesis',
        category: 'Biochemistry',
        description: 'The synthesis of glucose from non-carbohydrate sources.',
        icon: Recycle,
        progress: 0,
      },
      {
        slug: 'fatty-acid-catabolism',
        title: 'Fatty Acid Catabolism',
        category: 'Biochemistry',
        description: 'The breakdown of fatty acids to generate energy.',
        icon: Flame,
        progress: 0,
      },
      {
        slug: 'aa-oxidation-and-urea-cycle',
        title: 'AA Oxidation and Urea Cycle',
        category: 'Biochemistry',
        description: 'The breakdown of amino acids and the excretion of nitrogenous waste.',
        icon: Recycle,
        progress: 0,
      },
      {
        slug: 'central-dogma',
        title: 'Central Dogma',
        category: 'Biochemistry',
        description: 'The flow of genetic information from DNA to RNA to protein.',
        icon: HeartPulse,
        progress: 0,
      },
    ],
  },
  {
    slug: 'analytical-chemistry',
    title: 'Analytical Chemistry',
    description: 'The analysis of material samples to gain an understanding of their chemical composition and structure.',
    icon: TestTube,
    topics: [
      {
        slug: 'acids-and-bases',
        title: 'Acids and Bases',
        category: 'Analytical Chemistry',
        description: 'Delve into pH, pKa, buffers, and titration curves for acid-base chemistry.',
        icon: TestTube,
        progress: 90,
      },
      {
        slug: 'titrations',
        title: 'Titrations',
        category: 'Analytical Chemistry',
        description: 'Master the technique of titration to determine the concentration of a solution.',
        icon: Pipette,
        progress: 0,
      },
    ],
  },
];


export const getCategoryBySlug = (slug: string) => {
  return categories.find(category => category.slug === slug);
};

export const getTopicBySlug = (slug: string) => {
    for (const category of categories) {
        const topic = category.topics.find(topic => topic.slug === slug);
        if (topic) {
            return topic;
        }
    }
    return undefined;
};
