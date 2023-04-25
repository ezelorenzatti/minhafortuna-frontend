import React from 'react';

import { 
  Container,
  Profile,
  Username,
  Welcome 
} from './styles';
import Toogle from '../Toogle';

const MainHeader: React.FC = () => {

  return (
      <Container>        
        <Toogle />
        <Profile>
          <Welcome>Olá</Welcome>
          <Username>Ezequiel Lorenzatti</Username>
        </Profile>        
      </Container>
    );
}

export default MainHeader;