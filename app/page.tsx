"use client"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CalendarDate } from "@nextui-org/react";
import React, { useState } from "react"
import {DatePicker} from "@nextui-org/react";
import isoWeek from 'dayjs/plugin/isoWeek';
import { CiUser } from "react-icons/ci";

import {Button} from "@nextui-org/react";
import dayjs from "dayjs";
import { useDateStore } from "@/app/store/useDateStore";
import { AddModal } from "@/components/AddModal";
import { useActionModalStore } from "@/app/store/useAddModalStore";

export default function Home() {
  dayjs.extend(isoWeek)
  const currDate = useDateStore(state => state.selectedDate)
  const {  toggleModal } = useActionModalStore();

  const startOfWeek = dayjs(currDate.toString()).startOf('isoWeek')
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.add(index, 'day').format('MM-DD')
  )
  const updateDate = useDateStore(state => state.updateDate)

  const handleDateSelect = (date: CalendarDate) => {
    updateDate(date)
  };
  const handleOpenAddModal = () =>{
    toggleModal(true)
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
        <Button onClick={handleOpenAddModal} className="self-end" color="success" endContent={<CiUser/>}>
          Add
        </Button>
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="role">ROLE</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
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

            <TableCell draggable={true} className="cursor-pointer">Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>

          </TableRow>
          <TableRow key="2">
            <TableCell draggable={true} className="cursor-pointer">Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell> </TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>

            <TableCell>6-3</TableCell>

          </TableRow>
          <TableRow key="3">
            <TableCell draggable={true} className="cursor-pointer">Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>
            <TableCell>6-3</TableCell>

          </TableRow>
          <TableRow key="4">
            <TableCell draggable={true} className="cursor-pointer">William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
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
      <AddModal/>
    </section>
  );
}
