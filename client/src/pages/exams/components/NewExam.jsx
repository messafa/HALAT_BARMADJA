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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const NewExam = ({ cowId, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    cowId: cowId,
    date: "",
    disease: "",
    addedBy: localStorage.getItem("name"),
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!formData.date || !formData.disease) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post("http://localhost:5001/exam", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave(resp.data);
      setErrorMessage("");
      onClose();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" size="md" mx={2}>
        <FaPlus /> Add Exam
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Exam</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Cow ID</FormLabel>
              <Input name="cowId" value={formData.cowId} readOnly />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Disease</FormLabel>
              <Input
                name="disease"
                value={formData.disease}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Added By</FormLabel>
              <Input name="addedBy" value={formData.addedBy} readOnly />
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

export default NewExam;