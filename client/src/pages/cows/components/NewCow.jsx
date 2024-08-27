/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

const NewCow = ({ isOpen, onClose, onSave }) => {
  const [dateEntree, setDateEntree] = useState("");
  const [race, setRace] = useState("");
  const toast = useToast();
  const addedBy = "Hisoka"; // القيمة الثابتة

  const handleSave = () => {
    if (!dateEntree || !race) {
      toast({
        title: "Incomplete Data",
        description: "Please fill out all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSave({ dateEntree, race, addedBy });
    onClose();
    toast({
      title: "Cow Added",
      description: "The new cow has been added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Cow</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Date Entree</FormLabel>
            <Input
              type="date"
              value={dateEntree}
              onChange={(e) => setDateEntree(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Race</FormLabel>
            <Select
              placeholder="Select race"
              value={race}
              onChange={(e) => setRace(e.target.value)}
            >
              <option value="Holstein">Holstein</option>
              <option value="Montbéliarde">Montbéliarde</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Add by</FormLabel>
            <Input value={addedBy} isReadOnly /> {/* الحقل غير قابل للتعديل */}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewCow;