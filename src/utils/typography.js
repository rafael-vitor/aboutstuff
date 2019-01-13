import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => {
  return {
    'body': {
      backgroundColor: '#EAEAEA',
    },
    'a': {
      color: '#477998',
    },
    'p': {
      color: '#351431',
    },
    'h': {
      color: '#354F52',
    },
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
