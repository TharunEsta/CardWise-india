export type CardCategory =
  | "cashback"
  | "travel"
  | "lounge"
  | "fuel"
  | "rewards"
  | "shopping"
  | "lifetime-free"
  | "beginners"
  | "premium";

export interface Bank {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  accent: string;
}

export interface CreditCard {
  id: string;
  bankId: string;
  bankName: string;
  name: string;
  slug: string;
  image: string;
  summary: string;
  bestFor: string;
  annualFee: number;
  joiningFee: number;
  rewardRate: string;
  rewardType: string;
  loungeAccess: string;
  forexMarkup: string;
  welcomeBenefit: string;
  fuelWaiver: string;
  eligibilitySummary: string;
  rating: number;
  categories: CardCategory[];
  highlightStats: {
    cashback: string;
    travel: string;
    feeWaiver: string;
  };
  benefits: Array<{
    category: string;
    title: string;
    description: string;
  }>;
  fees: Array<{
    feeType: string;
    amount: string;
    notes: string;
  }>;
  eligibility: {
    ageRequirement: string;
    incomeRequirement: string;
    creditScoreRecommendation: string;
    employmentType: string;
  };
  documents: string[];
  pros: string[];
  cons: string[];
  whoShouldGet: string[];
  whoShouldAvoid: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface SearchItem {
  id: string;
  title: string;
  href: string;
  type: "bank" | "card" | "category" | "guide";
  subtitle: string;
}
