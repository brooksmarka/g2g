import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		success: {
			main: '#eafaed',
			contrastText: '#000',
		},
		error: {
			main: '#fce8e8',
			dark: '#d33e05',
			contrastText: '#692324',
		},
		primary: {
			main: '#1f5d44',
			light: '#4b8b6b',
			dark: '#123d2b',
			contrastText: '#fff',
		},
	},
	components: {
		MuiChip: {
			styleOverrides: {
				root: {
					'&.MuiChip-color-lightGreen': {
						backgroundColor: '#eafaed',
						color: '#000',
					},
				},
			},
		},
	},
})

export default theme
