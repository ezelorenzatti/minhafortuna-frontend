import React from 'react';

import {
    Container,
    ToogleLabel,
    ToogleSelector
} from './styles';

const Toogle: React.FC = () => (
    <Container>
        <ToogleLabel>Light</ToogleLabel>
        <ToogleSelector
            checked
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => console.log("Mudou")}></ToogleSelector>
        <ToogleLabel>Dark</ToogleLabel>
    </Container>
)

export default Toogle;