import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Layout from './components/Layout';
import standard from './styles/themes/standard';

const App: React.FC = () =>{
    return (
        <ThemeProvider theme={standard} >
            <GlobalStyles/>
            <Layout/>
        </ThemeProvider>
    )
}

export default App;