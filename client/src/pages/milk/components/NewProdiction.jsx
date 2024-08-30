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
import Swal from "sweetalert2";

const NowProdiction = ({ onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    date: "",
    size: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setFormData({ date: "", size: "" });
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
    try {
      const token = localStorage.getItem("token");
      
      const resp = await axios.post(
        "http://localhost:5001/milk",
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        }
      );

      if (resp.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Production added successfully",
          background: "#303030",
        });
        handleClose();
        onSave(resp.data);
      } else {
        setErrorMessage("An error occurred.");
      }

    } catch (error) {
      console.error("Error adding production:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while adding production");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="solid">
        Add Production
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Production</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Production Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Milk Size (Liters)</FormLabel>
              <Input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
              />
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

export default NowProdiction;