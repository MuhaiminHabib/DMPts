// ** MUI Imports
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import FilterModal from './FilterModal'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  setPostList: any
  setNowShowing: any
  setPage: any
  searchPosts: any
}

const TableHeader = ({ setPostList, setNowShowing, setPage, searchPosts }: TableHeaderProps) => {
  // ** Props
  // const { toggle } = props

  //States

  //Hooks
  const router = useRouter()

  //Functions
  const handleSearchTextChange = (criteria: string) => {
    searchPosts({
      criteria,
      type: router.pathname.split('/')[3].charAt(0).toUpperCase()
    })
  }

  return (
    <Box
      justifyItems={'center'}
      alignItems={'center'} // Add this line to vertically center-align the items
      sx={{
        px: 4,
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between'
      }}
    >
      <TextField
        size={'small'}
        id='outlined-basic'
        label='Search by post body or client name'
        variant='outlined'
        sx={{ width: '100%' }}
        onChange={e => handleSearchTextChange(e.target.value)}
      />

      <FilterModal setPostList={setPostList} setNowShowing={setNowShowing} setPage={setPage} />
    </Box>
  )
}

export default TableHeader
