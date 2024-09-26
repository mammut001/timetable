
import {create} from 'zustand'
import { today } from "@internationalized/date";
import { CalendarDate } from "@nextui-org/react";


export type dateObj ={
  selectedDate: CalendarDate,
  updateDate: (newDate: CalendarDate) =>void
}

export const useDateStore = create<dateObj>() ((set) =>({
  selectedDate:today('america/toronto'),
  updateDate: (newDate: CalendarDate) =>set({selectedDate:newDate}),
}))
