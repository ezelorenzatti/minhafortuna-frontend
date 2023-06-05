import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Container,
    CustomDatePicker,
    DateSelect,
    ErrorMessage,
    Form,
    FormItem,
    FormTitle,
    OperationSelectInput
} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import {useNavigate, useParams} from "react-router-dom";
import SelectInput from "../../components/SelectInput";
import {dateToString, stringToDate} from "../../utils/formatDate";
import formatCurrency from "../../utils/formatCurrency";
import {useAuth} from "../../hooks/auth";

interface IOperation {
    id: number;
    amount: number;
    currencyCode: string;
    currencyName: string;
    date: string;
    operationType: string;
    exchangeId: number;
    exchangeName: string;
    total: number;
    unitValue: number;
}

interface ICurrency {
    name: string;
    code: string;
    custom: boolean;
}

interface IExchange {
    id: number;
    name: string;
}

const Operation: React.FC = () => {
    const {signOut} = useAuth();
    const navigator = useNavigate();
    const {type: movimentType, id} = useParams();

    const [currencies, setCurrrencies] = useState<ICurrency[]>([]);
    const [exchanges, setExchanges] = useState<IExchange[]>([]);

    const currencySelector: any[] = useMemo(() => {
        const currenciesSelector = currencies.map(currency => {
            return {value: currency.code, label: `${currency.code} - ${currency.name}`}
        })
        return currenciesSelector;
    }, [currencies]);

    const exchangeSelector: any[] = useMemo(() => {
        const exchangeSelector = exchanges.map(exchange => {
            return {value: String(exchange.id), label: exchange.name}
        })
        return exchangeSelector;
    }, [exchanges]);

    const [idOperation, setIdOperation] = useState<number>();
    const [amount, setAmount] = useState<string>('');
    const [currencyCode, setCurrencyCode] = useState<string>();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [operationType, setOperationType] = useState<string>((movimentType || '').toUpperCase());
    const [exchangeId, setExchangeId] = useState<string>();
    const [total, setTotal] = useState<string>('');
    const [totalFormatted, setTotalFormated] = useState<string>('');
    const [unitValue, setUnitValue] = useState<string>('');

    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!currencyCode || !exchangeId || !amount || !total || !unitValue) {
                setError("Campos obrigatórios não preenchidos!")
                return;
            }

            await fetchPostData("/operation", {
                id: idOperation,
                amount: amount,
                currencyCode: currencyCode,
                date: dateToString(date),
                operationType: operationType,
                exchangeId: exchangeId,
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
        setTotalFormated(formatCurrency(total));

    }
    const handleAmountValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
        const total = Number(event.target.value) * Number(unitValue);
        setTotal(String(total));
        setTotalFormated(formatCurrency(total));
    }
    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrencyCode(event.target.value);
    }

    const handleExchangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExchangeId(event.target.value)
    }

    const fetchOperation = useCallback(async ({id}: { id: any }) => {
        try {
            const currencies: ICurrency[] = await fetchGetData("/currency");
            setCurrrencies(currencies);

            const exchanges: IExchange[] = await fetchGetData("/exchange");
            setExchanges(exchanges);

            if (id) {
                const operation: IOperation = await fetchGetData("/operation/" + id);
                setIdOperation(operation.id);
                setDate(stringToDate(operation.date));
                setAmount(String(operation.amount));
                setOperationType(operation.operationType)
                setCurrencyCode(operation.currencyCode);
                setExchangeId(String(operation.exchangeId));
                setUnitValue(String(operation.unitValue));
                setTotal(String(operation.total));
                setTotalFormated(formatCurrency(operation.total));
            }
        } catch (error: any) {
            if (error.status === 401) {
                signOut();
                navigator('/')
            }
        }
    }, [signOut, navigator]);

    useEffect(() => {
        fetchOperation({id: id});
    }, [id, fetchOperation])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    {id ? 'Editar' : 'Adicionar'} {movimentType === 'buy' ? 'Compra' : 'Venda'}
                </FormTitle>
                <FormItem>
                    <small>Exchange</small>
                    <OperationSelectInput>
                        <SelectInput
                            onChange={handleExchangeChange}
                            options={exchangeSelector}
                            defaultValue={exchangeId}
                        />
                    </OperationSelectInput>
                </FormItem>
                <FormItem>
                    <small>Moeda</small>
                    <OperationSelectInput>
                        <SelectInput
                            onChange={handleCurrencyChange}
                            options={currencySelector}
                            defaultValue={currencyCode}
                        />
                    </OperationSelectInput>
                </FormItem>

                <FormItem>
                    <small>Data de Operação</small>
                    <DateSelect>
                        <CustomDatePicker locale="pt" selected={date}
                                          onChange={(date: Date) => setDate(date)}
                                          dateFormat="dd/MM/yyyy" placeholderText="data da operação"/>
                    </DateSelect>
                </FormItem>
                <FormItem>
                    <small>Quantidade</small>
                    <Input
                        placeholder="quantidade"
                        type="text"
                        required
                        defaultValue={amount}
                        onChange={handleAmountValue}
                        onFocus={(e) => setError('')}
                    />
                </FormItem>
                <FormItem>
                    <small>Valor Unitário</small>
                    <Input
                        placeholder="valor unitário"
                        type="text"
                        required
                        defaultValue={unitValue}
                        onChange={handleUnitValue}
                        onFocus={(e) => setError('')}
                    />
                </FormItem>
                <FormItem>
                    <small>Valor Total</small>
                    {totalFormatted}
                </FormItem>
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