import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Gift, Shield, ArrowRight, Star } from 'lucide-react';
import { contestAPI } from '../services/api';
import { Contest } from '../types';
import ContestCard from '../components/Contest/ContestCard';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [featuredContests, setFeaturedContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await contestAPI.getAll();
        setFeaturedContests(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching contests:', error);
        // Set empty array if there's an error
        setFeaturedContests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Skill-Based & Legal',
      description: 'All contests are skill-based with quiz questions, making them completely legal under Indian law.',
    },
    {
      icon: Trophy,
      title: 'Amazing Prizes',
      description: 'Win cars, apartments, gold, gadgets, and much more. Real prizes worth lakhs of rupees.',
    },
    {
      icon: Users,
      title: 'Fair Competition',
      description: 'Every participant has an equal chance. Answer correctly and get qualified for the draw.',
    },
    {
      icon: Gift,
      title: 'Instant Results',
      description: 'Know immediately if you qualify. Live draws ensure complete transparency.',
    },
  ];

  const stats = [
    { label: 'Happy Winners', value: '1,200+' },
    { label: 'Prizes Won', value: '₹50+ Cr' },
    { label: 'Active Users', value: '50,000+' },
    { label: 'Success Rate', value: '99.9%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Win Amazing Prizes with Your
              <span className="text-yellow-400"> Skills</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              India's premier skill-based contest platform. Answer questions correctly and win cars, apartments, gold, and more!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to="/contests"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Explore Contests</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                How It Works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Contests */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Contests
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of participants in these exciting contests
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredContests.map((contest, index) => (
                <ContestCard key={contest.id} contest={contest} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No contests available</h3>
              <p className="text-gray-500">Check back soon for exciting new contests!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/contests"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>View All Contests</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PrizeWin?
            </h2>
            <p className="text-xl text-gray-600">
              The most trusted and transparent contest platform in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Winners Say
            </h2>
            <p className="text-xl text-gray-300">
              Real stories from real winners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                prize: 'Won ₹50,000 Gold',
                quote: 'I couldn\'t believe it when I won! The quiz was fair and the process was completely transparent.',
              },
              {
                name: 'Rajesh Kumar',
                prize: 'Won iPhone 14 Pro',
                quote: 'Amazing platform! I answered the question correctly and won my dream phone. Highly recommended!',
              },
              {
                name: 'Anita Patel',
                prize: 'Won ₹1.5L Bike',
                quote: 'The best contest platform in India. Fair, legal, and truly rewarding for those who participate.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-blue-400">{testimonial.prize}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Win Amazing Prizes?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of participants and showcase your skills today!
          </p>
          <Link
            to="/contests"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Start Participating</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;