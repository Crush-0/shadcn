import { Progress } from "@/components/ui/progress"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      task: "集成测试",
      email: "m@example.com",
      startTime:10,
      endTime: 100,
      time: 90
    },
    {
        id: "728ed53f",
        amount: 100,
        task: "集成测试",
        email: "s@example.com",
        startTime: 40,
        endTime: 70,
        time: 30
    },
    {
        id: "728ed53f",
        amount: 100,
        task: "集成测试",
        email: "s@example.com",
        startTime: 70,
        endTime: 160,
        time: 90
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
