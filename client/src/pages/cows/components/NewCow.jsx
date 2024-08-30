/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
import Swal from "sweetalert2";

const NewCow = ({ onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    entryDate: "",
    breed: "",
    addedBy: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("name");
    setFormData((prevData) => ({
      ...prevData,
      addedBy: nameFromStorage || "Unknown",
    }));
  }, []);

  const resetForm = () => {
    setFormData({
      entryDate: "",
      breed: "",
      addedBy: localStorage.getItem("name") || "Unknown",
    });
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (!formData.entryDate || !formData.breed) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const resp = await axios.post(
        "http://localhost:5001/cows",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (resp.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The new cow has been added successfully.",
          background: "#303030",
        });
        handleClose();
        onSave(resp.data);
      } else {
        setErrorMessage("An error occurred.");
      }
    } catch (error) {
      console.error("Error adding cow:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while adding cow");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="solid">
        Add New Cow
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Cow</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isRequired>
              <FormLabel>Entry Date</FormLabel>
              <Input
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Breed</FormLabel>
              <Select
                name="breed"
                placeholder="Select breed"
                value={formData.breed}
                onChange={handleChange}
              >
                <option value="Holstein">Holstein</option>
                <option value="Montbéliarde">Montbéliarde</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Added by</FormLabel>
              <Input value={formData.addedBy} isReadOnly />
            </FormControl>
            {errorMessage && (
              <Text color="red.500" mt={2}>
                {errorMessage}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewCow;