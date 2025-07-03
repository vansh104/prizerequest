import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Trophy, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Contest, Quiz, Entry } from '../types';
import { contestAPI, quizAPI, entryAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButton from '../components/Payment/PayPalButton';
import QuizModal from '../components/Quiz/QuizModal';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const ContestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [contest, setContest] = useState<Contest | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'payment' | 'quiz' | 'completed'>('payment');

  useEffect(() => {
    if (id) {
      fetchContestDetails();
    }
  }, [id]);

  const fetchContestDetails = async () => {
    try {
      const [contestResponse, quizResponse] = await Promise.all([
        contestAPI.getById(id!),
        quizAPI.getByContestId(id!)
      ]);

      setContest(contestResponse.data);
      setQuiz(quizResponse.data);

      // Check if user has already entered this contest
      if (user) {
        try {
          const entries = await entryAPI.getUserEntries();
          const userEntry = entries.data.find(e => e.contestId === id || e.contest_id === id);
          if (userEntry) {
            setEntry(userEntry);
            if (userEntry.paymentStatus === 'completed') {
              if (userEntry.quizAttempted) {
                setPaymentStep('completed');
              } else {
                setPaymentStep('quiz');
              }
            }
          }
        } catch (error) {
          console.error('Error checking user entries:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching contest details:', error);
      toast.error('Error loading contest details');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      const newEntry = await entryAPI.create({
        userId: user!.id,
        contestId: id!,
        paymentId,
        paymentStatus: 'completed',
        quizAttempted: false,
        quizPassed: false,
        isQualified: false,
        submittedAt: new Date().toISOString()
      });

      setEntry(newEntry.data);
      setPaymentStep('quiz');
      toast.success('Payment successful! You can now take the quiz.');
    } catch (error) {
      console.error('Error creating entry:', error);
      toast.error('Error processing entry');
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error(error);
  };

  const handleQuizSubmit = async (selectedAnswer: number) => {
    setQuizSubmitting(true);
    try {
      const result = await quizAPI.submitAnswer(id!, selectedAnswer);
      
      // Update entry with quiz result
      if (entry) {
        await entryAPI.updateQuizResult(entry._id || entry.id, {
          quizPassed: result.data.correct,
          selectedAnswer
        });
      }

      setPaymentStep('completed');
      setShowQuiz(false);
      
      if (result.data.correct) {
        toast.success('Congratulations! You answered correctly and are qualified for the draw!');
      } else {
        toast.error('Sorry, that\'s not the correct answer. You are not qualified for this contest.');
      }
      
      // Refresh contest details
      await fetchContestDetails();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Error submitting quiz answer');
    } finally {
      setQuizSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">Contest Not Found</div>
          <button
            onClick={() => navigate('/contests')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Contests
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = (contest.currentEntries / contest.maxEntries) * 100;
  const entriesLeft = contest.maxEntries - contest.currentEntries;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/contests')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Contests</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contest Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={contest.imageUrl}
                  alt={contest.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium">
                  {contest.category}
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {contest.title}
                </h1>
                <p className="text-gray-600 mb-6">
                  {contest.description}
                </p>

                {/* Contest Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-600">Prize Value:</span>
                    <span className="font-bold text-gray-900">
                      ₹{contest.prizeValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Entry Fee:</span>
                    <span className="font-bold text-gray-900">
                      ₹{contest.entryFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    <span className="text-gray-600">Ends:</span>
                    <span className="font-bold text-gray-900">
                      {format(new Date(contest.end_date), 'PPP')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-bold text-gray-900">
                      {contest.currentEntries}/{contest.maxEntries}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Contest Progress</span>
                    <span>{entriesLeft} spots left</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="text-sm text-yellow-800">
                      <strong>Important:</strong> This is a skill-based contest. After payment, you must answer a quiz question correctly to qualify for the prize draw. All contests are conducted in accordance with Indian laws.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Entry Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Enter Contest
              </h2>

              {!user ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Please login to participate in this contest.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Login to Enter
                  </button>
                </div>
              ) : (
                <div>
                  {/* Payment Step */}
                  {paymentStep === 'payment' && (
                    <div>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          ₹{contest.entryFee.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Entry Fee (One-time payment)
                        </div>
                      </div>
                      
                      <PayPalScriptProvider
                        options={{
                          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
                          currency: "USD",
                          intent: "capture"
                        }}
                      >
                        <PayPalButton
                          contestId={contest.id}
                          amount={contest.entryFee}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}

                  {/* Quiz Step */}
                  {paymentStep === 'quiz' && (
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Payment Successful!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Now answer the quiz question to qualify for the contest.
                      </p>
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        Take Quiz
                      </button>
                    </div>
                  )}

                  {/* Completed Step */}
                  {paymentStep === 'completed' && entry && (
                    <div className="text-center">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${
                        entry.quizPassed ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {entry.quizPassed ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-600" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {entry.quizPassed ? 'Congratulations!' : 'Quiz Completed'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {entry.quizPassed 
                          ? 'You answered correctly and are qualified for the prize draw!'
                          : 'You are not qualified for this contest. Better luck next time!'
                        }
                      </p>
                      {entry.quizPassed && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                          You will be notified about the live draw date via email.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quiz Modal */}
      {quiz && (
        <QuizModal
          quiz={quiz}
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onSubmit={handleQuizSubmit}
          loading={quizSubmitting}
        />
      )}
    </div>
  );
};

export default ContestDetail;