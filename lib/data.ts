import { Bank, CardCategory, CreditCard, Guide, Review, SearchItem } from "@/lib/types";
import { slugify } from "@/lib/utils";

type CardSeed = {
  bankName: string;
  program: string;
  summary: string;
  bestFor: string;
  annualFee: number;
  joiningFee: number;
  rewardRate: string;
  rewardType: string;
  categories: CardCategory[];
  rating: number;
  interestNote: string;
};

const bankAccentMap: Record<string, string> = {
  "HDFC Bank": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "State Bank of India (SBI)": "from-amber-300/50 via-orange-500/20 to-transparent",
  "ICICI Bank": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "Axis Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "Kotak Mahindra Bank": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "IDFC FIRST Bank": "from-amber-300/50 via-orange-500/20 to-transparent",
  "RBL Bank": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "Federal Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "American Express": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "Union Bank of India": "from-amber-300/50 via-orange-500/20 to-transparent",
  "Karur Vysya Bank": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "AU Small Finance Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "Bank of Baroda": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "Standard Chartered Bank": "from-amber-300/50 via-orange-500/20 to-transparent",
  "YES BANK": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "DCB Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "DBS Bank India": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "HSBC India": "from-amber-300/50 via-orange-500/20 to-transparent",
  "Indian Bank": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "UCO Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "Jupiter x CSB Bank": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "IndusInd Bank": "from-amber-300/50 via-orange-500/20 to-transparent",
  "Canara Bank": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "Indian Overseas Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "South Indian Bank": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "SBM Bank India": "from-amber-300/50 via-orange-500/20 to-transparent",
  "Bank of India": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "Bank of Maharashtra": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "Jammu & Kashmir Bank": "from-cyan-400/60 via-sky-500/30 to-transparent",
  "CSB Bank": "from-amber-300/50 via-orange-500/20 to-transparent",
  "Equitas Small Finance Bank": "from-fuchsia-400/50 via-violet-500/20 to-transparent",
  "Suryoday Small Finance Bank": "from-emerald-400/50 via-teal-500/20 to-transparent",
  "ESAF Small Finance Bank": "from-cyan-400/60 via-sky-500/30 to-transparent"
};

