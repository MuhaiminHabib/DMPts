// ** MUI Imports
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// interface TableHeaderProps {
//   value?: string
//   toggle: () => void
//   handleFilter?: (val: string) => void
// }

const TableHeader = () => {
  // props: TableHeaderProps
  // ** Props
  // const { toggle } = props

  //States

  //Hooks

  //Functions

  return (
    <Box
      justifyItems={'center'}
      alignItems={'center'}
      sx={{
        px: 4,
        display: 'flex',
        gap: 4,
        justifyContent: 'space-between'
      }}
    >
      <TextField
        size={'medium'}
        id='outlined-basic'
        label='Search by post title or client name'
        variant='outlined'
        sx={{ width: 400 }}
      />

      <Button variant='outlined' sx={{ width: 200 }} size={'large'}>
        Filter
      </Button>
    </Box>
  )
}

export default TableHeader
