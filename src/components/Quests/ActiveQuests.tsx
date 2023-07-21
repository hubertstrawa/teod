import {
  Accordion,
  Text,
  AccordionItem,
  AccordionButton,
  Heading,
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
    if (data?.message) {
      toast({
        position: 'top-right',
        status: 'success',
        title: data.message,
        isClosable: true,
      })
    }
  }, [data])

  return (
    <Accordion defaultIndex={0}>
      {questlog?.data?.activeQuests.length > 0 ? (
        questlog?.data?.activeQuests?.map((activeQuest) => {
          const requiredItems = activeQuest.requiredItems.reduce(
            (acc, curr) => {
              const itemFindIndex = acc.findIndex((el) => el._id === curr._id)

              if (itemFindIndex !== -1) {
                acc[itemFindIndex].amount = acc[itemFindIndex].amount + 1
                return acc
              }

              acc.push({ ...curr, amount: 1 })
              return acc
            },
            []
          )

          return (
            <AccordionItem>
              <AccordionButton py={4}>
                <Box as='span' fontWeight={'bold'} flex='1' textAlign='left'>
                  <Heading fontSize='xl'>{activeQuest.name} </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text marginBottom={8} textAlign={'left'}>
                  {activeQuest.description}
                </Text>
                <Stack spacing={4}>
                  <Box marginBottom={6}>
                    <Text fontFamily='heading' textAlign={'left'}>
                      Wymagania:
                    </Text>
                    {requiredItems.map((item) => {
                      return (
                        <Box
                          // as={motion.div}
                          mt={1}
                          display={'flex'}
                          alignItems={'center'}
                          // variants={item}
                        >
                          <Text>
                            {item.amount}x <strong>{item.name} </strong>
                          </Text>
                          <img
                            style={{
                              marginLeft: '8px',
                              width: '26px',
                              height: '26px',
                            }}
                            src={item.image}
                          />
                        </Box>
                      )
                    })}
                  </Box>
                  <Flex alignItems={'center'}>
                    <Text
                      fontFamily='heading'
                      alignItems='center'
                      marginRight={2}
                    >
                      Nagroda:
                    </Text>
                    <Text> {activeQuest.rewardMoney} </Text>
                    <Cash />
                  </Flex>
                  <Button
                    alignSelf={'flex-end'}
                    variant={'outline'}
                    colorScheme='purple'
                    onClick={() => finishQuest(activeQuest._id)}
                  >
                    Zakończ quest
                  </Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          )
        })
      ) : (
        <Text>Brak aktywnych questów</Text>
      )}
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
