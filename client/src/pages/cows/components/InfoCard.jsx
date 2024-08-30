/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import EditCow from "./EditCow";
import Swal from "sweetalert2";
import axios from "axios";


function InfoCard({ cow, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this cow will also remove all associated medical exams at once.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#303030",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5001/cows/${cow.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          Swal.fire({
            title: "Deleted!",
            text: "The cow has been deleted successfully.",
            icon: "success",
            background: "#303030",
          }).then(() => {
            onUpdate(cow);
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the cow.",
            icon: "error",
            background: "#303030",
          });
        }
      }
    });
  };

  const handleSave = (updatedCow) => {
    Swal.fire({
      title: "Updated!",
      text: "The cow has been updated successfully.",
      icon: "success",
      background: "#303030",
    }).then(() => {
      onUpdate(updatedCow);
    });
  };

  return (
    <Box
      w="97.5%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      mb={3}
      mx={4}
    >
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Image
          src={cow.breed === "Holstein" ? "/pic01.jpg" : "/pic00.jpg"}
          alt="pic"
          borderRadius="lg"
          w={{ base: "100%", md: "50%" }}
          h="200px"
        />
        <VStack
          align="start"
          mt={{ base: "4", md: "0" }}
          ml={{ md: "4" }}
          spacing="2"
        >
          <Text fontSize="lg" fontWeight="bold">
            Breed: {cow.breed}
          </Text>
          <Text>Date of Entry: {cow.date} </Text>
          <Text>Added by: {cow.addedBy}</Text>
        </VStack>
      </Flex>
      <HStack mt="4" spacing="2" justify="center">
        <Button colorScheme="purple" as={'a'} href={`/births/cow/${cow.id}`} >Children</Button>
        <Button colorScheme="green" as={"a"} href={`/exams/cow/${cow.id}`}>
          Health File
        </Button>
        <EditCow cow={cow} onSave={handleSave} />
        <Button colorScheme="red" onClick={handleDelete}>
         <FaTrash />
        </Button>
      </HStack>
    </Box>
  );
}

export default InfoCard;
