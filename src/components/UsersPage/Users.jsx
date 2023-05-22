import React, { Fragment, useEffect, useState } from 'react'
import Table from '../Table/Table'
import './users.css'
import { getSearchedUsers, getUsersData } from '../../service'

const Users = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([])

    const locationFormatter = (row) => {
        return (
            <div>
                <p>{row.currentCity},{row.currentCountry}</p>
            </div>
        );
    }
    const avatarFormatter = (row) => {
        return (
            <img src={row.profilePic} alt='pp' />
        );
    }
    const columns = [
        {
            accessor: 'id',
            label: 'ID',
            width: '10%'
        },
        { accessor: 'profilePic', label: 'User Avatar', width: '10%', format: avatarFormatter },
        { accessor: 'fullName', label: 'Full Name', width: '25%', color: 'clr-grey' },
        { accessor: 'dob', label: 'DoB', width: '15%' },
        { accessor: 'gender', label: 'Gender', width: '20%', color: 'clr-grey' },
        { accessor: 'currentCountry', label: 'Current Location', width: '25%', color: 'clr-grey', format: locationFormatter },
    ];

    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await getUsersData();
            setUsersData(data);
            setFilteredData(data)
        }
        getData();
    }, [])

    useEffect(() => {
        const searchUsers = async () => {
            if (search.length > 2) {
                const data = await getSearchedUsers(search);
                setFilteredData(data);
            }
            if (search === ''){
                setFilteredData(usersData)
            }
        }
        searchUsers();
    }, [search])


    return (
        <Fragment>
            <div className="users-container">
                <p className='users-heading'>Users</p>
                <div className='users-content'>
                    <div className="searchBar-container">
                        <input placeholder="Search by Name" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button className='reset-btn' onClick={()=> {setSearch(''); setFilteredData(usersData)}}>Reset</button>
                    </div>
                    <div className='users-table'>
                        <Table columns={columns} rows={filteredData} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Users