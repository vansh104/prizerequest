export interface Contest {
  id: string;
  title: string;
  description: string;
  entry_fee: number;
  prize_amount: number;
  start_date: string;
  end_date: string;
  status: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Add mock fields for display
  prizeValue: number;
  entryFee: number;
  maxEntries: number;
  currentEntries: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  _id: string;
}

export interface Quiz {
  id: string;
  contest_id: string;
  question: string;
  options: string[];
  correct_answer: string;
  points: number;
  created_at: string;
  // Legacy fields
  _id: string;
  contestId: string;
  correctAnswer: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
  // Legacy fields
  _id: string;
}

export interface Entry {
  id: string;
  user_id: string;
  contest_id: string;
  answers?: any;
  score: number;
  completed_at?: string;
  created_at: string;
  // Legacy fields
  _id: string;
  userId: string;
  contestId: string;
  paymentId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  quizAttempted: boolean;
  quizPassed: boolean;
  selectedAnswer?: number;
  isQualified: boolean;
  submittedAt: string;
}

export interface Payment {
  id: string;
  user_id: string;
  contest_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method?: string;
  transaction_id?: string;
  created_at: string;
  // Legacy fields
  _id: string;
  userId: string;
  contestId: string;
  paypalOrderId: string;
  paypalPaymentId: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}