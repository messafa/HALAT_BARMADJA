import  { useState } from "react";
import { Box, Button, Heading, Flex, SimpleGrid, useColorMode } from "@chakra-ui/react";
import CircularInfoComponent from "./components/CircularInfoComponent";
import NowProdiction from "./components/NewProdiction"; // استيراد مكون NowProdiction

const generateFakeData = () => {
  const baseDate = new Date();
  return Array.from({ length: 10 }, (_, index) => ({
    addedBy: `User ${index + 1}`,
    date: baseDate.toISOString().split('T')[0], // اليوم الحالي
    size: Math.floor(Math.random() * 1000), // حجم عشوائي بين 0 و 1000
    progress: Math.floor(Math.random() * 100) // نسبة مئوية عشوائية بين 0 و 100
  }));
};

const MilkPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { colorMode } = useColorMode();
  const fakeData = generateFakeData();
  
  // إدارة حالة فتح/إغلاق النافذة المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveProduction = (newProductionData) => {
    // يمكنك إضافة المنطق الخاص بحفظ بيانات الإنتاج الجديدة هنا
    console.log("New Production Data:", newProductionData);
    setIsModalOpen(false);
  };

  return (
    <Box p={4}>
      {/* العنوان وزر الإضافة في نفس السطر */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading fontSize="2xl" fontWeight="bold">
          Our Milk Production
        </Heading>
        <Button colorScheme="teal" variant="solid" onClick={handleOpenModal}>
          Add Production
        </Button>
      </Flex>

      {/* عرض عناصر CircularInfoComponent بناءً على حجم الشاشة */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }} // 1 عمود للشاشات الصغيرة، 2 للشاشات المتوسطة، 3 للشاشات الكبيرة
        spacing={6}
      >
        {fakeData.map((item, index) => (
          <CircularInfoComponent
            key={index}
            addedBy={item.addedBy}
            date={item.date}
            size={item.size}
            progress={item.progress}
          />
        ))}
      </SimpleGrid>

      {/* مكون النافذة المنبثقة NowProdiction */}
      <NowProdiction 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveProduction} 
      />
    </Box>
  );
};

export default MilkPage;