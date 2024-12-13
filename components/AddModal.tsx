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
export const AddModal = () => {
  const { modalStatus, toggleAddModal } = useActionModalStore();
  const [role, setSelectRole] = useState<string | null>(null)

  const handleAddModalOpenChange = (isOpen: boolean) => {
    toggleAddModal(isOpen)
  }

  const handleOnSelect = (key:Key)=>{
    setSelectRole(String(key))
  }
  return (
    <>
      <Modal isOpen={modalStatus} onOpenChange={handleAddModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ml-2">Details</ModalHeader>
              <ModalBody>
                <Input type="text" label="Name" />
                <Input type="email" label="Email" />
                <Input type="tel" label="Phone Number" />
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
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );

}