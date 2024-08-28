/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";

const EditBirth = ({ isOpen, onClose, formData, setFormData, handleSave }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Birth Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Mother ID</FormLabel>
            <Input
              name="motherId"
              value={formData.motherId}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              name="dateBirth"
              value={formData.dateBirth}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Gender</FormLabel>
            <Input
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            the
 no need for this
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Added By</FormLabel>
            <Input
              name="addedBy"
              value={formData.addedBy}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

};

export default EditBirth;