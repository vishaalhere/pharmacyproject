import React, { Fragment, useState } from 'react';
import './Table.css';

const Table = ({ columns = [], rows = [] }) => {
    return (
        <Fragment>
            <table cellSpacing={0} style={{ border: 'none', margin: 0, padding: 0, width: '100%' }}>
                <thead>
                    <tr className='table-headers-row'>
                        {columns.map((column, i) => {
                            return <th className='table-headers' style={{ width: column.width, textAlign: 'left', paddingLeft: `${column.accessor === 'id' ? '1.2rem' : ''}` }} key={column.accessor}>{column.label}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        return (
                            <tr key={row.id} className='table-data-row'>
                                {columns.map(column => {
                                    if (column.format) {
                                        return <td className={`table-data ${column.color}`} style={{ width: column.width, paddingLeft: `${column.accessor === 'id' ? '1.2rem' : ''}` }} key={column.accessor}>{column.format(row, column)}</td>
                                    }
                                    return <td className={`table-data ${column.color}`} style={{ width: column.width, paddingLeft: `${column.accessor === 'id' ? '1.2rem' : ''}` }} key={column.accessor}>{row[column.accessor]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}


export default Table