import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/users`);
        console.log(result.data)
        setUsers(result.data);

    }
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/users/${id}`)
        loadUsers();

    }
    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">userame</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row" >{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/viewuser/${user.id}`} className='btn btn-success mx-2'>View</Link>
                                    <Link to={`/edituser/${user.id}`} className='btn btn-primary mx-2'>Edit</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        </div>
    )
}
