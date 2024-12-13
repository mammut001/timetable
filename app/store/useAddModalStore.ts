
import {create} from 'zustand'

export type modal ={
  modalStatus: boolean,
  toggleAddModal: (action: boolean) =>void
}

export const useActionModalStore = create<modal>() ((set) =>({
  modalStatus:false,
  toggleAddModal: (action: boolean) =>set({modalStatus:action}),
}))
