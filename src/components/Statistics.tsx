// @ts-nocheck
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Box,
  StackDivider,
  Text,
} from '@chakra-ui/react'

const Statistics = ({ eq }) => {
  const sumAttack = eq
    ? Object.keys(eq).reduce((acc, curr) => {
        return eq[curr]?.attack ? acc + eq[curr].attack : acc
      }, 0)
    : 0
  const sumDefense = eq
    ? Object.keys(eq).reduce((acc, curr) => {
        return eq[curr]?.defense ? acc + eq[curr].defense : acc
      }, 0)
    : 0
  console.log('sumAttack', sumAttack)
  return (
    <Card>
      {/* <CardHeader>
        <Heading size='md'>Client Report</Heading>
      </CardHeader> */}

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Heading size='xs' textTransform='uppercase'>
              ATAK
            </Heading>
            <Text pt='2' fontSize='sm'>
              {sumAttack}
            </Text>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Heading size='xs' textTransform='uppercase'>
              PANCERZ
            </Heading>
            <Text pt='2' fontSize='sm'>
              {sumDefense}
            </Text>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Heading size='xs' textTransform='uppercase'>
              PANCERZ MAGICZNY
            </Heading>
            <Text pt='2' fontSize='sm'>
              {0}
            </Text>
          </Box>
          {/* <Box>
            <Heading size='xs' textTransform='uppercase'>
              Witalność
            </Heading>
            <Text pt='2' fontSize='sm'>
              Zwiększa ilość HP.
            </Text>
          </Box> */}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Statistics
