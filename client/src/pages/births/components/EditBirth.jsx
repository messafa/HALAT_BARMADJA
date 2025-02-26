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
  Text,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const EditBirth = ({ birth, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    motherId: birth.motherId,
    dateBirth: birth.dateBirth,
    gender: birth.gender,
    addedBy: birth.addedBy,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5001/births/${birth.id}`, formData, {
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
      size="sm"
      p={5} 
      mx={2}
      fontWeight={700}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Birth Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Mother ID</FormLabel>
              <Input
                name="motherId"
                value={formData.motherId}
                onChange={handleChange}
              />
              {errorMessage && (
              <Text color="red.500" mt={2}>
                {errorMessage}
              </Text>
            )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateBirth"
                value={formData.dateBirth}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Added By</FormLabel>
              <Input name="addedBy" value={formData.addedBy} isReadOnly />
            </FormControl>
            
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

export default EditBirth;