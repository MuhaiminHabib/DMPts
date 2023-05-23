// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'


const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FooterContent = () => {
  // ** Var
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© 2023, Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by `}
        <LinkStyled target='_blank' href='http://google.com'>
          SCCI
        </LinkStyled>
      </Typography>

      {/* {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <LinkStyled target='_blank' href='https://themeselection.com/license/'>
            License
          </LinkStyled>
          <LinkStyled target='_blank' href='https://themeselection.com/'>
            More Themes
          </LinkStyled>
          <LinkStyled
            target='_blank'
            href='https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/documentation/'
          >
            Documentation
          </LinkStyled>
          <LinkStyled target='_blank' href='https://themeselection.com/support/'>
            Support
          </LinkStyled>
        </Box>
      )} */}
    </Box>
  )
}

export default FooterContent
