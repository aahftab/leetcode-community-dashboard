import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ContestResult {
  rank: number;
  name: string;
  contestName: string;
  questionsSolved: number;
  averageTimePerQuestion: number;
}

export default function ContestResultsPage() {
  const { contestId } = useParams();
  const URI = import.meta.env.VITE_DEV_API_ENDPOINT || 'https://esuejqaspbhebyjoycoi.supabase.co/functions/v1';
  const [contestResults, setContestResults] = useState<ContestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContestResults();
  }, [contestId]);

  const fetchContestResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${URI}/contest-results/${contestId}`);
      if (!response.ok) throw new Error('Failed to fetch contest results');
      const data = await response.json();
      setContestResults(data);
    } catch (error) {
      setError('Failed to load contest results');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Contest Results
          </h1>
          {contestResults.length > 0 && (
            <p className="text-gray-600 mt-2">{contestResults[0].contestName}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contestant
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completed
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contestResults.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                    {result.rank}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  {result.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {result.questionsSolved} questions
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {result.averageTimePerQuestion} mins/question
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 