import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true)
      try {
        // const API_ENDPOINT = "http://127.0.0.1:54321/functions/v1/daily-students"
        const API_ENDPOINT = "https://esuejqaspbhebyjoycoi.supabase.co/functions/v1/daily-students"
        const response = await fetch(API_ENDPOINT)
        if (!response.ok) throw new Error('Failed to fetch submissions')
        const data = await response.json()
        setProcessedData(processSubmissions(data))
      } catch (err) {
        setError('An error occurred while fetching submissions')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSubmissions()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const questions = Object.keys(processedData)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>LeetCode Daily Submissions</CardTitle>
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