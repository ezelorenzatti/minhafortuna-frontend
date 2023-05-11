import React from "react";
import { Container, Content } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

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

            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
        </Container>
    );
}

export default List;