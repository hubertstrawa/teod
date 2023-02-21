import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Image,
  Flex,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react'

const Dialogue = ({ isDialogueOpen, onDialogueClose }) => {
  return (
    <Modal
      size={'xl'}
      onClose={onDialogueClose}
      isOpen={isDialogueOpen}
      // scrollBehavior='inside'
    >
      <ModalOverlay background={'rgba(0,0,0, 0.9)'} />
      <ModalContent>
        <ModalHeader padding={3} display={'flex'}>
          Wildheart
        </ModalHeader>
        <ModalCloseButton disabled={true} />
        <ModalBody
          // bgImage={'images/background22.png'}
          backgroundSize='100%'
          padding={0}
          height='100%'
          minH={'lg'}
          overflow='hidden'
          position={'relative'}
        >
          <Flex>
            <Box>
              <Image
                // width={'500px'}
                objectFit={'unset'}
                clipPath={'polygon(0% 0%,0% 100%,100% 0%)'}
                src='/images/shaman.png'
              />
            </Box>
            <Box width='50%'>
              <Text>Test</Text>
            </Box>
          </Flex>
          {/* <Box
            position={'absolute'}
            width={'100%'}
            height={'100%'}
            padding={10}
            bgColor={'rgba(0,0,0, 0.8)'}
          >
            <Text>* w oddali widzisz męzczyzne*</Text>
          </Box> */}
        </ModalBody>
        <ModalFooter>
          <Box mr={'auto'}>
            <Button onClick={() => {}}>Dalej</Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Dialogue
