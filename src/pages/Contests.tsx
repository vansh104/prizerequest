import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { contestAPI } from '../services/api';
import { Contest } from '../types';
import ContestCard from '../components/Contest/ContestCard';
import { motion } from 'framer-motion';

const Contests: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('end_date');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Property', label: 'Property' },
    { value: 'Vehicle', label: 'Vehicle' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Jewelry', label: 'Jewelry' },
    { value: 'Furniture', label: 'Furniture' },
  ];

  const sortOptions = [
    { value: 'end_date', label: 'Ending Soon' },
    { value: 'prizeValue', label: 'Prize Value' },
    { value: 'entryFee', label: 'Entry Fee' },
    { value: 'currentEntries', label: 'Popularity' },
  ];

  useEffect(() => {
    fetchContests();
  }, []);

  useEffect(() => {
    filterAndSortContests();
  }, [contests, searchTerm, selectedCategory, sortBy]);

  const fetchContests = async () => {
    try {
      const response = await contestAPI.getAll();
      setContests(response.data);
    } catch (error) {
      console.error('Error fetching contests:', error);
      // Set empty array on error
      setContests([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortContests = () => {
    let filtered = contests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contest =>
        contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contest => contest.category === selectedCategory);
    }

    // Sort contests
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'end_date':
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        case 'prizeValue':
          return b.prizeValue - a.prizeValue;
        case 'entryFee':
          return a.entryFee - b.entryFee;
        case 'currentEntries':
          return b.currentEntries - a.currentEntries;
        default:
          return 0;
      }
    });

    setFilteredContests(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Active Contests
          </h1>
          <p className="text-xl text-gray-600">
            Choose from {contests.length} exciting contests and win amazing prizes
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Contest Grid */}
        {filteredContests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg">
              No contests found matching your criteria.
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContests.map((contest, index) => (
              <ContestCard key={contest.id} contest={contest} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contests;