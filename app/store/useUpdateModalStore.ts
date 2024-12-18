
import {create} from 'zustand'

export type updateModal ={
  modalStatus: boolean,
  toggleUpdateModal: (action: boolean) =>void
}

export const useUpdateModalStore = create<updateModal>() ((set) =>({
  modalStatus:false,
  toggleUpdateModal: (action: boolean) =>set({modalStatus:action}),
}))
