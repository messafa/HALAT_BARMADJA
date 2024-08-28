/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Stack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import EditBirth from "./EditBirth";

function CardComponent({ data, token }) {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const textColor = { light: "black", dark: "white" };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(data);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(()=>{
      window.location.reload();
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/births/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the record.", "error");
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:5001/births/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Updated!", "Your record has been updated.", "success");
      onClose();
    } catch (error) {
      Swal.fire("Error!", "There was an error updating the record.", "error");
    }
  };

  return (
    <>
      <Box
        display="flex"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        maxW="600px"
        bg={bgColor[colorMode]}
        color={textColor[colorMode]}
        m="4"
      >
        <Image
          src="/calf03.jpg"
          alt="Image"
          objectFit="cover"
          width="200px"
          height="auto"
        />
        <Box p="6" flex="1">
          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Mother ID: {data.motherId}
            </Text>
            <Text>Date of Birth: {data.dateBirth}</Text>
            <Text>Gender: {data.gender === "F" ? "Female" : "Male"}</Text>
            <Text>Added By: {data.addedBy}</Text>
            <Stack direction="row" spacing={4} mt={4}>
              <Button colorScheme="green" onClick={onOpen}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <EditBirth
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
      />
    </>
  );
}

export default CardComponent;