const cardSeeds: CardSeed[] = [
  {
    bankName: "HDFC Bank",
    program: "Millennia Credit Card",
    summary: "PDF-backed pricing entry positioned around cashback on select online merchants.",
    bestFor: "Cashback / Shopping",
    annualFee: 1000,
    joiningFee: 1000,
    rewardRate: "5% cashback on select online merchants",
    rewardType: "Cashback",
    categories: ["cashback", "shopping"],
    rating: 4.5,
    interestNote: "Verify on official charges page"
  },
  {
    bankName: "HDFC Bank",
    program: "MoneyBack+ Credit Card",
    summary: "PDF-backed pricing entry positioned around accelerated rewards on select spends.",
    bestFor: "Beginner / Rewards",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: "Accelerated rewards on select spends",
    rewardType: "Reward points",
    categories: ["rewards", "beginners"],
    rating: 4.1,
    interestNote: "Verify officially"
  },
  {
    bankName: "HDFC Bank",
    program: "Regalia Credit Card",
    summary: "PDF-backed travel and premium HDFC card reference with lounge and lifestyle positioning.",
    bestFor: "Travel / Premium",
    annualFee: 2500,
    joiningFee: 2500,
    rewardRate: "Travel rewards, lounge access, and lifestyle value",
    rewardType: "Reward points",
    categories: ["travel", "premium", "lounge"],
    rating: 4.6,
    interestNote: "Verify officially"
  },
  {
    bankName: "HDFC Bank",
    program: "Diners Club Black Credit Card",
    summary: "PDF-backed HDFC premium rewards and travel flagship reference.",
    bestFor: "Premium",
    annualFee: 10000,
    joiningFee: 10000,
    rewardRate: "Premium rewards, lounge access, and travel privileges",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.8,
    interestNote: "Verify officially"
  },
  {
    bankName: "State Bank of India (SBI)",
    program: "SimplyCLICK SBI Card",
    summary: "PDF-backed SBI online shopping rewards card reference.",
    bestFor: "Online Shopping",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "Online shopping rewards",
    rewardType: "Reward points",
    categories: ["shopping", "rewards"],
    rating: 4.2,
    interestNote: "Verify on official SBI MITC"
  },
  {
    bankName: "State Bank of India (SBI)",
    program: "SimplySAVE SBI Card",
    summary: "PDF-backed SBI everyday rewards card reference for grocery, dining, and movies.",
    bestFor: "Everyday Rewards",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "Grocery, dining, and movies rewards",
    rewardType: "Reward points",
    categories: ["rewards", "beginners"],
    rating: 4.1,
    interestNote: "Verify on official SBI MITC"
  },
  {
    bankName: "State Bank of India (SBI)",
    program: "SBI Cashback Card",
    summary: "PDF-backed SBI cashback card reference centered on online spending.",
    bestFor: "Cashback",
    annualFee: 999,
    joiningFee: 999,
    rewardRate: "5% cashback on online spending",
    rewardType: "Cashback",
    categories: ["cashback", "shopping"],
    rating: 4.5,
    interestNote: "Verify officially"
  },
  {
    bankName: "State Bank of India (SBI)",
    program: "SBI Card Elite",
    summary: "PDF-backed SBI premium lifestyle card reference with movies, lounge, and travel positioning.",
    bestFor: "Premium",
    annualFee: 4999,
    joiningFee: 4999,
    rewardRate: "Movies, lounge, travel, and lifestyle privileges",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.6,
    interestNote: "Verify officially"
  },
  {
    bankName: "ICICI Bank",
    program: "Amazon Pay ICICI Bank Credit Card",
    summary: "PDF-backed ICICI cashback co-branded card reference.",
    bestFor: "Cashback / Co-branded",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "5% Amazon cashback for Prime and 3% for non-Prime",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "lifetime-free"],
    rating: 4.6,
    interestNote: "Verify officially"
  },
  {
    bankName: "ICICI Bank",
    program: "Coral Credit Card",
    summary: "PDF-backed ICICI lifestyle card reference with movie and dining positioning.",
    bestFor: "Lifestyle",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: "Dining, movies, and lifestyle offers",
    rewardType: "Reward points",
    categories: ["rewards", "shopping"],
    rating: 4.2,
    interestNote: "3.75% per month noted on official Coral page"
  },
  {
    bankName: "ICICI Bank",
    program: "Rubyx Credit Card",
    summary: "PDF-backed ICICI premium lifestyle reference.",
    bestFor: "Premium Lifestyle",
    annualFee: 2000,
    joiningFee: 3000,
    rewardRate: "Lifestyle and travel rewards",
    rewardType: "Reward points",
    categories: ["premium", "travel", "rewards"],
    rating: 4.4,
    interestNote: "Verify officially"
  },
  {
    bankName: "ICICI Bank",
    program: "Emeralde Credit Card",
    summary: "PDF-backed ICICI premium travel and lounge reference.",
    bestFor: "Premium",
    annualFee: 12000,
    joiningFee: 12000,
    rewardRate: "Premium travel, lounge, and membership-led benefits",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge"],
    rating: 4.7,
    interestNote: "Verify officially"
  },
  {
    bankName: "Axis Bank",
    program: "ACE Credit Card",
    summary: "PDF-backed Axis cashback card reference for bills and digital spending.",
    bestFor: "Cashback",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "Cashback on bills and digital spends",
    rewardType: "Cashback",
    categories: ["cashback", "shopping"],
    rating: 4.3,
    interestNote: "Verify officially"
  },
  {
    bankName: "Axis Bank",
    program: "Flipkart Axis Bank Credit Card",
    summary: "PDF-backed Axis shopping cashback card reference.",
    bestFor: "Shopping",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: "Shopping cashback",
    rewardType: "Cashback",
    categories: ["cashback", "shopping"],
    rating: 4.4,
    interestNote: "Verify officially"
  },
  {
    bankName: "Axis Bank",
    program: "Atlas Credit Card",
    summary: "PDF-backed Axis travel card reference centered on miles, flights, and hotels.",
    bestFor: "Travel",
    annualFee: 5000,
    joiningFee: 5000,
    rewardRate: "Miles on flights, hotels, and travel spending",
    rewardType: "Miles",
    categories: ["travel", "premium", "lounge"],
    rating: 4.7,
    interestNote: "Verify officially"
  },
  {
    bankName: "Kotak Mahindra Bank",
    program: "League Platinum Credit Card",
    summary: "PDF-backed Kotak entry card reference.",
    bestFor: "Entry",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "Basic rewards and beginner-card positioning",
    rewardType: "Reward points",
    categories: ["beginners", "rewards"],
    rating: 4.0,
    interestNote: "Verify officially"
  },
  {
    bankName: "Kotak Mahindra Bank",
    program: "PVR Kotak Credit Card",
    summary: "PDF-backed Kotak entertainment card reference.",
    bestFor: "Entertainment",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "Movie benefits with PVR-led positioning",
    rewardType: "Reward points / vouchers",
    categories: ["shopping", "rewards"],
    rating: 4.1,
    interestNote: "Verify officially"
  },
  {
    bankName: "IDFC FIRST Bank",
    program: "FIRST Millennia Credit Card",
    summary: "PDF-backed IDFC FIRST lifetime-free rewards card reference.",
    bestFor: "LTF / Rewards",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Lifetime free rewards card positioning",
    rewardType: "Reward points",
    categories: ["lifetime-free", "rewards", "beginners"],
    rating: 4.3,
    interestNote: "Verify officially"
  },
  {
    bankName: "IDFC FIRST Bank",
    program: "FIRST Select Credit Card",
    summary: "PDF-backed IDFC FIRST premium starter card reference.",
    bestFor: "Premium Starter",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Premium starter positioning with lounge and rewards",
    rewardType: "Reward points",
    categories: ["premium", "lounge", "rewards", "lifetime-free"],
    rating: 4.4,
    interestNote: "Verify officially"
  },
  {
    bankName: "IDFC FIRST Bank",
    program: "FIRST WOW! Credit Card",
    summary: "PDF-backed IDFC FIRST secured and zero-forex beginner card reference.",
    bestFor: "Secured / Beginner",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Secured beginner card with zero-forex positioning",
    rewardType: "Reward points",
    categories: ["beginners", "lifetime-free", "travel"],
    rating: 4.5,
    interestNote: "Verify officially"
  },
  {
    bankName: "RBL Bank",
    program: "World Safari Credit Card",
    summary: "PDF-backed RBL travel card reference.",
    bestFor: "Travel",
    annualFee: 3000,
    joiningFee: 3000,
    rewardRate: "0% forex, lounge, and travel positioning",
    rewardType: "Reward points / travel value",
    categories: ["travel", "lounge", "premium"],
    rating: 4.5,
    interestNote: "Verify officially"
  },
  {
    bankName: "RBL Bank",
    program: "ShopRite Credit Card",
    summary: "PDF-backed RBL grocery and supermarket rewards reference.",
    bestFor: "Cashback / Grocery",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: "Grocery and supermarket rewards",
    rewardType: "Reward points / cashback",
    categories: ["cashback", "shopping"],
    rating: 4.1,
    interestNote: "Verify officially"
  },
  {
    bankName: "Federal Bank",
    program: "Scapia Federal Credit Card",
    summary: "PDF-backed Federal travel card reference with zero-forex positioning.",
    bestFor: "Travel / LTF",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Travel positioning with zero-forex USP",
    rewardType: "Reward points / travel value",
    categories: ["travel", "lifetime-free"],
    rating: 4.5,
    interestNote: "Verify officially"
  },
  {
    bankName: "American Express",
    program: "Membership Rewards Credit Card",
    summary: "PDF-backed Amex rewards card reference.",
    bestFor: "Rewards",
    annualFee: 4500,
    joiningFee: 5000,
    rewardRate: "Premium rewards and travel positioning",
    rewardType: "Membership Rewards points",
    categories: ["rewards", "premium", "travel"],
    rating: 4.5,
    interestNote: "Verify officially"
  },
  {
    bankName: "American Express",
    program: "SmartEarn Credit Card",
    summary: "PDF-backed Amex entry rewards and online shopping reference.",
    bestFor: "Beginner / Rewards",
    annualFee: 495,
    joiningFee: 495,
    rewardRate: "Entry rewards and online shopping offers",
    rewardType: "Membership Rewards points",
    categories: ["beginners", "shopping", "rewards"],
    rating: 4.1,
    interestNote: "Verify officially"
  },
  {
    bankName: "American Express",
    program: "Platinum Travel Credit Card",
    summary: "PDF-backed Amex travel milestones reference.",
    bestFor: "Travel",
    annualFee: 5000,
    joiningFee: 3500,
    rewardRate: "Travel milestones and rewards",
    rewardType: "Membership Rewards points",
    categories: ["travel", "premium", "rewards"],
    rating: 4.6,
    interestNote: "Verify officially"
  },
  {
    bankName: "Union Bank of India",
    program: "RuPay Platinum Credit Card",
    summary: "Official Union Bank card with Nil joining fee, annual fee, fuel surcharge reimbursement, and RuPay-led everyday usage features.",
    bestFor: "Entry / Rewards",
    annualFee: 350,
    joiningFee: 0,
    rewardRate: "1% fuel surcharge reimbursement up to Rs. 100 per month with RuPay merchant offers",
    rewardType: "Rewards and RuPay offers",
    categories: ["beginners", "rewards", "fuel"],
    rating: 4.0,
    interestNote: "Union Bank fee page shows 3% monthly revolving charge and 3% forex markup"
  },
  {
    bankName: "Union Bank of India",
    program: "RuPay Select Credit Card",
    summary: "Official Union Bank Select variant with Nil joining fee, higher annual fee tier, and lifestyle-led RuPay Select positioning.",
    bestFor: "Lifestyle / Lounge",
    annualFee: 550,
    joiningFee: 0,
    rewardRate: "RuPay Select privileges with 1% fuel surcharge reimbursement up to Rs. 100 per month",
    rewardType: "Rewards and RuPay Select privileges",
    categories: ["lounge", "rewards", "premium"],
    rating: 4.2,
    interestNote: "Union Bank fee page shows 3% monthly revolving charge and 3% forex markup"
  },
  {
    bankName: "Karur Vysya Bank",
    program: "KVB Platinum Credit Card",
    summary: "Official KVB Platinum card with free joining, annual fee, fuel surcharge waiver, and travel-linked accelerated rewards.",
    bestFor: "Entry / Rewards",
    annualFee: 599,
    joiningFee: 0,
    rewardRate: "2 reward points per Rs. 150 with 1.5x rewards on restaurants, medical, books, insurance, rail tickets, movie tickets, and car rentals",
    rewardType: "Reward points",
    categories: ["beginners", "rewards", "fuel"],
    rating: 4.1,
    interestNote: "KVB lists finance charges of 3.25% per month or 39% per annum"
  },
  {
    bankName: "Karur Vysya Bank",
    program: "KVB Honour Credit Card",
    summary: "Official KVB Honour card with free joining, domestic lounge access, and stronger travel and spend rewards.",
    bestFor: "Lifestyle / Rewards",
    annualFee: 999,
    joiningFee: 0,
    rewardRate: "3 reward points per Rs. 150 with 4x rewards on domestic and international travel, hotels, and air tickets",
    rewardType: "Reward points",
    categories: ["rewards", "lounge", "travel"],
    rating: 4.3,
    interestNote: "KVB lists finance charges of 3.25% per month or 39% per annum"
  },
  {
    bankName: "AU Small Finance Bank",
    program: "LIT Credit Card",
    summary: "Official AU customizable card with no joining or annual fee and optional paid feature packs for lounge, rewards, cashback, and memberships.",
    bestFor: "Flexible / Lifetime Free",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Custom feature-based rewards, cashback, lounge access, and memberships selected inside the AU app",
    rewardType: "Configurable rewards",
    categories: ["lifetime-free", "beginners", "shopping"],
    rating: 4.4,
    interestNote: "AU schedule of charges says fuel surcharge waiver does not apply on LIT and feature pricing is separate"
  },
  {
    bankName: "AU Small Finance Bank",
    program: "Zenith Credit Card",
    summary: "Official AU premium card with strong rewards on dining and international spends, lounge access, and lower forex markup.",
    bestFor: "Premium Travel",
    annualFee: 7999,
    joiningFee: 7999,
    rewardRate: "20 reward points per Rs. 100 on dining, 10 on international, grocery, and department stores, and 5 on other retail spends",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.7,
    interestNote: "AU schedule of charges lists Zenith joining and annual fee at Rs. 7,999"
  },
  {
    bankName: "Bank of Baroda",
    program: "BOBCARD ETERNA",
    summary: "Official Bank of Baroda premium card with milestone rewards, dining and travel positioning, and fuel surcharge waiver.",
    bestFor: "Premium Lifestyle",
    annualFee: 2499,
    joiningFee: 2499,
    rewardRate: "10,000 bonus reward points on early spends and 3 reward points per Rs. 100 on other categories",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.5,
    interestNote: "Official Eterna page lists first year and annual fee at Rs. 2,499"
  },
  {
    bankName: "Bank of Baroda",
    program: "BOBCARD EASY",
    summary: "Official Bank of Baroda entry card with reward acceleration, fuel surcharge waiver, and fee-waiver positioning.",
    bestFor: "Entry / Shopping",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "5 reward points per Rs. 100 on online shopping, dining, and utility bills",
    rewardType: "Reward points",
    categories: ["beginners", "shopping", "rewards", "fuel"],
    rating: 4.1,
    interestNote: "Official Easy page positions it as lifetime free based on spend-linked reversal and waiver criteria"
  },
  {
    bankName: "Standard Chartered Bank",
    program: "Smart Credit Card",
    summary: "Official Standard Chartered cashback card with online and offline cashback plus spend-based renewal reversal.",
    bestFor: "Cashback",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "2% cashback on online spends and 1% cashback on other spends, subject to monthly caps",
    rewardType: "Cashback",
    categories: ["cashback", "shopping"],
    rating: 4.3,
    interestNote: "Official Smart page lists first-year fee of Rs. 499 plus GST, waived as a special offer, and renewal fee of Rs. 499 plus GST"
  },
  {
    bankName: "Standard Chartered Bank",
    program: "Rewards Credit Card",
    summary: "Official Standard Chartered rewards card with retail reward acceleration, lounge access, and annual-fee reversal option.",
    bestFor: "Rewards / Lounge",
    annualFee: 1000,
    joiningFee: 0,
    rewardRate: "4 reward points per Rs. 150 on retail spends plus additional 4 reward points per Rs. 150 above monthly spend thresholds",
    rewardType: "Reward points",
    categories: ["rewards", "lounge", "shopping"],
    rating: 4.4,
    interestNote: "Official Rewards page lists no joining fee and annual fee of Rs. 1,000 plus GST"
  },
  {
    bankName: "YES BANK",
    program: "YES Prosperity Cashback Credit Card",
    summary: "Official YES BANK cashback card with movies, grocery, and utility cashback plus fuel surcharge waiver.",
    bestFor: "Cashback",
    annualFee: 999,
    joiningFee: 999,
    rewardRate: "5% cashback on movies, grocery, and utility bill payment through YES Pay Now and 0.50% on other spends",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "fuel"],
    rating: 4.2,
    interestNote: "YES BANK application page lists first-year and annual fee at Rs. 999 plus GST"
  },
  {
    bankName: "YES BANK",
    program: "YES Premia Credit Card",
    summary: "Official YES BANK premium card with airport lounge access, golf, lower forex markup, and rewards acceleration.",
    bestFor: "Premium Travel",
    annualFee: 1599,
    joiningFee: 1599,
    rewardRate: "8 reward points per Rs. 200 on groceries, dining, and departmental stores and 6 reward points per Rs. 200 on other categories",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.5,
    interestNote: "YES BANK application page lists first-year and annual fee at Rs. 1,599 plus GST with spend-based waiver"
  },
  {
    bankName: "DCB Bank",
    program: "DCB PayLess Platinum Card",
    summary: "Official DCB secured RuPay credit card with Nil joining fee, lower annual fee, and spend-based annual-fee waiver.",
    bestFor: "Secured / Beginner",
    annualFee: 350,
    joiningFee: 0,
    rewardRate: "1% fuel surcharge waiver up to Rs. 100 per statement cycle with secured-card access against deposit",
    rewardType: "Secured card value",
    categories: ["beginners", "lifetime-free", "fuel"],
    rating: 4.0,
    interestNote: "Official DCB KFS lists finance charges at 3% per month or 36% per annum and forex markup of 3.5%"
  },
  {
    bankName: "DCB Bank",
    program: "DCB PayLess Select Card",
    summary: "Official DCB secured Select variant with Nil joining fee, higher annual tier, and spend-based renewal waiver.",
    bestFor: "Secured / Lifestyle",
    annualFee: 1000,
    joiningFee: 0,
    rewardRate: "Secured-card access with 1% fuel surcharge waiver up to Rs. 100 per statement cycle",
    rewardType: "Secured card value",
    categories: ["beginners", "fuel", "premium"],
    rating: 4.1,
    interestNote: "Official DCB KFS lists finance charges at 3% per month or 36% per annum and forex markup of 3.5%"
  },
  {
    bankName: "DBS Bank India",
    program: "DBS Spark5 Credit Card",
    summary: "Official DBS cashback-and-rewards card with lounge, fuel surcharge waiver, and spend-based annual-fee reversal.",
    bestFor: "Rewards / Shopping",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "2 Cash Points per Rs. 200 spent plus bonus 5X cash points on monthly offline spend milestones",
    rewardType: "Cash Points",
    categories: ["rewards", "shopping", "lounge", "fuel"],
    rating: 4.3,
    interestNote: "Official DBS Spark MITC lists forex markup at 3.5% and finance charges up to 4% per month on revolving balance"
  },
  {
    bankName: "DBS Bank India",
    program: "DBS Vantage Card",
    summary: "Official DBS premium card with milestone-led bonus points and annual-fee waiver on high annual spend.",
    bestFor: "Premium Travel",
    annualFee: 10000,
    joiningFee: 10000,
    rewardRate: "Bonus Vantage Points on quarterly and annual spend milestones with travel-led premium positioning",
    rewardType: "Vantage Points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.6,
    interestNote: "Official DBS Vantage KFS lists annual fee of Rs. 10,000 for DBS Treasures Elite customers and higher for other segments"
  },
  {
    bankName: "HSBC India",
    program: "HSBC RuPay Platinum Credit Card",
    summary: "Official HSBC no-fee RuPay card with reward points, UPI linkage, and fuel surcharge waiver.",
    bestFor: "Lifetime Free / Rewards",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "2 reward points per Rs. 150 spent with air-mile and hotel-loyalty transfer options",
    rewardType: "Reward points",
    categories: ["lifetime-free", "rewards", "fuel", "beginners"],
    rating: 4.4,
    interestNote: "Official HSBC product page confirms no joining and annual fees; verify live MITC for finance charges"
  },
  {
    bankName: "HSBC India",
    program: "HSBC Live+ Credit Card",
    summary: "Official HSBC cashback card with accelerated dining, grocery, and food-delivery cashback plus lounge access.",
    bestFor: "Cashback",
    annualFee: 999,
    joiningFee: 999,
    rewardRate: "10% cashback up to Rs. 1,000 per month on dining, food delivery, and groceries, plus 1.5% on most other spends",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "lounge"],
    rating: 4.6,
    interestNote: "Official HSBC Live+ page lists joining fee and annual fee at Rs. 999 with waiver above Rs. 200,000 annual spend"
  },
  {
    bankName: "Indian Bank",
    program: "Indian Bank One Co-Branded Credit Card",
    summary: "Official Indian Bank x OneCard mobile-first metal card with app controls and lifetime-free pricing.",
    bestFor: "Digital / Lifetime Free",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Never-expiring rewards on all spends with app-controlled offers and in-app EMI",
    rewardType: "Reward points",
    categories: ["lifetime-free", "shopping", "rewards", "beginners"],
    rating: 4.4,
    interestNote: "Official Indian Bank page confirms lifetime free; verify MITC and KFS for finance charges"
  },
  {
    bankName: "UCO Bank",
    program: "UCO Bank SBI Card Elite",
    summary: "Official UCO Bank co-branded SBI premium card with reward acceleration, movie benefits, lounge access, and travel memberships.",
    bestFor: "Premium Lifestyle",
    annualFee: 4999,
    joiningFee: 4999,
    rewardRate: "5X reward points on departmental stores, dining, and grocery spends and 2 reward points per Rs. 100 on other spends",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.5,
    interestNote: "Official UCO page lists annual and renewal fee at Rs. 4,999; verify live SBI card MITC for finance charges"
  },
  {
    bankName: "UCO Bank",
    program: "UCO Bank SBI Card Prime",
    summary: "Official UCO Bank co-branded SBI Prime card with accelerated reward categories, lounge access, and renewal-waiver targets.",
    bestFor: "Rewards / Travel",
    annualFee: 2999,
    joiningFee: 2999,
    rewardRate: "20 reward points per Rs. 100 on birthday and utility standing instructions, 15 on BigBasket, 10 on grocery, dining, movies, and departmental stores",
    rewardType: "Reward points",
    categories: ["rewards", "travel", "lounge", "premium"],
    rating: 4.4,
    interestNote: "Official UCO page lists annual and renewal fee at Rs. 2,999; verify live SBI card MITC for finance charges"
  },
  {
    bankName: "UCO Bank",
    program: "UCO Bank SimplySAVE SBI Card",
    summary: "Official UCO Bank co-branded SBI entry card with everyday category rewards and fuel surcharge waiver.",
    bestFor: "Everyday Rewards",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "10 reward points per Rs. 150 on dining, movies, departmental stores, and groceries and 1 reward point per Rs. 150 on other spends",
    rewardType: "Reward points",
    categories: ["beginners", "rewards", "fuel", "shopping"],
    rating: 4.2,
    interestNote: "Official UCO page lists annual and renewal fee at Rs. 499; verify live SBI card MITC for finance charges"
  },
  {
    bankName: "Jupiter x CSB Bank",
    program: "Edge CSB Bank RuPay Credit Card",
    summary: "Official Jupiter-issued, CSB Bank-backed lifetime-free RuPay card with switchable shopping, travel, and dining cashback modes.",
    bestFor: "Digital Cashback",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "2% cashback in the active shopping, travel, or dining mode and 0.4% cashback on other UPI and card spends",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "travel", "lifetime-free"],
    rating: 4.5,
    interestNote: "Official Jupiter CSB KFS lists Nil joining fee and Nil annual membership fee for Edge CSB Bank RuPay Credit Card"
  },
  {
    bankName: "Jupiter x CSB Bank",
    program: "Edge+ CSB Bank RuPay Credit Card",
    summary: "Official Jupiter-issued, CSB Bank-backed higher-reward RuPay card currently marketed with limited-period fee waivers and stronger cashback tiers.",
    bestFor: "Digital Premium Cashback",
    annualFee: 0,
    joiningFee: 999,
    rewardRate: "Up to 10% cashback on shopping, 5% on travel, and 1% on everything else in the current public offer flow",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "travel", "premium"],
    rating: 4.6,
    interestNote: "Official Jupiter CSB KFS lists Rs. 999 joining fee for Edge+ and Nil annual membership fee; the public landing page showed a limited-period joining-fee waiver on April 9, 2026"
  },
  {
    bankName: "IndusInd Bank",
    program: "Platinum RuPay Credit Card",
    summary: "Official IndusInd RuPay card with UPI support, reward points, fuel surcharge waiver, and lifetime-free positioning.",
    bestFor: "Lifetime Free / UPI",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "2 reward points per Rs. 100 spent through UPI and fuel surcharge waiver on eligible transactions",
    rewardType: "Reward points",
    categories: ["lifetime-free", "rewards", "fuel", "beginners"],
    rating: 4.3,
    interestNote: "Official IndusInd credit card page lists it among lifetime-free options; verify current MITC for finance charges"
  },
  {
    bankName: "IndusInd Bank",
    program: "Legend Credit Card",
    summary: "Official IndusInd lifetime-free lifestyle card with weekend reward acceleration and fuel savings.",
    bestFor: "Lifestyle / Rewards",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "1 reward point per Rs. 100 on weekdays and 2 reward points per Rs. 100 on weekends",
    rewardType: "Reward points",
    categories: ["lifetime-free", "rewards", "shopping"],
    rating: 4.4,
    interestNote: "IndusInd official credit card guide positions Legend as lifetime free; verify live card schedule for finance charges"
  },
  {
    bankName: "IndusInd Bank",
    program: "EazyDiner IndusInd Bank Platinum Credit Card",
    summary: "Official IndusInd dining card with 3-month Prime membership, instant dining discounts, and no joining or annual fee.",
    bestFor: "Dining / Lifestyle",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Extra 20% off up to Rs. 500 on PayEazy transactions with milestone EazyPoints and fuel surcharge waiver",
    rewardType: "EazyPoints",
    categories: ["shopping", "rewards", "lifetime-free"],
    rating: 4.5,
    interestNote: "IndusInd official product page states this Platinum variant is lifetime free; verify current MITC for finance charges"
  },
  {
    bankName: "Canara Bank",
    program: "RuPay Platinum Credit Card",
    summary: "Official Canara premium entry card with nil joining and annual fee, lounge access, and low stated forex markup.",
    bestFor: "Rewards / Lounge",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "2 reward points per Rs. 100 spent on POS and e-commerce transactions",
    rewardType: "Reward points",
    categories: ["lifetime-free", "rewards", "lounge", "fuel"],
    rating: 4.5,
    interestNote: "Canara official page lists 2.5% monthly interest and 3% forex markup as of the live product page"
  },
  {
    bankName: "Canara Bank",
    program: "Visa Signature Credit Card",
    summary: "Official Canara higher-tier card with nil joining and annual fee and stronger lounge access counts.",
    bestFor: "Premium Travel",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Reward points on POS and e-commerce transactions with airport lounge access at domestic and international airports",
    rewardType: "Reward points",
    categories: ["lifetime-free", "premium", "travel", "lounge", "rewards"],
    rating: 4.6,
    interestNote: "Canara official page lists 2.5% monthly interest and no joining or annual fee"
  },
  {
    bankName: "Indian Overseas Bank",
    program: "RuPay Platinum Credit Card",
    summary: "Official IOB premium RuPay card with lounge access, fuel surcharge waiver, and reward points.",
    bestFor: "Rewards / Lounge",
    annualFee: 250,
    joiningFee: 0,
    rewardRate: "1 reward point per Rs. 100 spent, 1 domestic lounge access per quarter, and 1 international lounge access per year",
    rewardType: "Reward points",
    categories: ["rewards", "lounge", "fuel"],
    rating: 4.2,
    interestNote: "IOB application document lists annual fee of Rs. 250 plus GST, joining fee nil, and annual-fee reversal at Rs. 1,00,000 spend"
  },
  {
    bankName: "Indian Overseas Bank",
    program: "RuPay Select Credit Card",
    summary: "Official IOB super-premium RuPay card with higher lounge counts and stronger credit-limit band.",
    bestFor: "Premium Travel",
    annualFee: 500,
    joiningFee: 0,
    rewardRate: "1 reward point per Rs. 100 spent, 2 domestic lounge visits per quarter, and 2 international lounge visits per year",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards", "fuel"],
    rating: 4.4,
    interestNote: "IOB application document lists annual fee of Rs. 500 plus GST and fuel surcharge waiver up to Rs. 250 per billing cycle"
  },
  {
    bankName: "South Indian Bank",
    program: "South Indian Bank SimplySAVE SBI Card",
    summary: "Official SIB-SBI co-branded everyday rewards card with grocery, dining, and movie acceleration.",
    bestFor: "Everyday Rewards",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: "10 reward points per Rs. 100 on dining, movies, departmental stores, and groceries",
    rewardType: "Reward points",
    categories: ["beginners", "rewards", "fuel", "shopping"],
    rating: 4.2,
    interestNote: "South Indian Bank official page lists joining and annual fee at Rs. 499 with reversal after Rs. 1,00,000 yearly spend"
  },
  {
    bankName: "South Indian Bank",
    program: "South Indian Bank SBI Platinum Card",
    summary: "Official SIB-SBI premium co-branded card with higher credit-limit band, Priority Pass membership, and fuel surcharge waiver.",
    bestFor: "Premium Lifestyle",
    annualFee: 2999,
    joiningFee: 2999,
    rewardRate: "2 reward points per Rs. 100 spent and 10 reward points per Rs. 100 on dining, movies, departmental stores, and groceries",
    rewardType: "Reward points",
    categories: ["premium", "travel", "lounge", "rewards", "fuel"],
    rating: 4.5,
    interestNote: "South Indian Bank official page lists joining and annual fee at Rs. 2,999 with vouchers and Priority Pass membership"
  },
  {
    bankName: "South Indian Bank",
    program: "SIB One Co-Branded Credit Card",
    summary: "Official South Indian Bank x OneCard digital metal card with lifetime-free pricing and low forex markup.",
    bestFor: "Digital / Lifetime Free",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "App-led rewards with instant virtual issuance and around 1% forex markup positioning",
    rewardType: "Reward points",
    categories: ["lifetime-free", "shopping", "rewards", "beginners"],
    rating: 4.4,
    interestNote: "South Indian Bank official page states zero joining and annual fees; verify live MITC for finance charges"
  },
  {
    bankName: "SBM Bank India",
    program: "SBM GILD Credit Card",
    summary: "Official SBM premium FD-backed card with lower forex markup than many secured cards and annual-fee waiver on spend.",
    bestFor: "Secured / Premium",
    annualFee: 499,
    joiningFee: 0,
    rewardRate: "FD-backed premium secured card with forex markup of 2.49% and spend-based annual fee waiver",
    rewardType: "Secured card value",
    categories: ["beginners", "premium", "travel"],
    rating: 4.3,
    interestNote: "SBM GILD KFS dated late 2025 lists annual fee Rs. 499, joining fee nil, annual waiver at Rs. 1,50,000 spend, and interest 2.5% per month"
  },
  {
    bankName: "SBM Bank India",
    program: "Paisabazaar Step-Up SBM Credit Card",
    summary: "Official SBM secured card built with Paisabazaar for new-to-credit users with low or no joining fee depending on FD size.",
    bestFor: "Secured / Credit Building",
    annualFee: 0,
    joiningFee: 250,
    rewardRate: "FD-backed credit-building card with flexible joining fee based on deposit slab and zero annual fee",
    rewardType: "Secured card value",
    categories: ["beginners", "lifetime-free"],
    rating: 4.1,
    interestNote: "Paisabazaar Step-Up SBM KFS lists annual fee nil and joining fee Rs. 250 plus GST only for FD amounts up to Rs. 5,000, otherwise nil"
  },
  {
    bankName: "Axis Bank",
    program: "AXIS BANK SUPERMONEY RuPay Credit Card",
    summary: "Official Axis co-branded RuPay cashback card with UPI-led rewards and no joining or annual fee.",
    bestFor: "UPI Cashback",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "3% cashback on UPI transactions via super.money app and 1% cashback on other eligible spends",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "fuel", "lifetime-free"],
    rating: 4.5,
    interestNote: "Axis official product page lists zero joining and annual fee and fuel surcharge waiver on eligible transactions"
  },
  {
    bankName: "Federal Bank",
    program: "Federal Scapia Co-branded Credit Card",
    summary: "Official Federal travel card with zero forex markup, travel rewards, and zero joining and annual fees.",
    bestFor: "Travel",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "10% reward on eligible spends with instant redemption in the Scapia app and zero forex markup",
    rewardType: "Scapia Coins",
    categories: ["travel", "lifetime-free", "lounge", "premium"],
    rating: 4.7,
    interestNote: "Federal Scapia official page confirms zero joining and annual fees; verify KFS for current finance charges"
  },
  {
    bankName: "Federal Bank",
    program: "Federal Edge Co-branded Credit Card",
    summary: "Official Federal Edge card focused on app-led controls, assured cashback, and first-year fee waiver.",
    bestFor: "Digital Rewards",
    annualFee: 499,
    joiningFee: 0,
    rewardRate: "2X jewels on all transactions, 5X jewels on top 3 merchants, and assured 2% cashback on a selected spend mode",
    rewardType: "Jewels",
    categories: ["cashback", "shopping", "lounge"],
    rating: 4.3,
    interestNote: "Federal Edge official page states no joining fee and first-year annual fee waiver; verify the current renewal fee in KFS"
  },
  {
    bankName: "Bank of India",
    program: "RuPay Select Credit Card",
    summary: "Official BOI premium contactless international credit card with reward points, renewal-fee adjustment options, and up to 51 days of interest-free credit.",
    bestFor: "Premium Rewards",
    annualFee: 750,
    joiningFee: 0,
    rewardRate: "1 reward point per Rs. 100 spent, with points redeemable against renewal fees and statement credit",
    rewardType: "Reward points",
    categories: ["premium", "rewards", "travel"],
    rating: 4.2,
    interestNote: "BOI official credit-card page notes revolving interest from 1.70% per month on carried balances and higher rates on overdue amounts"
  },
  {
    bankName: "Bank of India",
    program: "RuPay Platinum Credit Card",
    summary: "Official BOI contactless international card with reward points, renewal-fee offset via points, and standard revolving-credit features.",
    bestFor: "Rewards / Entry",
    annualFee: 350,
    joiningFee: 0,
    rewardRate: "1 reward point per Rs. 100 spent and up to 51 days of interest-free credit",
    rewardType: "Reward points",
    categories: ["rewards", "beginners"],
    rating: 4.0,
    interestNote: "BOI official credit-card page notes revolving interest from 1.70% per month on carried balances and higher rates on overdue amounts"
  },
  {
    bankName: "Bank of India",
    program: "RuPay Swadhan Platinum Credit Card",
    summary: "Official BOI secured card issued against term deposit for customers who want a credit line backed by deposit.",
    bestFor: "Secured / Beginner",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Secured-card access against TDR with BOI credit-card servicing and payment features",
    rewardType: "Secured card value",
    categories: ["beginners", "lifetime-free"],
    rating: 4.0,
    interestNote: "BOI official product catalog identifies Swadhan Platinum as a TDR-backed secured credit card; verify current detailed KFS for finance charges"
  },
  {
    bankName: "Bank of Maharashtra",
    program: "Mahabank Credit Card",
    summary: "Official Bank of Maharashtra consumer credit-card program with current service-charge schedule, joining-fee nil, and annual-fee waiver on spend.",
    bestFor: "Entry / Rewards",
    annualFee: 500,
    joiningFee: 0,
    rewardRate: "Consumer credit-card program with standard revolving-credit features and spend-linked annual-fee waiver",
    rewardType: "General rewards program",
    categories: ["beginners", "rewards"],
    rating: 4.1,
    interestNote: "Bank of Maharashtra service charges page dated 2025 lists annual fee of Rs. 500, joining fee nil, and annual-fee waiver above Rs. 30,000 previous-year spend"
  },
  {
    bankName: "Bank of Maharashtra",
    program: "Mahabank Secured Credit Card",
    summary: "Official secured credit card backed by deposit, promoted by Bank of Maharashtra for customers building or rebuilding credit history.",
    bestFor: "Secured / Credit Building",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Deposit-backed credit access positioned for customers who want to build credit history with a secured line",
    rewardType: "Secured card value",
    categories: ["beginners", "lifetime-free"],
    rating: 4.1,
    interestNote: "Bank of Maharashtra official campaign and credit-card policy confirm an active secured credit-card program; verify live KFS or MITC for detailed finance charges"
  },
  {
    bankName: "Jammu & Kashmir Bank",
    program: "J&K Bank Credit Card",
    summary: "Official J&K Bank credit-card program with live e-statement access and current 2025 credit-card policy published by the bank.",
    bestFor: "Regional Retail Credit",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "J&K Bank currently operates a live credit-card program; verify the issuer page for active benefits and pricing by variant before production use",
    rewardType: "Issuer-specific benefits",
    categories: ["rewards", "beginners"],
    rating: 4.0,
    interestNote: "J&K Bank publishes an active credit-card policy and live e-bill portal, but public variant-level fee and reward details were not clearly exposed in the pages I verified on April 9, 2026"
  },
  {
    bankName: "CSB Bank",
    program: "CSB Bank OneCard Credit Card",
    summary: "Official CSB Bank co-branded OneCard with mobile-first controls, app-led servicing, and OneCard MITC/KFS published on the bank site.",
    bestFor: "Digital / Rewards",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: "Mobile-first rewards card managed through the OneCard app with app-based controls and redemption",
    rewardType: "Reward points",
    categories: ["lifetime-free", "shopping", "rewards", "beginners"],
    rating: 4.4,
    interestNote: "CSB official credit-card page confirms the co-branded OneCard program and publishes MITC/KFS; verify the current fee schedule from the linked KFS before production use"
  },
  {
    bankName: "CSB Bank",
    program: "Edge+ CSB Bank RuPay Credit Card",
    summary: "Official CSB Bank Edge+ card with UPI-linked cashback, no annual fee, and limited-period joining-fee offer messaging on the bank site.",
    bestFor: "Digital Cashback",
    annualFee: 0,
    joiningFee: 499,
    rewardRate: "10% cashback on top shopping brands, 5% on top travel brands, and 1% on all online and offline spends",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "travel", "lifetime-free"],
    rating: 4.5,
    interestNote: "CSB official Edge+ page showed Rs. 499 joining fee and no annual fee with limited-period fee waiver messaging on April 9, 2026"
  },
  {
    bankName: "Equitas Small Finance Bank",
    program: "Tiga Credit Card",
    summary: "Official Equitas rewards card with Pay by 3 EMI automation, 3X reward points on select spend types, and spend-based renewal waiver.",
    bestFor: "Rewards / UPI",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: "3X reward points on UPI, contactless payments, and Pay-by-3 merchants with introductory APR offer messaging",
    rewardType: "Reward points",
    categories: ["rewards", "shopping", "beginners"],
    rating: 4.3,
    interestNote: "Equitas official credit-cards page lists Tiga fee at Rs. 500 and first-year-free promotional messaging; verify live KFS for finance charges"
  },
  {
    bankName: "Equitas Small Finance Bank",
    program: "Selfe Credit Card",
    summary: "Official Equitas lifestyle card with selectable reward categories, membership choices, and quarterly domestic lounge access.",
    bestFor: "Lifestyle / Rewards",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: "5X rewards on any 2 selected categories including apparel, dining, grocery, utility, and taxi",
    rewardType: "Reward points",
    categories: ["rewards", "shopping", "lounge"],
    rating: 4.4,
    interestNote: "Equitas official Selfe page publishes KFS/MITC and product details; verify the live fee schedule from those linked documents before production use"
  },
  {
    bankName: "Equitas Small Finance Bank",
    program: "PowerMiles Credit Card",
    summary: "Official Equitas travel-focused premium metal card with miles conversion, international lounge access, and travel memberships.",
    bestFor: "Travel / Premium",
    annualFee: 3000,
    joiningFee: 3000,
    rewardRate: "Travel rewards with miles conversion, premium memberships, and travel-benefit positioning",
    rewardType: "Miles / reward points",
    categories: ["premium", "travel", "lounge", "rewards"],
    rating: 4.5,
    interestNote: "Equitas PowerMiles official page confirms a live travel card program; verify the current KFS for exact fee and finance-charge schedule"
  },
  {
    bankName: "Suryoday Small Finance Bank",
    program: "Suryoday SFB RuPay Select Credit Card",
    summary: "Official Suryoday lifetime-free secured Select card backed by FD with cashback, UPI support, and published KFS/MITC.",
    bestFor: "Secured / Cashback",
    annualFee: 150,
    joiningFee: 0,
    rewardRate: "0.5% cashback with UPI-powered payments and FD-backed secured-card access",
    rewardType: "Cashback",
    categories: ["beginners", "lifetime-free", "cashback", "travel"],
    rating: 4.3,
    interestNote: "Suryoday KFS dated 2025 lists annual fee of Rs. 150 plus GST, waived on annual spends of Rs. 50,000 or more, finance charge 2.95% per month, and forex markup 2.50%"
  },
  {
    bankName: "Suryoday Small Finance Bank",
    program: "Suryoday SFB RuPay Platinum Credit Card",
    summary: "Official Suryoday FD-backed secured Platinum card with lifetime-free messaging, cashback, and published MITC.",
    bestFor: "Secured / Beginner",
    annualFee: 150,
    joiningFee: 0,
    rewardRate: "0.5% cashback with secured FD-backed access and UPI-powered payments",
    rewardType: "Cashback",
    categories: ["beginners", "lifetime-free", "cashback"],
    rating: 4.2,
    interestNote: "Suryoday MITC dated March 25, 2025 lists annual fee of Rs. 150 plus GST, finance charge 2.95% per month, and cash-advance fee details"
  },
  {
    bankName: "ESAF Small Finance Bank",
    program: "INORI RuPay Platinum Credit Card",
    summary: "Official ESAF retail credit card with cashback, concierge access, insurance coverage, and a live dedicated credit-card portal.",
    bestFor: "Cashback / Lifestyle",
    annualFee: 750,
    joiningFee: 0,
    rewardRate: "1.25% cashback on billed spends with concierge, merchant offers, and insurance-led value",
    rewardType: "Cashback",
    categories: ["cashback", "shopping", "premium"],
    rating: 4.3,
    interestNote: "ESAF official credit-card portal confirms an active INORI RuPay Platinum Credit Card program; verify the linked KFS or MITC on the updated credit-card portal for current finance charges and annual-fee schedule"
  }
];

