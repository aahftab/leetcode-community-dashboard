import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

interface LeetCodeSubmission {
  username: string
  question_slug: string
  lang: string
}

interface ProcessedSubmission {
  [key: string]: {
    username: string
    lang: string
  }[]
}

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
        lang: curr.lang
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
      const API_ENDPOINT = "https://esuejqaspbhebyjoycoi.supabase.co/functions/v1/daily-students"
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
                {questions.map((question) => (
                  <TableHead key={question} className="text-center">
                    <a
                    href={`https://leetcode.com/problems/${question}`} 
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      {formatQuestionName(question)}
                      </a>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {questions.map((question) => (
                  <TableCell key={question} className="align-top">
                    {processedData[question].map((submission, idx) => (
                      <div key={idx} className="mb-2 text-center">
                        <div>{submission.username}</div>
                        <Badge 
                          variant="outline" 
                          className="mt-1"
                          style={{
                            backgroundColor: '#3572A5',
                            color: 'white',
                            textTransform: 'capitalize'
                          }}
                        >
                          {submission.lang}
                        </Badge>
                      </div>
                    ))}
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