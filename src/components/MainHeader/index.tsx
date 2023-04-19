import React, {useMemo} from 'react';
import emojis from '../../utils/emojis';

import { 
  Container,
  Profile,
  Username,
  Welcome 
} from './styles';
import Toogle from '../Toogle';

const MainHeader: React.FC = () => {

  const emoji = useMemo(()=>{
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  },[]);


  return (
      <Container>
        <Toogle/>

        <Profile>
          <Welcome>Olá, {emoji}</Welcome>
          <Username>Ezequiel Lorenzatti</Username>
        </Profile>        
      </Container>
    );
}

export default MainHeader;