const uniqueBankNames = Array.from(new Set(cardSeeds.map((card) => card.bankName)));

export const banks: Bank[] = uniqueBankNames.map((bankName, index) => ({
  id: `bank-${index + 1}`,
  name: bankName,
  slug: slugify(bankName),
  logo: bankName.replace(/\(.*?\)/g, "").split(" ").map((part) => part[0]).join("").slice(0, 3),
  description: `Research catalog entry for ${bankName}, expanded from the pricing-oriented PDF reference and intended for further official URL validation.`,
  accent: bankAccentMap[bankName] ?? Object.values(bankAccentMap)[index % Object.values(bankAccentMap).length]
}));
const getEligibilitySummary = (seed: CardSeed) => {
  if (seed.categories.includes("beginners")) {
    return "Suitable for new-to-credit applicants subject to issuer policy, KYC, income checks, and bureau review.";
  }

  if (seed.categories.includes("premium")) {
    return "Usually aimed at stronger credit profiles and higher-income applicants; confirm issuer eligibility before applying.";
  }

  return "Available to applicants meeting the issuer's income, KYC, residence, and credit policy requirements.";
};

const getLoungeAccess = (seed: CardSeed) => {
  if (seed.categories.includes("lounge")) {
    return "Lounge benefits are part of the card positioning; verify current lounge counts and spend conditions on the official issuer page.";
  }

  return "No lounge benefit confirmed from this pricing reference; verify official issuer page before publishing.";
};

