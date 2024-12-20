// 'use client';
// import { createTheme } from '@mui/material/styles';
// import {Roboto} from 'next/font/google'
// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//  display: 'swap',
//   variable: '--font-roboto',
// });
// const theme = createTheme({
//   typography: {
//     fontFamily: 'var(--font-roboto)',
//   },
// });

// export default theme;
'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
