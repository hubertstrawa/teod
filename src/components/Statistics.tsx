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

const Statistics = () => {
  return (
    <Card>
      {/* <CardHeader>
        <Heading size='md'>Client Report</Heading>
      </CardHeader> */}

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Siła
            </Heading>
            <Text pt='2' fontSize='sm'>
              Zwiększa atak z bronii.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Inteligencja
            </Heading>
            <Text pt='2' fontSize='sm'>
              Zwiększa atak z magii.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Witalność
            </Heading>
            <Text pt='2' fontSize='sm'>
              Zwiększa ilość HP.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Statistics