const getForexMarkup = (seed: CardSeed) => {
  const name = seed.program.toLowerCase();

  if (name.includes("wow") || name.includes("scapia") || name.includes("world safari")) {
    return "Travel-led positioning often highlights low or zero forex value; verify the official issuer fee schedule for the live markup.";
  }

  return "Forex markup not confirmed in this research sheet; verify the official issuer charges page.";
};

const getWelcomeBenefit = () => "See the official issuer page for the current welcome offer, joining benefit, or campaign-led onboarding incentive.";

const getFuelWaiver = (seed: CardSeed) => {
  if (seed.categories.includes("fuel")) {
    return "Fuel-focused value is part of the card positioning; verify current surcharge waiver slabs and exclusions on the issuer page.";
  }

  return "Fuel surcharge waiver details are not confirmed in this sheet; verify official issuer terms.";
};

const getHighlightStats = (seed: CardSeed) => ({
  cashback: seed.rewardRate,
  travel: seed.categories.includes("travel") ? "Travel-oriented value proposition" : "Check official issuer page for travel benefits",
  feeWaiver: seed.annualFee === 0 ? "Lifetime free positioning in research sheet" : `Annual fee Rs. ${seed.annualFee}`
});

const getBenefits = (seed: CardSeed) => [
  {
    category: "Pricing",
    title: "Research-backed fee snapshot",
    description: `Joining fee: Rs. ${seed.joiningFee}. Annual or renewal fee: Rs. ${seed.annualFee}. Always confirm the live MITC or fee page before production use.`
  },
  {
    category: "Offers",
    title: seed.bestFor,
    description: seed.rewardRate
  },
  {
    category: "Verification",
    title: "Official validation still matters",
    description: seed.interestNote
  }
];

