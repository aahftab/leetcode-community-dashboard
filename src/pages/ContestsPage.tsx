import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Contest {
  id: string;
  name: string;
  contestDate: string;
  startTime: string;
  endTime: string;
}

interface ContestResult {
  rank: number;
  name: string;
  contestName: string;
  questionsSolved: number;
  averageTimePerQuestion: number;
}

export default function ContestsPage() {
  const URI = import.meta.env.VITE_DEV_API_ENDPOINT || import.meta.env.VITE_PROD_API_ENDPOINT;
  const [contests, setContests] = useState<Contest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await fetch(`${URI}/contests`);
      const data = await response.json();
      setContests(data);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Contests
        </h1>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contests.map((contest) => (
              <tr 
                key={contest.id}
                onClick={() => navigate(`/contests/${contest.id}`)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  {contest.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {contest.contestDate.split('T')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {contest.startTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {contest.endTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 