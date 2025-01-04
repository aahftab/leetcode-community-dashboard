import { Card } from "@/components/ui/card"

export default function Header() {
  return (
    <Card className="w-full mb-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/CSSLeetcodeCommunity.png"
            alt="LeetCode Community Dashboard" 
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold">LeetCode Community Dashboard</h1>
        </div>
      </div>
    </Card>
  )
}