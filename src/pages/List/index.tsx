import React, { useMemo, useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid';

import {
    Container,
    Content,
    Filters
} from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelecInput from '../../components/SelectInput/indext';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';



interface IrouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IrouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencySelectedFrequency, setfrequencySelectedFrequency] = useState(['recorrente', 'eventual']);

    const movimenteType = match.params.type;


    const pageData = useMemo(() => {
        if (movimenteType === 'entry-balance') {
            return {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains,
            }
        } else {
            return {
                title: 'Saídas',
                lineColor: '#E44C4E',
                data: expenses,
            }


        }

    }, [movimenteType])

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        })



    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        pageData.data.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })

    }, [pageData.data]);


    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencySelectedFrequency.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = frequencySelectedFrequency.filter(item => item !== frequency);
            setfrequencySelectedFrequency(filtered);
        } else {
            setfrequencySelectedFrequency((prev) => [...prev, frequency]);
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('invalid month value. Is accept 0 -24.')
        }
    }

    const handleYearSelected = (month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        } catch {
            throw new Error('invalid year value. Is accept integer numbers')
        }
    }

    useEffect(() => {
        const filteredData = pageData.data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();


            return month === monthSelected && year === yearSelected && frequencySelectedFrequency.includes(item.frequency);
        });

        const formattedData = filteredData.map(item => {
            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? "#4e41f0" : "#e44c4e"

            }

        });

        setData(formattedData);
    }, [pageData.data, monthSelected, yearSelected, frequencySelectedFrequency]);

    return (
        <Container >
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>

                <SelecInput options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelecInput options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                ${frequencySelectedFrequency.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}

                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`tag-filter  tag-filter-eventual
                    ${frequencySelectedFrequency.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>

            </Filters>

            < Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }

            </Content>
        </Container>
    );
}

export default List;