import React, { Fragment, useEffect, useState } from 'react'
import Table from '../Table/Table'
import './Orders.css'
import { getOrdersData } from '../../service'

const Orders = () => {
    const [selected, setSelected] = useState(['New', 'Packed', 'InTransit', 'Delivered']);
    const [filteredData, setFilteredData] = useState([])
    const [ordersData, setOrdersData] = useState([])
    const [count, setCount] = useState(0);

    const amountFormatter = (row, col) => {
        return `$${row.amount}`
    }
    const dateFormatter = (row, col) => {
        return (
            <div>
                <p>{row.orderDate}</p>
                <p className='clr-grey'>{row.orderTime}</p>
            </div>
        );
    }
    const columns = [
        {
            accessor: 'id',
            label: 'ID',
            width: '25%',
            color: 'clr-grey'
        },
        { accessor: 'customerName', label: 'Customer', width: '25%' },
        { accessor: 'orderDate', label: 'Date', width: '20%', format: dateFormatter },
        { accessor: 'amount', label: 'Amount', width: '15%', color: 'clr-grey', format: amountFormatter },
        { accessor: 'orderStatus', label: 'Status', width: '25%' },
    ];
    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelected((prevState) => [...prevState, checkboxValue]);
        } else {
            setSelected((prevState) =>
                prevState.filter((checkbox) => checkbox !== checkboxValue)
            );
        }
    };


    useEffect(() => {
        const getData = async () => {
            const data = await getOrdersData();
            setOrdersData(data);
            setFilteredData(data);
            setCount(data.length)
        }
        getData();
    }, [])

    useEffect(() => {
        const tempData = [...ordersData];
        const filtered = tempData.filter((item) => {
            return (
                selected.includes(item.orderStatus)
            )
        });
        setCount(filtered.length)
        setFilteredData(filtered)
    }, [selected])


    return (
        <Fragment>
            <div className="orders-container">
                <p className='orders-heading'>Orders</p>
                <div className='orders-content'>
                    <div className="filters">
                        <p className='filters-heading'>Filters</p>
                        <p style={{ margin: '1rem 0rem' }}>Count : {count}</p>
                        <p>
                            <input type="checkbox" id="new1" value='New' checked={selected.includes('New')} onChange={handleCheckboxChange} />
                            <label for="new1"> New </label>
                        </p>
                        <p>
                            <input type="checkbox" id="new2" value='Packed' checked={selected.includes('Packed')} onChange={handleCheckboxChange} />
                            <label for="new2"> Packed </label>
                        </p>
                        <p>
                            <input type="checkbox" id="new3" value='InTransit' checked={selected.includes('InTransit')} onChange={handleCheckboxChange} />
                            <label for="new3"> InTransit </label>
                        </p>
                        <p>
                            <input type="checkbox" id="new4" value='Delivered' checked={selected.includes('Delivered')} onChange={handleCheckboxChange} />
                            <label for="new4"> Delivered </label>
                        </p>
                    </div>
                    <div className='orders-table'>
                        <Table rows={filteredData} columns={columns} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Orders