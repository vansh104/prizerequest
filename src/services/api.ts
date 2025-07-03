import { supabase } from './supabase';
import { Contest, Quiz, Entry, Payment, AuthUser } from '../types';

// Mock contest data for display
const mockContests: Contest[] = [
  {
    id: '1',
    title: 'Win a Luxury Apartment in Mumbai',
    description: 'A beautiful 2BHK apartment in the heart of Mumbai. Answer the quiz correctly to qualify for the draw.',
    entry_fee: 299,
    prize_amount: 7500000,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prizeValue: 7500000,
    entryFee: 299,
    maxEntries: 4000,
    currentEntries: 1250,
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Property',
    isActive: true,
    _id: '1'
  },
  {
    id: '2',
    title: 'BMW X3 - Luxury SUV',
    description: 'Drive home in style with this brand new BMW X3. Test your knowledge and win big!',
    entry_fee: 199,
    prize_amount: 800000,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prizeValue: 800000,
    entryFee: 199,
    maxEntries: 3000,
    currentEntries: 890,
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Vehicle',
    isActive: true,
    _id: '2'
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max',
    description: 'Get the latest iPhone 15 Pro Max with all accessories. Answer correctly to qualify!',
    entry_fee: 99,
    prize_amount: 120000,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prizeValue: 120000,
    entryFee: 99,
    maxEntries: 2000,
    currentEntries: 1567,
    imageUrl: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    isActive: true,
    _id: '3'
  },
  {
    id: '4',
    title: 'Gold Jewelry Set - 50 Grams',
    description: 'Beautiful 22K gold jewelry set perfect for special occasions. Show your knowledge and win!',
    entry_fee: 149,
    prize_amount: 350000,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prizeValue: 350000,
    entryFee: 149,
    maxEntries: 2500,
    currentEntries: 678,
    imageUrl: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Jewelry',
    isActive: true,
    _id: '4'
  },
  {
    id: '5',
    title: 'Premium Furniture Set',
    description: 'Complete your home with this premium furniture collection. Answer the quiz to participate!',
    entry_fee: 79,
    prize_amount: 70000,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prizeValue: 70000,
    entryFee: 79,
    maxEntries: 1500,
    currentEntries: 234,
    imageUrl: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Furniture',
    isActive: true,
    _id: '5'
  },
  {
    id: '6',
    title: 'MacBook Pro M3',
    description: 'Latest MacBook Pro with M3 chip for professionals. Test your skills and win this amazing laptop!',
    entry_fee: 179,
    prize_amount: 250000,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prizeValue: 250000,
    entryFee: 179,
    maxEntries: 1800,
    currentEntries: 1123,
    imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    isActive: true,
    _id: '6'
  }
];

