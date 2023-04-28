import React from 'react';

import { 
  Container,
  TitleContainer,
  Controllers
} from './styles';

interface Props {
  children?:React.ReactNode
}

const ContentHeader: React.FC<Props> = ({children}) => {
  return  (
        <Container>
            <TitleContainer><h1>Título</h1></TitleContainer>
            <Controllers>
              <button>Button 1</button>
              <button>Button 2</button>
            </Controllers>
        </Container>
  )  
}

export default ContentHeader;