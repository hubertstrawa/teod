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
} from '@chakra-ui/react'
import { useFinishQuestMutation } from '../../features/questlog/questlogApiSlice'
import Cash from '../../icons/Cash'

const CompletedQuests = ({ questlog }) => {
  // const { data: questlog, isLoading } = useGetQuestlogQuery()
  // console.log(' QUESTLOG QUEST', questlog)

  console.log(
    'questlog?.data?.completedQuests',
    questlog?.data?.completedQuests
  )
  return (
    <Accordion>
      {questlog?.data?.completedQuests?.map((completedQuest) => {
        const requiredItems = completedQuest.requiredItems

        return (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' fontWeight={'bold'} flex='1' textAlign='left'>
                  {completedQuest.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>{completedQuest.description}</Text>
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
                    Nagroda: {completedQuest.rewardMoney}{' '}
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

export default CompletedQuests