const getFees = (seed: CardSeed) => [
  {
    feeType: "Joining fee",
    amount: `Rs. ${seed.joiningFee}`,
    notes: "Taken from the provided pricing-oriented PDF reference."
  },
  {
    feeType: "Annual / renewal fee",
    amount: `Rs. ${seed.annualFee}`,
    notes: "Taken from the provided pricing-oriented PDF reference."
  },
  {
    feeType: "Finance / interest",
    amount: "See official MITC",
    notes: seed.interestNote
  }
];

const getFaqs = (seed: CardSeed) => [
  {
    question: `Is ${seed.program} suitable for ${seed.bestFor.toLowerCase()}?`,
    answer: `The research sheet positions this card for ${seed.bestFor.toLowerCase()}. Confirm the live reward rules and eligibility on the issuer website before applying.`
  },
  {
    question: "Are the fees final?",
    answer: "No. The PDF is a research reference. Always verify the latest MITC, charges page, or product page before publishing or applying."
  }
];

export const cards: CreditCard[] = cardSeeds.map((seed, index) => {
  const bank = banks.find((item) => item.name === seed.bankName);
  const slug = slugify(`${seed.bankName} ${seed.program}`);
  const eligibilitySummary = getEligibilitySummary(seed);

  return {
    id: `card-${index + 1}`,
    bankId: bank?.id ?? `bank-fallback-${index + 1}`,
    bankName: seed.bankName,
    name: seed.program,
    slug,
    image: `https://images.unsplash.com/photo-${1550000000000 + index}?auto=format&fit=crop&w=900&q=80`,
    summary: seed.summary,
    bestFor: seed.bestFor,
    annualFee: seed.annualFee,
    joiningFee: seed.joiningFee,
    rewardRate: seed.rewardRate,
    rewardType: seed.rewardType,
    loungeAccess: getLoungeAccess(seed),
    forexMarkup: getForexMarkup(seed),
    welcomeBenefit: getWelcomeBenefit(),
    fuelWaiver: getFuelWaiver(seed),
    eligibilitySummary,
    rating: seed.rating,
    categories: seed.categories,
    highlightStats: getHighlightStats(seed),
    benefits: getBenefits(seed),
    fees: getFees(seed),
    eligibility: {
      ageRequirement: "See official issuer eligibility page",
      incomeRequirement: "See official issuer eligibility page",
      creditScoreRecommendation: seed.categories.includes("premium") ? "Good to strong bureau profile usually expected" : "Healthy credit profile recommended",
      employmentType: "Issuer-specific salaried, self-employed, or secured-card rules apply"
    },
    documents: ["PAN card", "Address proof", "Identity proof", "Income proof if requested by issuer"],
    pros: [seed.rewardRate, `Positioned for ${seed.bestFor.toLowerCase()}`, seed.annualFee === 0 ? "Research sheet marks it as lifetime free" : `Known annual fee of Rs. ${seed.annualFee}`],
    cons: ["Benefits can change by issuer campaign", "Official MITC verification is still required", "Some detailed charges are not included in this PDF reference"],
    whoShouldGet: [`Users seeking ${seed.bestFor.toLowerCase()} value`, "Applicants willing to verify final official terms before applying"],
    whoShouldAvoid: ["Users who need fully confirmed live lounge or forex values before shortlist", "Applicants who want a card without any issuer-side verification step"],
    faqs: getFaqs(seed)
  };
});

