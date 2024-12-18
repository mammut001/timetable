"use client"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CalendarDate } from "@nextui-org/react";
import React, { useState } from "react"
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

import { collection, getDocs, addDoc } from 'firebase/firestore';
import {auth, db } from "@/lib/firebaseConfig"


export default function Home() {
  dayjs.extend(isoWeek)
  const currDate = useDateStore(state => state.selectedDate)
  const { toggleAddModal } = useActionModalStore()

  const { toggleUpdateModal } = useUpdateModalStore()
  const startOfWeek = dayjs(currDate.toString()).startOf('isoWeek')
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.add(index, 'day').format('MM-DD')
  )
  const updateDate = useDateStore(state => state.updateDate)

  const handleDateSelect = (date: CalendarDate | null) => {
    if (date) {
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
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, ' user_data'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    
    })
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
        <Button onPress={fetchData} className="self-end mr-2" color="success" endContent={<CiUser/>}>
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
        </TableHeader>
        <TableBody>
          
          <TableRow key="1">
            <TableCell>
              <Checkbox defaultSelected />
            </TableCell>
            <TableCell draggable={true} className="cursor-pointer">Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>

          </TableRow>
          
          <TableRow key="2">
            <TableCell>
              <Checkbox defaultSelected />
            </TableCell>
            <TableCell draggable={true} className="cursor-pointer">Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell> Nav</TableCell>

          </TableRow>
          <TableRow key="3">
            <TableCell>
              <Checkbox defaultSelected />
            </TableCell>
            <TableCell draggable={true} className="cursor-pointer">Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>

          </TableRow>
          <TableRow key="4">
            <TableCell>
              <Checkbox defaultSelected />
            </TableCell>
            <TableCell draggable={true} className="cursor-pointer">William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>

          </TableRow>

        </TableBody>
          </Table>
      </Tab>
        <Tab key="availability" title="Availability" className="w-full">
        <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn key="select">Select</TableColumn>

                <TableColumn key="status">Mon|{weekDays[0]}</TableColumn>
                <TableColumn key="status">Tue|{weekDays[1]}</TableColumn>
                <TableColumn key="status">Wed|{weekDays[2]}</TableColumn>
                <TableColumn key="status">Thu{weekDays[3]}</TableColumn>
                <TableColumn key="status">Fri{weekDays[4]}</TableColumn>
                <TableColumn key="status">Sat|{weekDays[5]}</TableColumn>
                <TableColumn key="status">Sun|{weekDays[6]}</TableColumn>

              </TableHeader>
              <TableBody>
                
                <TableRow key="1">
                  <TableCell>
                    <Checkbox defaultSelected />
                  </TableCell>

                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>

                </TableRow>
                
                <TableRow key="2">
                  <TableCell>
                    <Checkbox defaultSelected />
                  </TableCell>

                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>

                  <TableCell>6-3</TableCell>

                </TableRow>
                <TableRow key="3">
                  <TableCell>
                    <Checkbox defaultSelected />
                  </TableCell>

                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>

                </TableRow>
                <TableRow key="4">
                  <TableCell>
                    <Checkbox defaultSelected />
                  </TableCell>

                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>
                  <TableCell>6-3</TableCell>

                </TableRow>

              </TableBody>
            </Table>
        </Tab>
      </Tabs>
 
      <AddModal/>
      <UpdateTimeModal/>
    </section>
  )
}
