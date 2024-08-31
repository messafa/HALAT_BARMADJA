/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import CircularInfoComponent from "./components/CircularInfoComponent";
import NowProdiction from "./components/NewProdiction";
import axios from "axios";
import Swal from "sweetalert2";

const MilkPage = () => {
  const [milks, setMilks] = useState([]);
  const [maxMilk, setMaxMilk] = useState(0);
  const { colorMode } = useColorMode();

  const token = localStorage.getItem("token");

  const handleSaveProduction = (newProductionData) => {
    setMilks((prevMilks) => [...prevMilks, newProductionData]);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this production? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#303030",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5001/milk/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Production deleted successfully",
              background: "#303030",
            });
            setMilks((prevMilks) =>
              prevMilks.filter((milk) => milk.id !== id)
            );
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong",
              background: "#303030",
            });
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/milk", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMilks(res.data.milkProductions);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("http://localhost:5001/milk/prodiction/max", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaxMilk(res.data.size);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, milks]);

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading fontSize="2xl" fontWeight="bold">
          Our Milk Production
        </Heading>
        <NowProdiction onSave={handleSaveProduction} />
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {milks.map((item) => (
          <CircularInfoComponent
            key={item.id}
            id={item.id}
            addedBy={item.addedBy}
            date={item.date}
            size={item.size}
            progress={parseInt((item.size / maxMilk) * 100)}
            onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MilkPage;