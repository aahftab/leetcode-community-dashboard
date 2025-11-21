import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

interface LeetCodeSubmission {
  username: string
  name: string
  question_slug: string
  lang: string
  solved_at: string
}

interface ProcessedSubmission {
  [key: string]: {
    username: string
    name: string
    lang: string
    solved_at: string
  }[]
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

const getMedalEmoji = (index: number) => {
  switch (index) {
    case 0: return '🥇'
    case 1: return '🥈'
    case 2: return '🥉'
    default: return null
  }
}

const EmptyQuestionState = () => (
  <div className="flex flex-col items-center justify-center p-4 text-neutral-400">
    <div className="text-2xl mb-2">📝</div>
    <div className="text-sm">No submissions</div>
  </div>
)

export default function Dashboard() {
  const [processedData, setProcessedData] = useState<ProcessedSubmission>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const processSubmissions = (data: LeetCodeSubmission[]) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.question_slug]) {
        acc[curr.question_slug] = []
      }
      acc[curr.question_slug].push({
        username: curr.username,
        name: curr.name,
        lang: curr.lang,
        solved_at: curr.solved_at
      })
      return acc
    }, {} as ProcessedSubmission)
  }

  const formatQuestionName = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const API_ENDPOINT = import.meta.env.VITE_DEV_API_ENDPOINT || import.meta.env.VITE_PROD_API_ENDPOINT
      const response = await fetch(API_ENDPOINT+"/daily-students")
      if (!response.ok) throw new Error('Failed to fetch submissions')
      const data = await response.json()
      setProcessedData(processSubmissions(data))
      setLastUpdated(new Date())
    } catch (err) {
      setError('An error occurred while fetching submissions. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <ReloadIcon className="h-8 w-8 animate-spin text-indigo-600" />
    </div>
  )

  if (error) return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 font-medium">{error}</div>
        <Button 
          onClick={fetchSubmissions}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Try Again
        </Button>
      </div>
    </div>
  )

  const questions = Object.keys(processedData)

  if (questions.length === 0) return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No submissions found today</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Daily LeetCode Progress
          </h1>
          <p className="text-gray-600 mt-2">
            Tracking {questions.length} problems solved by the community today
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Last updated:</span>
              <time className="font-medium">{lastUpdated.toLocaleTimeString()}</time>
            </div>
          )}
          <Button
            onClick={fetchSubmissions}
            disabled={isLoading}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <ReloadIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                {questions.map((question, qIndex) => (
                  <TableHead key={question} className="text-center py-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-gray-400">Problem {qIndex + 1}</span>
                      <a
                        href={`https://leetcode.com/problems/${question}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-gray-900 font-medium hover:text-blue-600 transition-colors"
                      >
                        {formatQuestionName(question)}
                        <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </a>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {questions.map((question) => (
                  <TableCell key={question} className="align-top p-6">
                    {processedData[question][0].username === null ? (
                      <EmptyQuestionState />
                    ) : (
                      <div className="space-y-4">
                        {processedData[question]
                          .sort((a, b) => new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime())
                          .map((submission, index) => (
                            <div 
                              key={index} 
                              className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all"
                            >
                              <div className="relative mb-3">
                                <a
                                  href={`https://leetcode.com/${submission.username}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                  {submission.name || submission.username}
                                </a>
                                {getMedalEmoji(index) && (
                                  <span 
                                    className="absolute -top-1 -right-6"
                                    title={`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} to solve`}
                                  >
                                    {getMedalEmoji(index)}
                                  </span>
                                )}
                              </div>
                              <span className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-full mb-2">
                                {submission.lang}
                              </span>
                              <time 
                                dateTime={submission.solved_at}
                                className="text-xs text-gray-400"
                              >
                                {formatTimestamp(submission.solved_at)}
                              </time>
                            </div>
                        ))}
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}