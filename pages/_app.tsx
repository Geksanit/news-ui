import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { StoreContext, stores } from 'stores/stores';

import 'styles/global.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <StoreContext.Provider value={stores}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    </MuiPickersUtilsProvider>
  </>
);

export default App;
