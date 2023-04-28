import React from "react";
import { Container } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const List: React.FC = () =>{

    const ops = [
        {value:'op1', label:'Op1'},
        {value:'op2', label:'Op2'}
    ];

    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#FFF">
                <SelectInput options={ops}/>
            </ContentHeader>
        </Container>
    );
}

export default List;