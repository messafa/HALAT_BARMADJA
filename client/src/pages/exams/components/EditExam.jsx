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


const EditExam = ({ test, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    date: test.date,
    cowId: test.cowId,
    disease: test.disease,
    addedBy: test.addedBy,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.patch(`http://localhost:5001/exam/${test.id}`, formData, {
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
      <Button onClick={onOpen} colorScheme="blue" size="sm" mx={2}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Exam</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Cow ID</FormLabel>
              <Input
                type="number"
                name="cowId"
                value={formData.cowId}
                onChange={handleChange}
              />
              {errorMessage && (
                <Text color="red.500" mt={2}>
                  {errorMessage}
                </Text>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Disease</FormLabel>
              <Input
                name="disease"
                value={formData.disease}
                onChange={handleChange}
              />
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

export default EditExam;