// Mock quiz data
const mockQuizzes: { [key: string]: Quiz } = {
  '1': {
    id: 'quiz-1',
    contest_id: '1',
    question: 'What is the capital of Maharashtra, where this apartment is located?',
    options: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    correct_answer: '0',
    points: 1,
    created_at: new Date().toISOString(),
    _id: 'quiz-1',
    contestId: '1',
    correctAnswer: 0
  },
  '2': {
    id: 'quiz-2',
    contest_id: '2',
    question: 'BMW is a car manufacturer from which country?',
    options: ['Italy', 'Germany', 'France', 'Japan'],
    correct_answer: '1',
    points: 1,
    created_at: new Date().toISOString(),
    _id: 'quiz-2',
    contestId: '2',
    correctAnswer: 1
  },
  '3': {
    id: 'quiz-3',
    contest_id: '3',
    question: 'Which company manufactures the iPhone?',
    options: ['Samsung', 'Google', 'Apple', 'Microsoft'],
    correct_answer: '2',
    points: 1,
    created_at: new Date().toISOString(),
    _id: 'quiz-3',
    contestId: '3',
    correctAnswer: 2
  },
  '4': {
    id: 'quiz-4',
    contest_id: '4',
    question: 'What is the purity of 22K gold?',
    options: ['91.6%', '95.8%', '99.9%', '75.0%'],
    correct_answer: '0',
    points: 1,
    created_at: new Date().toISOString(),
    _id: 'quiz-4',
    contestId: '4',
    correctAnswer: 0
  },
  '5': {
    id: 'quiz-5',
    contest_id: '5',
    question: 'Which wood is commonly used for premium furniture?',
    options: ['Pine', 'Teak', 'Bamboo', 'Plastic'],
    correct_answer: '1',
    points: 1,
    created_at: new Date().toISOString(),
    _id: 'quiz-5',
    contestId: '5',
    correctAnswer: 1
  },
  '6': {
    id: 'quiz-6',
    contest_id: '6',
    question: 'What does the "M" in M3 chip stand for?',
    options: ['Memory', 'Machine', 'Metal', 'Max'],
    correct_answer: '0',
    points: 1,
    created_at: new Date().toISOString(),
    _id: 'quiz-6',
    contestId: '6',
    correctAnswer: 0
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Get user profile from users table using maybeSingle to handle no results
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();
    
    if (profileError) throw profileError;
    
    if (!userProfile) {
      // If user profile doesn't exist, try to create it using the service role
      // For now, return the auth user data without creating a profile
      return {
        data: {
          user: {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || email.split('@')[0],
            role: 'user'
          } as AuthUser,
          token: data.session?.access_token || '',
        }
      };
    }
    
    return {
      data: {
        user: {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role
        } as AuthUser,
        token: data.session?.access_token || '',
      }
    };
  },
  
  register: async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('Registration failed');
    }
    
    // Return the auth user data without creating a profile in the users table
    // The profile creation will be handled by database triggers or admin functions
    return {
      data: {
        user: {
          id: data.user.id,
          email: data.user.email || email,
          name: name,
          role: 'user'
        } as AuthUser,
        token: data.session?.access_token || '',
      }
    };
  },
  
  verifyToken: async (token: string) => {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    
    if (!user) throw new Error('Invalid token');
    
    // Get user profile from users table using maybeSingle to handle no results
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (profileError) throw profileError;
    
    if (!userProfile) {
      // If profile doesn't exist, return the auth user data
      return {
        data: {
          user: {
            id: user.id,
            email: user.email || 'unknown@example.com',
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            role: 'user'
          } as AuthUser,
        }
      };
    }
    
    return {
      data: {
        user: {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role
        } as AuthUser,
      }
    };
  },
  
  googleAuth: async (tokenId: string) => {
    throw new Error('Google auth not implemented yet');
  },
};

// Contest API - Returns mock data for now
export const contestAPI = {
  getAll: async () => {
    // Return mock contests for display
    return { data: mockContests };
  },
  
  getById: async (id: string) => {
    const contest = mockContests.find(c => c.id === id || c._id === id);
    if (!contest) throw new Error('Contest not found');
    return { data: contest };
  },
  
  create: async (contest: Partial<Contest>) => {
    const { data, error } = await supabase
      .from('contests')
      .insert([contest])
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Contest };
  },
  
  update: async (id: string, contest: Partial<Contest>) => {
    const { data, error } = await supabase
      .from('contests')
      .update(contest)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Contest };
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('contests')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: null };
  },
  
  getByCategory: async (category: string) => {
    if (category === 'all') {
      return { data: mockContests };
    }
    const filtered = mockContests.filter(c => c.category === category);
    return { data: filtered };
  },
};

// Quiz API - Returns mock data
export const quizAPI = {
  getByContestId: async (contestId: string) => {
    const quiz = mockQuizzes[contestId];
    if (!quiz) throw new Error('Quiz not found');
    return { data: quiz };
  },
  
  create: async (quiz: Partial<Quiz>) => {
    const { data, error } = await supabase
      .from('quizzes')
      .insert([quiz])
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Quiz };
  },
  
  update: async (id: string, quiz: Partial<Quiz>) => {
    const { data, error } = await supabase
      .from('quizzes')
      .update(quiz)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Quiz };
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: null };
  },
  
  submitAnswer: async (contestId: string, selectedAnswer: number) => {
    const quiz = mockQuizzes[contestId];
    if (!quiz) throw new Error('Quiz not found');
    
    const correct = parseInt(quiz.correct_answer) === selectedAnswer;
    
    return {
      data: {
        correct,
        explanation: correct ? 'Correct answer! You are qualified for the draw.' : 'Incorrect answer. Better luck next time!',
        correctAnswer: parseInt(quiz.correct_answer)
      }
    };
  },
};

