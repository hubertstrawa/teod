import {
  Accordion,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Flex,
  Box,
} from '@chakra-ui/react'
import Cash from '../../icons/Cash'

const ActiveQuests = ({ questlog }) => {
  // const { data: questlog, isLoading } = useGetQuestlogQuery()

  // console.log(' QUESTLOG QUEST', questlog)

  return (
    <Accordion defaultIndex={0}>
      {/* <Text textAlign={'left'} marginBottom={5}>
        Aktywne questy
      </Text> */}
      {questlog?.data?.activeQuests?.map((activeQuest) => {
        // const requiredItems = activeQuest.requiredItems.reduce((acc, el) => {
        //   if (acc.includes(el._id)){

        //   }
        // }, [])
        const requiredItems = activeQuest.requiredItems
        // const requiredItems2 = activeQuest.requiredItems.reduce(
        //   (acc, element) => {
        //     const hasElement = acc?.find((_id) => _id === element._id)
        //     if (!!hasElement) {
        //       return hasElement.amount(hasElement.amount + 1)
        //     }
        //     return {
        //       ...element,
        //       amount: 1,
        //     }
        //   },
        //   []
        // )

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
                <Box>
                  <Text>Wymagane:</Text>
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
