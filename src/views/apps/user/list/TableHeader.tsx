// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


interface TableHeaderProps {
  value?: string
  toggle: () => void
  handleFilter?: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle } = props

  return (
    <Box
      sx={{ p: 6, gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end' }}
    >

      <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>


        <Button onClick={toggle} variant='contained'>
          Add User
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
