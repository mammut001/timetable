import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownItem, DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { useActionModalStore } from "@/app/store/useAddModalStore";
import {Input} from "@nextui-org/react";
import { useState } from "react";
import { Key } from "react"
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"

export const AddModal = () => {
  const { modalStatus, toggleAddModal } = useActionModalStore();
  const [role, setSelectRole] = useState<string | null>(null)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [tel, setTel] = useState<string>("")
  const handleAddModalOpenChange = (isOpen: boolean) => {
    toggleAddModal(isOpen)
  }

  const handleOnSelect = (key:Key)=>{
    setSelectRole(String(key))
  }
  const handleSubmit = async (onClose: () => void) => {
    let form = {
      name,
      email,
      tel,
      role
    }
    try {
      const docRef = await addDoc(collection(db,"user_data"),{
        name: form.name,
        email: form.email,
        tel: form.tel,
        role: form.role,
        status: "Activate"
      })
      console.log("Document written with ID: ", docRef.id)
      window.location.reload()
      onClose()
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <Modal isOpen={modalStatus} onOpenChange={handleAddModalOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1 ml-2">Details</ModalHeader>
                <ModalBody>
                  <Input type="text" label="Name" value={name} onChange={(e) =>setName(e.target.value)} />
                  <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input type="tel" label="Phone Number" value={tel} onChange={(e)=>setTel(e.target.value)}/>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                      >
                        Select Roles
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" onAction={handleOnSelect}>
                      <DropdownItem key="Manager">Manager</DropdownItem>
                      <DropdownItem key="Worker">Worker</DropdownItem>
                      <DropdownItem key="Engineer">Engineer</DropdownItem>

                    </DropdownMenu>
                  </Dropdown>
                  <p>{role}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => handleSubmit(onClose)}>
                    Submit
                  </Button>

                </ModalFooter>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </>
  );

}