// Entry API
export const entryAPI = {
  create: async (entry: Partial<Entry>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const entryData = {
      user_id: user.id,
      contest_id: entry.contestId || entry.contest_id,
      answers: entry.answers || {},
      score: entry.score || 0,
      completed_at: entry.completed_at
    };
    
    const { data, error } = await supabase
      .from('entries')
      .insert([entryData])
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert to legacy format
    const legacyEntry: Entry = {
      ...data,
      _id: data.id,
      userId: data.user_id,
      contestId: data.contest_id,
      paymentId: entry.paymentId || 'mock-payment-id',
      paymentStatus: 'completed',
      quizAttempted: false,
      quizPassed: false,
      isQualified: false,
      submittedAt: data.created_at
    };
    
    return { data: legacyEntry };
  },
  
  getUserEntries: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // Convert to legacy format
    const legacyEntries: Entry[] = data.map(entry => ({
      ...entry,
      _id: entry.id,
      userId: entry.user_id,
      contestId: entry.contest_id,
      paymentId: 'mock-payment-id',
      paymentStatus: 'completed' as const,
      quizAttempted: !!entry.completed_at,
      quizPassed: entry.score > 0,
      isQualified: entry.score > 0,
      submittedAt: entry.created_at
    }));
    
    return { data: legacyEntries };
  },
  
  getContestEntries: async (contestId: string) => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('contest_id', contestId);
    
    if (error) throw error;
    
    return { data: data as Entry[] };
  },
  
  updateQuizResult: async (entryId: string, result: { quizPassed: boolean; selectedAnswer: number }) => {
    const { data, error } = await supabase
      .from('entries')
      .update({
        answers: { selectedAnswer: result.selectedAnswer },
        score: result.quizPassed ? 1 : 0,
        completed_at: new Date().toISOString()
      })
      .eq('id', entryId)
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert to legacy format
    const legacyEntry: Entry = {
      ...data,
      _id: data.id,
      userId: data.user_id,
      contestId: data.contest_id,
      paymentId: 'mock-payment-id',
      paymentStatus: 'completed',
      quizAttempted: true,
      quizPassed: result.quizPassed,
      selectedAnswer: result.selectedAnswer,
      isQualified: result.quizPassed,
      submittedAt: data.created_at
    };
    
    return { data: legacyEntry };
  },
};

// Payment API
export const paymentAPI = {
  createOrder: async (contestId: string, amount: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          user_id: user.id,
          contest_id: contestId,
          amount,
          status: 'pending',
          payment_method: 'paypal'
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: { orderId: data.id } };
  },
  
  capturePayment: async (orderId: string, paymentId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .update({
        status: 'completed',
        transaction_id: paymentId
      })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: { success: true } };
  },
  
  getUserPayments: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return { data: data as Payment[] };
  },
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    const [contestsResult, usersResult, entriesResult, paymentsResult] = await Promise.all([
      supabase.from('contests').select('id', { count: 'exact' }),
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('entries').select('id', { count: 'exact' }),
      supabase.from('payments').select('amount').eq('status', 'completed')
    ]);
    
    const totalRevenue = paymentsResult.data?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;
    
    return {
      data: {
        totalContests: contestsResult.count || mockContests.length,
        totalUsers: usersResult.count || 0,
        totalEntries: entriesResult.count || 0,
        totalRevenue
      }
    };
  },
  
  getUsers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return { data };
  },
  
  getAllEntries: async () => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return { data: data as Entry[] };
  },
  
  exportData: async (contestId: string) => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('contest_id', contestId);
    
    if (error) throw error;
    
    // Convert to CSV format
    const csv = [
      ['ID', 'User ID', 'Contest ID', 'Score', 'Completed At', 'Created At'].join(','),
      ...data.map(entry => [
        entry.id,
        entry.user_id,
        entry.contest_id,
        entry.score,
        entry.completed_at,
        entry.created_at
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    return { data: blob };
  },
};

export default { authAPI, contestAPI, quizAPI, entryAPI, paymentAPI, adminAPI };