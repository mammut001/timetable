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
    DropdownTrigger,
    Input,
    TimeInput
  } from "@nextui-org/react";
  import { useToast } from "@/hooks/use-toast"

  import { DateTime } from 'luxon';
  
  import {Chip} from "@nextui-org/react";
  import { useUpdateModalStore } from "@/app/store/useUpdateModalStore";
  import { useState } from "react";
  import { Key } from "react"
  import { ZonedDateTime } from "@internationalized/date"


  import {auth, db } from "@/lib/firebaseConfig"
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { collection, getDocs, addDoc } from 'firebase/firestore';



  export const UpdateTimeModal = () => {
    const { modalStatus, toggleUpdateModal } = useUpdateModalStore();
    const [role, setSelectRole] = useState<string | null>(null)
    const { toast } = useToast()


    const [startTime, setStartTime] = useState<ZonedDateTime | null>(null)
    const [endTime, setEndTime] = useState<ZonedDateTime | null>(null)

    const userIds = [123, 456, 789]

    const handleUpdateModalOpenChange = (isOpen: boolean) => {
      toggleUpdateModal(isOpen)
    }
    const handleOnSelect = (key:Key)=>{
      setSelectRole(String(key))
    }

    const handleAddUser = async () => {
      const usersCollectionRef = collection(db, 'user_data');

      const docRef = await addDoc(usersCollectionRef, {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin'
      })
    
      console.log('Document written with ID:', docRef.id);

    }
    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, 'hello110@gmail.com', '119822')
        console.log('User logged in:', userCredential.user);
      }
      catch (error) 
      {
        console.error('Error logging in:', error);
      }
      
    }
    
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'your-collection'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        
      })
    }
    

    return (
      <>
        <Modal isOpen={modalStatus} onOpenChange={handleUpdateModalOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 ml-2">Update Time</ModalHeader>
                <ModalBody>
                    <div className="flex flex-row gap-2">
                    {userIds.map((userId)=>{
                        return  <Chip >{userId}</Chip>
                    })}
                    </div>

                     <TimeInput
                        value={endTime}
                        onChange={setEndTime}
                        variant="bordered"
                        label="Shift End"
                    />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                        toast({
                        title: "Time Slot: updated",
                        description: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
                        })
                    }}
                    >
                    Submit
                    </Button>
                    <Button onPress={handleAddUser}>Login</Button>
                    <Button onPress={fetchData}>Fetch Data</Button>
  
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
  
  
}