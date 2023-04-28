import React from 'react';

import { Grid } from './styles';

import MainHeader from '../MainHeader';
import Content from '../Content';
import Aside from '../Aside';

interface Props {
  children?:React.ReactNode
}
const Layout: React.FC<Props> = ({children}) => {
  return  <Grid>
            <MainHeader/>
            <Aside/>
            <Content>
              {children}
            </Content>
          </Grid>
  
}

export default Layout;