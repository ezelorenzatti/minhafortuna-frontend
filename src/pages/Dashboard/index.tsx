import React from "react";

import { Container } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const Dashboard: React.FC = () =>{

    const ops = [
        {value:'op1', label:'Op1'},
        {value:'op2', label:'Op2'}
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#FFF">
                <SelectInput options={ops} onChange={() => {}}/>
            </ContentHeader>
        </Container>
    )
}

export default Dashboard;