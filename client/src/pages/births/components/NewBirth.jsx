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
import { FaPlus } from "react-icons/fa";

const NewBirth = ({ motherId, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    motherId,
    dateBirth: null,
    gender: "M",
    addedBy: localStorage.getItem("name"), // assuming "name" is stored in localStorage
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!formData.dateBirth) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/births", formData, {
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
      <Button onClick={onOpen} colorScheme="green" size="md" mx={2}>
        <FaPlus /> Add Birth
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Birth</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Mother ID</FormLabel>
              <Input
                name="motherId"
                value={formData.motherId}
                readOnly
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateBirth"
                value={formData.dateBirth}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
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
            <FormControl>
              <FormLabel>Added By</FormLabel>
              <Input
                name="addedBy"
                value={formData.addedBy}
                readOnly
              />
            </FormControl>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
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

export default NewBirth;