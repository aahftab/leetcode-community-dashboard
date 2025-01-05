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
      const API_ENDPOINT = import.meta.env.VITE_DEV_API_ENDPOINT || "https://esuejqaspbhebyjoycoi.supabase.co/functions/v1/daily-students"
      const response = await fetch(API_ENDPOINT)
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
      <ReloadIcon className="h-8 w-8 animate-spin" />
    </div>
  )

  if (error) return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 font-medium">{error}</div>
        <Button onClick={fetchSubmissions}>Try Again</Button>
      </CardContent>
    </Card>
  )

  const questions = Object.keys(processedData)

  if (questions.length === 0) return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center h-64">
        <p className="text-neutral-500">No submissions found today</p>
      </CardContent>
    </Card>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Daily LeetCode Progress</CardTitle>
            <CardDescription>
              Track community submissions for {questions.length} problems
            </CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className="text-sm text-neutral-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={fetchSubmissions}
              disabled={isLoading}
            >
              <ReloadIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {questions.map((question, qIndex) => (
                  <TableHead key={question} className="text-center">
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm text-neutral-500">#{qIndex + 1}</span>
                      <a
                        href={`https://leetcode.com/problems/${question}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group hover:text-blue-600 transition-colors"
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
                  <TableCell key={question} className="align-top">
                    {processedData[question][0].username === null ? (
                      <EmptyQuestionState />
                    ) : (
                      processedData[question]
                        .sort((a, b) => new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime())
                        .map((submission, index) => (
                          <div key={index} className="flex flex-col items-center space-y-2 p-2 rounded-md hover:bg-neutral-50 transition-colors">
                            <div className="relative">
                              <a
                                href={`https://leetcode.com/${submission.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium hover:text-blue-600 transition-colors"
                              >
                                {submission.name || submission.username}
                              </a>
                              {getMedalEmoji(index) && (
                                <span 
                                  className="absolute -top-1 -right-6 animate-bounce"
                                  title={`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} to solve`}
                                >
                                  {getMedalEmoji(index)}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <Badge variant="outline" className="px-2 py-0.5">
                                {submission.lang}
                              </Badge>
                              <time 
                                dateTime={submission.solved_at}
                                className="text-xs text-neutral-400"
                              >
                                {formatTimestamp(submission.solved_at)}
                              </time>
                            </div>
                          </div>
                      ))
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}