export const featuredCards = cards.slice(0, 6);

export const guides: Guide[] = [
  {
    slug: "best-credit-cards-in-india-2026-complete-comparison-guide",
    title: "Free Credit Card eBook",
    excerpt: "A design-led lead magnet covering how cards work, how to choose one, top categories, hidden charges, application steps, and quick comparisons.",
    readTime: "12 min",
    category: "eBook"
  }
];

export const reviews: Review[] = [];

export const categories: Array<{ slug: string; name: string; description: string }> = [
  { slug: "cashback", name: "Cashback", description: "Cards positioned around cashback and value-back on regular spending." },
  { slug: "travel", name: "Travel", description: "Cards oriented toward miles, lounge, forex, or travel-led privileges." },
  { slug: "lounge", name: "Lounge Access", description: "Cards where lounge access is part of the product positioning." },
  { slug: "fuel", name: "Fuel", description: "Cards intended for fuel-led savings or surcharge-waiver value." },
  { slug: "rewards", name: "Rewards", description: "Cards focused on reward points, partner offers, or milestone value." },
  { slug: "shopping", name: "Shopping", description: "Cards designed around online shopping, commerce, or co-branded rewards." },
  { slug: "lifetime-free", name: "Lifetime Free", description: "Cards presented as zero joining-fee or zero annual-fee in the research sheet." },
  { slug: "beginners", name: "Beginner", description: "Cards suitable for entry-level, secured, or first-card consideration." },
  { slug: "premium", name: "Premium", description: "Higher-tier cards positioned around premium travel, lounge, or lifestyle value." }
].filter((category) => cards.some((card) => card.categories.includes(category.slug as CardCategory)));

