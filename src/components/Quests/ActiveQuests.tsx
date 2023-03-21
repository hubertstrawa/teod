import {
  Accordion,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Flex,
  Button,
  Box,
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFinishQuestMutation } from '../../features/questlog/questlogApiSlice'
import Cash from '../../icons/Cash'

const ActiveQuests = ({ questlog }) => {
  // const { data: questlog, isLoading } = useGetQuestlogQuery()
  const [finishQuest, { error, data }] = useFinishQuestMutation() as any
  const toast = useToast()

  useEffect(() => {
    console.log(' QUESTLOG error', error)

    if (error?.data?.message) {
      toast({
        position: 'top-right',
        status: 'error',
        title: error.data.message,
        isClosable: true,
      })
    }
    if (data?.message) {
      toast({
        position: 'top-right',
        status: 'success',
        title: data.message,
        isClosable: true,
      })
    }
  }, [error, data])

  return (
    <Accordion defaultIndex={0}>
      {questlog?.data?.activeQuests?.map((activeQuest) => {
        const requiredItems = activeQuest.requiredItems

        return (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' fontWeight={'bold'} flex='1' textAlign='left'>
                  {activeQuest.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>{activeQuest.description}</Text>
              <Stack spacing={4}>
                <Box marginBottom={6}>
                  <Text textAlign={'left'}>Wymagane:</Text>
                  {requiredItems.map((item) => {
                    return (
                      <Box
                        // as={motion.div}
                        mt={5}
                        display={'flex'}
                        alignItems={'center'}
                        // variants={item}
                      >
                        <Text>
                          1x <strong>{item.name} </strong>
                        </Text>
                        <img
                          style={{
                            marginLeft: '5px',
                            width: '20px',
                            height: '20px',
                          }}
                          src={item.image}
                        />
                      </Box>
                    )
                  })}
                </Box>
                <Flex alignItems={'center'}>
                  <Text marginRight={2}>
                    Nagroda: {activeQuest.rewardMoney}{' '}
                  </Text>
                  <Cash />
                </Flex>
                <Button
                  alignSelf={'flex-end'}
                  variant={'outline'}
                  colorScheme='teal'
                  onClick={() => finishQuest(activeQuest._id)}
                >
                  Zakończ quest
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        )
      })}
      {/* <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>{' '}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>{' '}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>{' '}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>{' '}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem> */}
    </Accordion>
  )
}

export default ActiveQuests
