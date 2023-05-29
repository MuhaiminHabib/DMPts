// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


// ** Icon Imports
// import Icon from 'src/@core/components/icon'

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
      sx={{ p: 6, gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}
    >

      {/* <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', background: 'yellow'}}>
        <TextField size='small' 
        placeholder='Search Post' 
        value={value} 
        onChange={e => handleFilter(e.target.value)} 
        />

      </Box> */}

        <Button onClick={toggle} variant='contained'>
          Add Post
        </Button>
     </Box>
  )
}

export default TableHeader