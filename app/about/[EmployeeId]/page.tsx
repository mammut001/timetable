"use client"
import { title } from "@/components/primitives"
import { Button, TimeInput } from "@nextui-org/react"
import { FaPlus } from "react-icons/fa"
import { ZonedDateTime } from "@internationalized/date"
import { useState, useEffect } from "react"

export default function EmployeePage({ params }: { params: { EmployeeId: string } }) {
  const employeeId = decodeURIComponent(params.EmployeeId)
  const [startTime, setStartTime] = useState<ZonedDateTime | null>(null)
  const [endTime, setEndTime] = useState<ZonedDateTime | null>(null)
  const [totalHours, setTotalHours] = useState<string>("0.00")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const calculateTotalHours = () => {
    if (startTime && endTime) {
      const duration = {
        hours: startTime.hour,
        minutes: startTime.minute,
        seconds: startTime.second,
        milliseconds: startTime.millisecond,
      }

      console.log("startTime", startTime.millisecond)
      console.log("difference", endTime.subtract(duration) )
      setTotalHours(endTime.subtract(duration).toString())
    }
    return "0.00"
  }

  return (
    <main className="container mx-auto p-4 relative min-h-screen">
      <div className="flex flex-wrap gap-4 w-full">
        <h1 className={title()}>UserID & User Name</h1>
        <h2>Employee ID is {employeeId}</h2>
        {isClient && (
          <div className="flex flex-row justify-between items-start w-full">
            <TimeInput
              value={startTime}
              onChange={setStartTime}
              className="mr-2"
              variant="bordered"
              label="Shift Start"
            />
            <TimeInput
              value={endTime}
              onChange={setEndTime}
              variant="bordered"
              label="Shift End"
            />
          </div>
        )}
        <h3>Total Hours: {totalHours}</h3>
      </div>
      <div className="fixed right-4 bottom-4">
        <Button
          onPress={calculateTotalHours}
          className="rounded-full p-3 shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-green-500 hover:text-black"
        >
          Add
          <FaPlus />
        </Button>
      </div>
    </main>
  )
}
