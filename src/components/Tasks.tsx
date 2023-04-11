import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Text,
  Button,
  Image,
  Box,
  useDisclosure,
  Stack,
  DrawerCloseButton,
  Progress,
  Flex,
  Alert,
  AlertIcon,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { GiAchievement, GiPirateFlag } from 'react-icons/gi'
import {
  useGetTasklogQuery,
  useGetTasksQuery,
  useStartTaskMutation,
  useFinishTaskMutation,
  useCloseTaskMutation,
} from '../features/tasklog/tasklogApiSlice'
import { useGetBattlelogQuery } from '../features/battlelog/battlelogApiSlice'
import { useRef } from 'react'

const Tasks = ({ isOpen, onClose, handleFight }: any) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: tasklog, isLoading } = useGetTasklogQuery()
  const { data: tasks } = useGetTasksQuery()
  const { data: battlelog } = useGetBattlelogQuery()
  const [startTask, { data }] = useStartTaskMutation()
  const [finishTask, { data: dataFinishTask }] = useFinishTaskMutation()
  const [closeTask, { data: dataCloseTask }] = useCloseTaskMutation()

  const btnRef = useRef()
  const toast = useToast()

  const getMonsterCount = (count, enemyId) => {
    return battlelog?.data?.[enemyId] - count
  }

  // useEffect(() => {
  //   if (data?.message) {
  //     toast({
  //       title: `${data.message}`,
  //       position: 'top-left',
  //       status: 'success',
  //       isClosable: true,
  //     })
  //   }
  // }, [data])

  const onFinishTaskHandle = async () => {
    const { message, availableBoss } = await finishTask(
      tasklog.data.activeTask.idTask
    ).unwrap()
    if (message) {
      toast({
        title: `${message}`,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      })
    }
    handleFight(availableBoss)
  }

  const onCloseTaskHandle = () => {
    closeTask()
  }

  console.log('tasks', tasks)
  console.log('tasklog', tasklog)
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontFamily={'heading'}>Zlecenia</DrawerHeader>

          {tasklog?.data?.activeTask ? (
            <DrawerBody>
              {isLoading ? (
                <Spinner size='xl' />
              ) : (
                <Flex direction='column' height='100%'>
                  <Stack
                    opacity={
                      battlelog?.data?.[tasklog?.data?.activeTask.enemyId] >=
                      tasklog?.data?.activeTask.countEnd
                        ? 0.5
                        : 1
                    }
                    spacing={6}
                  >
                    <Box>
                      <Text>Aktywne zlecenie:</Text>
                      <Text fontSize='lg'>
                        {tasklog?.data?.activeTask.name}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Postęp:</Text>
                      <Text fontSize='xl'>
                        <strong>
                          {getMonsterCount(
                            tasklog?.data?.activeTask.countStart,
                            tasklog?.data?.activeTask.enemyId
                          ) || 0}
                        </strong>{' '}
                        /{' '}
                        {tasklog?.data?.activeTask.countEnd -
                          tasklog?.data?.activeTask.countStart}
                      </Text>
                      <Progress
                        marginTop={2}
                        colorScheme='green'
                        size='lg'
                        value={getMonsterCount(
                          tasklog?.data?.activeTask.countStart,
                          tasklog?.data?.activeTask.enemyId
                        )}
                      />
                      {/* <Button onClick={() => handleFight(1)}>Walcz</Button> */}
                    </Box>
                  </Stack>
                  {battlelog?.data?.[tasklog?.data?.activeTask.enemyId] >=
                    tasklog?.data?.activeTask.countEnd && (
                    <Alert
                      display='flex'
                      flexDirection={'column'}
                      marginTop={6}
                      status='success'
                    >
                      <Flex marginBottom={2} justifyContent={'space-between'}>
                        <AlertIcon />
                        <Heading fontSize='xl'>Zlecenie wykonane</Heading>
                      </Flex>
                      <Text fontSize='sm'>
                        Mozesz teraz odebrać punkty i podjąć się walki z bossem.{' '}
                        <strong>
                          UWAGA! Przygotuj się - jeśli przegrasz, musisz
                          ponownie wykonać zlecenie, aby zawalczyć z bossem.{' '}
                        </strong>
                      </Text>
                      <Button
                        marginTop={3}
                        variant='outline'
                        colorScheme='teal'
                        width='full'
                        onClick={onFinishTaskHandle}
                      >
                        Walcz z bossem
                      </Button>
                    </Alert>
                  )}
                  <Button
                    onClick={onCloseTaskHandle}
                    marginTop={'auto'}
                    // colorScheme={'teal'}
                    variant='outline'
                  >
                    Przerwij zlecenie
                  </Button>
                  <Button
                    marginTop={4}
                    // colorScheme={'teal'}
                    // variant='outline'
                    onClick={onClose}
                  >
                    Zamknij
                  </Button>
                </Flex>
              )}
            </DrawerBody>
          ) : (
            <DrawerBody display='flex' flexDirection={'column'}>
              <Text>
                W zamian za wykonanie zlecenia zdobędziesz punkty tasków oraz
                możliwość jednorazowej walki z bossem, z którego możesz zdobyć
                ekwipunek i inne rzadkie przedmioty. Zlecenia można ponawiać.
              </Text>
              <Text
                fontFamily={'heading'}
                fontSize='xl'
                display='flex'
                justifyContent={'center'}
                alignItems={'center'}
                marginY={6}
                fontWeight='bold'
                color='gold'
              >
                <GiAchievement style={{ marginRight: '3px' }} /> Task points:{' '}
                {tasklog?.data?.taskPoints}
              </Text>
              <Flex marginBottom='auto' direction={'column'}>
                <Stack spacing={6}>
                  {tasks?.data?.map((el, i) => {
                    return (
                      <Box fontFamily='heading' key={i}>
                        <Button
                          marginBottom={2}
                          onClick={() => startTask(el._id)}
                          width='full'
                        >
                          {el.name}{' '}
                          <GiPirateFlag style={{ marginLeft: '6px' }} />
                        </Button>
                        <Flex justifyContent='space-between'>
                          <Text color={'gray.300'} fontSize='sm'>
                            Wymagany poziom: {el.minLevel}
                          </Text>
                          {/* <Text color={'gray.300'} fontSize='sm'>
                            Boss: {el.bossId}
                          </Text> */}
                        </Flex>
                      </Box>
                    )
                  })}
                </Stack>
              </Flex>
              <Button
                colorScheme={'teal'}
                variant='outline'
                // mr={3}
                onClick={onClose}
              >
                Zamknij
              </Button>
            </DrawerBody>
          )}

          <DrawerFooter>
            <Image src={'/characters/hunter.png'} />

            {/* <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Tasks
