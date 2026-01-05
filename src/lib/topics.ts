import { Atom, Beaker, Dna, FlaskConical, TestTube, Thermometer, Zap, Microscope, Scale, Pipette, Flame, Droplet, Recycle, Wind, HeartPulse, DnaIcon, BookOpen, Group, Diamond, GitBranch, Shield, Sliders, Columns, ChevronsUpDown, ScrollText } from 'lucide-react';
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
        progress: 0,
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
        progress: 0,
      },
      {
        slug: 'functional-groups',
        title: 'Functional Groups',
        category: 'Organic Chemistry',
        description: 'Identify and understand the reactivity of common functional groups in organic molecules.',
        icon: Beaker,
        progress: 0,
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
            slug: 'chemical-history',
            title: 'Chemical History',
            category: 'Inorganic Chemistry',
            description: 'Explore the historical development of key chemical concepts and discoveries.',
            icon: ScrollText,
            progress: 0,
        },
        {
            slug: 'elements-and-compounds',
            title: 'Elements & Compounds',
            category: 'Inorganic Chemistry',
            description: 'Learn about the building blocks of matter and how they combine.',
            icon: Atom,
            progress: 0,
        },
        {
            slug: 'quantum-chemistry',
            title: 'Quantum Chemistry',
            category: 'Inorganic Chemistry',
            description: 'Apply quantum mechanics to understand chemical systems and bonding.',
            icon: Atom,
            progress: 0,
        },
        {
            slug: 'chemical-bond',
            title: 'Chemical Bond',
            category: 'Inorganic Chemistry',
            description: 'Understand the forces that hold atoms together in molecules and compounds.',
            icon: GitBranch,
            progress: 0,
        },
        {
            slug: 'acid-and-basis',
            title: 'Acid & Basis',
            category: 'Inorganic Chemistry',
            description: 'Study the properties and reactions of acids and bases.',
            icon: TestTube,
            progress: 0,
        },
        {
            slug: 'bonding-theories',
            title: 'Bonding Theories',
            category: 'Inorganic Chemistry',
            description: 'Explore models like VSEPR, Valence Bond, and Molecular Orbital theory.',
            icon: BookOpen,
            progress: 0,
        },
        {
            slug: 'symmetry-and-group-theory',
            title: 'Symmetry & Group Theory',
            category: 'Inorganic Chemistry',
            description: 'Use symmetry to predict and explain chemical properties.',
            icon: Group,
            progress: 0,
        },
        {
            slug: 'solids',
            title: 'Solids',
            category: 'Inorganic Chemistry',
            description: 'Investigate the structure and properties of crystalline and amorphous solids.',
            icon: Diamond,
            progress: 0,
        },
        {
            slug: 'coordination-compounds',
            title: 'Coordination Compounds',
            category: 'Inorganic Chemistry',
            description: 'Learn about metal complexes and their unique bonding and properties.',
            icon: Sliders,
            progress: 0,
        },
        {
            slug: 'stoichiometry',
            title: 'Stoichiometry',
            category: 'Inorganic Chemistry',
            description: 'Master the quantitative relationships in chemical reactions.',
            icon: Scale,
            progress: 0,
        },
        {
            slug: 'chemical-equilibrium',
            title: 'Chemical Equilibrium',
            category: 'Inorganic Chemistry',
            description: 'Understand the state where reactant and product concentrations are constant.',
            icon: ChevronsUpDown,
            progress: 0,
        },
        {
            slug: 'acid-base-equilibria',
            title: 'Acid-Base Equilibria',
            category: 'Inorganic Chemistry',
            description: 'Focus on buffer solutions and the pH of salt solutions.',
            icon: TestTube,
            progress: 0,
        },
        {
            slug: 'solubility-equilibria',
            title: 'Solubility Equilibria',
            category: 'Inorganic Chemistry',
            description: 'Study the dissolution and precipitation of ionic compounds.',
            icon: Droplet,
            progress: 0,
        },
        {
            slug: 'redox-equilibria',
            title: 'Redox Equilibria',
            category: 'Inorganic Chemistry',
            description: 'Explore the equilibrium of oxidation-reduction reactions.',
            icon: Recycle,
            progress: 0,
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
        progress: 0,
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
