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
  useToast,
} from "@chakra-ui/react";

const NowProdiction = ({ isOpen, onClose, onSave }) => {
  const [dateEntree, setDateEntree] = useState("");
  const [milkSize, setMilkSize] = useState("");
 
  const toast = useToast();
  const addedBy = "Hisoka"; // القيمة الثابتة

  const handleSave = () => {
    if (!dateEntree || !milkSize) {
      toast({
        title: "Incomplete Data",
        description: "Please fill out all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSave({ dateEntree, milkSize, addedBy });
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
          <FormControl isRequired mt={4}>
            <FormLabel>Milk Size:</FormLabel>
            <Input
              type="number"
              value={milkSize}
              onChange={(e) => setMilkSize(e.target.value)}
            />
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

export default NowProdiction;