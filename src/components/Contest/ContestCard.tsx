import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Trophy, ArrowRight } from 'lucide-react';
import { Contest } from '../../types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface ContestCardProps {
  contest: Contest;
  index: number;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest, index }) => {
  const progressPercentage = (contest.currentEntries / contest.maxEntries) * 100;
  const entriesLeft = contest.maxEntries - contest.currentEntries;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={contest.imageUrl}
          alt={contest.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {contest.category}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹{contest.prizeValue.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {contest.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {contest.description}
        </p>

        {/* Entry Fee */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">
              Entry Fee: ₹{contest.entryFee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Entries: {contest.currentEntries}/{contest.maxEntries}</span>
            <span>{entriesLeft} left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Contest Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Ends {format(new Date(contest.end_date), 'MMM dd')}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>{contest.currentEntries} participants</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/contest/${contest.id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          <span>Enter Contest</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ContestCard;