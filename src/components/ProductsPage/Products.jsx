import React, { Fragment, useState, useEffect } from 'react'
import Table from '../Table/Table'
import './products.css'
import { getProductsData } from '../../service'

const Products = () => {
    const [selected, setSelected] = useState(['Expired', 'Low Stock']);
    const [filteredData, setFilteredData] = useState([])
    const [productsData, setProductsData] = useState([])
    const [count, setCount] = useState(0);

    const compareDates = (dates) => {
        let d1 = new Date();
        let d2 = new Date(dates);
        let fresh = d1.getTime() <= d2.getTime();
        return fresh;
    }

    const amountFormatter = (row) => {
        return `$${row.unitPrice}`
    }
    const columns = [
        {
            accessor: 'id',
            label: 'ID',
            width: '12%',
            color: 'clr-grey'
        },
        { accessor: 'medicineName', label: 'Product Name', width: '28%' },
        { accessor: 'medicineBrand', label: 'Product Brand', width: '28%', color: 'clr-grey' },
        { accessor: 'expiryDate', label: 'Expiry Date', width: '15%' },
        { accessor: 'unitPrice', label: 'Unit Price', width: '10%', color: 'clr-grey', format: amountFormatter },
        { accessor: 'stock', label: 'Stock', width: '25%', color: 'clr-grey' },
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
            const data = await getProductsData();
            setFilteredData(data)
            setProductsData(data);
            setCount(data.length);
        }
        getData();
    }, [])

    useEffect(() => {
        const tempData = [...productsData];
        const filtered = tempData.filter((item) => {
            if (!selected.includes('Low Stock') && selected.includes('Expired')) {
                if (item.stock > 100) {
                    return item;
                }
            }
            if (!selected.includes('Expired') && selected.includes('Low Stock')) {
                const how = compareDates(item.expiryDate)
                if(how){
                    return item;
                }
            }
            if (selected.includes('Expired') && selected.includes('Low Stock')){
                return item;
            }
            if (!selected.includes('Expired') && !selected.includes('Low Stock')){
                if (item.stock > 100 && compareDates(item.expiryDate)) {
                    return item;
                }
            }
        });
        setFilteredData(filtered)
        setCount(filtered.length)
    }, [selected])

    return (
        <Fragment>
            <div className="products-container">
                <p className='products-heading'>Products</p>
                <div className='products-content'>
                    <div className="filters">
                        <p className='filters-heading'>Filters</p>
                        <p style={{ margin: '1rem 0rem' }}>Count : {count}</p>
                        <p>
                            <input type="checkbox" id="new1" value='Expired' checked={selected.includes('Expired')} onChange={handleCheckboxChange} />
                            <label for="new1"> Expired </label>
                        </p>
                        <p>
                            <input type="checkbox" id="new2" value='Low Stock' checked={selected.includes('Low Stock')} onChange={handleCheckboxChange} />
                            <label for="new2"> Low Stock </label>
                        </p>
                    </div>
                    <div className='products-table'>
                        <Table rows={filteredData} columns={columns} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Products