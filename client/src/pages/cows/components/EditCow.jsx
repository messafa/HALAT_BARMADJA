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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";


const EditCow = ({ cow, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    entryDate: cow.entryDate,
    breed: cow.breed,
    addedBy: cow.addedBy,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5001/cows/${cow.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave(formData);
      setErrorMessage("");
      onClose();

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };
  
  return (
    <>
      <Button 
      onClick={onOpen} 
      colorScheme="blue" 
      size="md" 
      mx={2}>
        <FaEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Cow</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Breed</FormLabel>
              <Select
                name="breed"
                value={formData.breed}
                onChange={handleChange}
              >
                <option value="Holstein">Holstein</option>
                <option value="Montbéliarde">Montbéliarde</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Date of Entry</FormLabel>
              <Input
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Added By</FormLabel>
              <Input
                name="addedBy"
                value={formData.addedBy}
                onChange={handleChange}
              />
            </FormControl>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button colorScheme="red" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCow;