export const searchIndex: SearchItem[] = [
  ...banks.map((bank) => ({
    id: bank.id,
    title: bank.name,
    href: `/banks/${bank.slug}`,
    type: "bank" as const,
    subtitle: bank.description
  })),
  ...cards.map((card) => ({
    id: card.id,
    title: card.name,
    href: `/card/${card.slug}`,
    type: "card" as const,
    subtitle: `${card.bankName} | ${card.bestFor}`
  })),
  ...categories.map((category) => ({
    id: category.slug,
    title: category.name,
    href: `/categories/${category.slug}`,
    type: "category" as const,
    subtitle: category.description
  })),
  ...guides.map((guide) => ({
    id: guide.slug,
    title: guide.title,
    href: `/guides/${guide.slug}`,
    type: "guide" as const,
    subtitle: guide.excerpt
  }))
];

export const getBankBySlug = (slug: string) => banks.find((bank) => bank.slug === slug);

export const getCardsByBankSlug = (slug: string) => {
  const bank = getBankBySlug(slug);
  return bank ? cards.filter((card) => card.bankId === bank.id) : [];
};

export const getCardBySlug = (slug: string) => cards.find((card) => card.slug === slug);

export const getCardsByCategory = (slug: string) => cards.filter((card) => card.categories.includes(slug as CardCategory));

export const getRelatedCards = (card: CreditCard) => cards.filter((candidate) => candidate.id !== card.id && candidate.bankId === card.bankId).slice(0, 3);



