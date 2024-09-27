
import {create} from 'zustand'

export type modal ={
  modalStatus: boolean,
  toggleModal: (action: boolean) =>void
}

export const useActionModalStore = create<modal>() ((set) =>({
  modalStatus:false,
  toggleModal: (action: boolean) =>set({modalStatus:action}),
}))
