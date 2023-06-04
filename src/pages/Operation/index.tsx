import React, {useEffect, useMemo, useState} from "react";
import {Container, CustomDatePicker, DateSelect, ErrorMessage, Form, FormTitle, OperationSelectInput} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import {useNavigate, useParams} from "react-router-dom";
import SelectInput from "../../components/SelectInput";
import {dateToString, stringToDate} from "../../utils/formatDate";

interface IOperation {
    id: number;
    amount: number;
    currencyCode: string;
    currencyName: string;
    date: string;
    operationType: string;
    plataformId: number;
    plataformName: string;
    taxes: number;
    total: number;
    unitValue: number;
}

interface ICurrency {
    name: string;
    code: string;
    custom: boolean;
}

interface IPlataform {
    id: number;
    name: string;
}

const Operation: React.FC = () => {
    const navigator = useNavigate();
    const {type: movimentType, id} = useParams();

    const [currencies, setCurrrencies] = useState<ICurrency[]>([]);
    const [plataforms, setPlataforms] = useState<IPlataform[]>([]);

    const currencySelector: any[] = useMemo(() => {
        const currenciesSelector = currencies.map(currency => {
            return {value: currency.code, label: `${currency.code} - ${currency.name}`}
        })
        return currenciesSelector;
    }, [currencies]);

    const plataformsSelector: any[] = useMemo(() => {
        const plataformsSelector = plataforms.map(plataform => {
            return {value: String(plataform.id), label: plataform.name}
        })
        return plataformsSelector;
    }, [plataforms]);

    const [idOperation, setIdOperation] = useState<number>();
    const [amount, setAmount] = useState<string>('');
    const [currencyCode, setCurrencyCode] = useState<string>();
    const [date, setDate] = useState<Date>(new Date());
    const [operationType, setOperationType] = useState<string>((movimentType || '').toUpperCase());
    const [plataformId, setPlataformId] = useState<string>();
    const [taxes, setTaxes] = useState<string>('');
    const [total, setTotal] = useState<string>('');
    const [unitValue, setUnitValue] = useState<string>('');

    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            console.log(dateToString(date));
            await fetchPostData("/operation", {
                id: idOperation,
                amount: amount,
                currencyCode: currencyCode,
                date: dateToString(date),
                operationType: operationType,
                plataformId: plataformId,
                taxes: taxes,
                total: total,
                unitValue: unitValue,
            });
            navigator(-1);
        } catch (message: any) {
            setError(message);
        }
    }

    const handleCancelClick = () => {
        navigator(-1);
    }
    const handleUnitValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnitValue(event.target.value);
        const total = Number(event.target.value) * Number(amount);
        setTotal(String(total));

    }
    const handleAmountValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
        const total = Number(event.target.value) * Number(unitValue);
        setTotal(String(total));
    }
    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrencyCode(event.target.value);
    }

    const handlePlataformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPlataformId(event.target.value)
    }

    async function fetchOperation({id}: { id: any }) {
        const currencies: ICurrency[] = await fetchGetData("/currency");
        setCurrrencies(currencies);

        const plataforms: IPlataform[] = await fetchGetData("/plataform");
        setPlataforms(plataforms);

        if (id) {
            const operation: IOperation = await fetchGetData("/operation/" + id);
            setIdOperation(operation.id);
            setDate(stringToDate(operation.date));
            setAmount(String(operation.amount));
            setOperationType(operation.operationType)
            setTaxes(String(operation.taxes));
            setCurrencyCode(operation.currencyCode);
            setPlataformId(String(operation.plataformId));
            setUnitValue(String(operation.unitValue));
            setTotal(String(operation.total));
        } else {
            setPlataformId(String(plataforms[0].id))
            setCurrencyCode('USD');
        }
    }

    useEffect(() => {
        fetchOperation({id: id});
    }, [id])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    {id ? 'Editar' : 'Adicionar'} {movimentType === 'buy' ? 'Compra' : 'Venda'}
                </FormTitle>
                <small>Plataforma</small>
                <OperationSelectInput>
                    <SelectInput
                        onChange={handlePlataformChange}
                        options={plataformsSelector}
                        defaultValue={plataformId}
                    />
                </OperationSelectInput>
                <small>Moeda</small>
                <OperationSelectInput>
                    <SelectInput
                        onChange={handleCurrencyChange}
                        options={currencySelector}
                        defaultValue={currencyCode}
                    />
                </OperationSelectInput>
                <small>Data de Operação</small>
                <DateSelect>
                    <CustomDatePicker locale="pt" selected={date}
                                      onChange={(date: Date) => setDate(date)}
                                      dateFormat="dd/MM/yyyy" placeholderText="data da operação"/>
                </DateSelect>
                <small>Quantidade</small>
                <Input
                    placeholder="quantidade"
                    type="text"
                    required
                    defaultValue={amount}
                    onChange={handleAmountValue}
                    onFocus={(e) => setError('')}
                />
                <small>Valor Unitário</small>
                <Input
                    placeholder="valor unitário"
                    type="text"
                    required
                    defaultValue={unitValue}
                    onChange={handleUnitValue}
                    onFocus={(e) => setError('')}
                />
                <small>Valor Total</small>
                <Input
                    placeholder="valor total"
                    disabled
                    type="text"
                    required
                    defaultValue={total}
                    onChange={(e) => setTotal(e.target.value)}
                    onFocus={(e) => setError('')}
                />
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={handleCancelClick}>Cancelar</Button>
            </Form>

            {error &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </Container>
    )
}

export default Operation;