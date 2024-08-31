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
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import EditBirth from "./EditBirth";

function CardComponent({ data , setBirths }) {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const textColor = { light: "black", dark: "white" };
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
      background: "#303030",
    });
    const token = localStorage.getItem("token");
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/births/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "The record has been deleted.",
          icon: "success",
          background: "#303030",
        }).then(() => {
          setBirths((prev) => prev.filter((birth) => birth.id !== data.id));
        });
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "There was an error deleting the record.",
          icon: "error",
          background: "#303030",
        });
      }
    }
  };

  const handleSave = (updatedBirth) => {
    setFormData(updatedBirth);
    Swal.fire({
      title: "Updated!",
      text: "The record has been updated.",
      icon: "success",
      background: "#303030",
    }).then(() => {
      window.location.reload();
    });
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
              <EditBirth birth={data} onSave={handleSave} />
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default CardComponent;