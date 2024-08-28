/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import EditExam from "./EditExam"; // Ensure the path is correct

const MedicalTestCard = ({ test }) => {
  

  

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#303030',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/exam/${test.id}`);
        window.location.reload();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: '#303030',
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the test.",
          icon: "error",
          background:  '#303030',
        });
      }
    }
  };

  const handleSave = (updatedTest) => {
    
    Swal.fire({
      title: "Updated!",
      text: "The test has been updated successfully.",
      icon: "success",
      background: '#303030',
    }).then(() => {
      window.location.reload();
    });
  };// 

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      p={4}
      bg="white"
      _dark={{ bg: "gray.700", borderColor: "gray.600" }}
    >
      <Flex mt={2}>
        <Text fontWeight="bold">ID: </Text>
        <Text ml={2}>{test.id}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Date: </Text>
        <Text ml={2}>{test.date}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Cow ID: </Text>
        <Text ml={2}>{test.cowId}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Disease: </Text>
        <Text ml={2}>{test.disease}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Added By: </Text>
        <Text ml={2}>{test.addedBy}</Text>
      </Flex>
      <Flex mt={4} justifyContent="flex-end">
        <EditExam test={test} onSave={handleSave} />
        <Button colorScheme="red" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default MedicalTestCard;
