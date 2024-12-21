"use client"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CalendarDate } from "@nextui-org/react";
import React, { useState, useEffect} from "react"
import {DatePicker} from "@nextui-org/react";
import isoWeek from 'dayjs/plugin/isoWeek';
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import {Button} from "@nextui-org/react";
import dayjs from "dayjs";
import { useDateStore } from "@/app/store/useDateStore";
import { useUpdateModalStore } from "@/app/store/useUpdateModalStore";
import { AddModal } from "@/components/AddModal";
import { UpdateTimeModal } from "@/components/UpdateTimeModal";
import { useActionModalStore } from "@/app/store/useAddModalStore";
import {Checkbox} from "@nextui-org/react";
import {Tabs, Tab} from "@nextui-org/react";

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig"
import { any } from "prop-types";


export default function Home() {
  dayjs.extend(isoWeek)
  const currDate = useDateStore(state => state.selectedDate)
  const { toggleAddModal } = useActionModalStore()

  const { toggleUpdateModal } = useUpdateModalStore()
  const startOfWeek = dayjs(currDate.toString()).startOf('isoWeek')
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.add(index, 'day').format('YY-MM-DD')
  )
  const updateDate = useDateStore(state => state.updateDate)
  const [availability, setAvailability] = useState<any[]>([])

  const [employees, setEmployees] = useState<any[]>([])

  useEffect(() => {
    fetchAvailabilityData()
  }, [])

  const handleDateSelect = (date: CalendarDate | null) => {
    if (date) {
      console.log(date.toString())
      console.log(availability[0].week_of_month.split('/'))
      console.log(weekDays)
      updateDate(date)
    }
  }

  const handleOpenAddModal = () =>{
    toggleAddModal(true)
  }

  const handleOpenUpdateModal = () =>{
    console.log("Opening update modal")
    toggleUpdateModal(true)

  }

  const fetchAvailabilityData = async () => {
    const employeeAvailabilitySnapshot = await getDocs(collection(db, 'employee_availability'))
    const userSnapShot = await getDocs(collection(db, 'user_data'))


    const users = userSnapShot.docs.map((doc) => (
      {
        id: doc.id, 
        email: doc.data().email,
        name: doc.data().name, 
        role: doc.data().role
      }))


    const employees = userSnapShot.docs.map((doc) => (
      {
        id: doc.id,
        name: doc.data().name,
        role: doc.data().role,
        status: doc.data().status,
        email: doc.data().email,
        tel: doc.data().tel
      }))

    
    const data = employeeAvailabilitySnapshot.docs.map((doc)=>{
      const availability = doc.data()
      const userData = users.find((user)=> user.email === availability.email)
      return {
        name: userData?.name,
        role: userData?.role,
        ...availability,
      }
    })
    setEmployees(employees)
    setAvailability(data)
  }
  


  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-row justify-between items-start w-full ">
        <DatePicker
          label="Select date"
          value={currDate}
          onChange={handleDateSelect}
          className="self-start max-w-[284px]"
        />
        <div>
        <Button className="self-end mr-2" color="success" endContent={<CiUser/>}>
          Add
        </Button>
        <Button onPress={handleOpenUpdateModal} className="self-end" color="primary" endContent={<CiEdit/>}>
          Update
        </Button>
        </div>
      </div>

    <Tabs aria-label="Tabs" className="w-full">
      <Tab key="users" title="Users" className="w-full">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn key="select">Select</TableColumn>
              <TableColumn key="name">NAME</TableColumn>
              <TableColumn key="role">ROLE</TableColumn>
              <TableColumn key="status">STATUS</TableColumn>
              <TableColumn key="contact">EMAIL</TableColumn>
              <TableColumn key="tel">PHONE</TableColumn>

            </TableHeader>
        <TableBody>
          {

            employees.map((employee)=>(

              <TableRow key={employee.id}>
                <TableCell>
                  <Checkbox defaultSelected />
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.tel}</TableCell>


              </TableRow>
            ))
          }
        </TableBody>
          </Table>
      </Tab>
        <Tab key="availability" title="Availability" className="w-full">
        <Table aria-label="Employee Availability">
              <TableHeader>
                <TableColumn key="select">Select</TableColumn>
                <TableColumn key="name">NAME</TableColumn>
                <TableColumn key="role">ROLE</TableColumn>

                <TableColumn key="monday">Mon|{weekDays[0]}</TableColumn>
                <TableColumn key="tuesday">Tue|{weekDays[1]}</TableColumn>
                <TableColumn key="wednesday">Wed|{weekDays[2]}</TableColumn>
                <TableColumn key="thursday">Thu{weekDays[3]}</TableColumn>
                <TableColumn key="friday">Fri{weekDays[4]}</TableColumn>
                <TableColumn key="saturday">Sat|{weekDays[5]}</TableColumn>
                <TableColumn key="sunday">Sun|{weekDays[6]}</TableColumn>

              </TableHeader>
              <TableBody>
                {
                  availability.map((user)=>(
                    
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox defaultSelected />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.monday}</TableCell>
                      <TableCell>{user.tuesday}</TableCell>
                      <TableCell>{user.wednesday}</TableCell>
                      <TableCell>{user.thursday}</TableCell>
                      <TableCell>{user.friday}</TableCell>
                      <TableCell>{user.saturday}</TableCell>
                      <TableCell>{user.sunday}</TableCell>

                    </TableRow>
                  ))
                }
                
             
              </TableBody>
            </Table>
        </Tab>
      </Tabs>
 
      <AddModal/>
      <UpdateTimeModal/>
    </section>
  )
}
