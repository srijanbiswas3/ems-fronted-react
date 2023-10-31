import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {
    const { id } = useParams()
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })
    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/users/${id}`)
        setUser(result.data);

    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='rounded p-4 shadow col-md-6 offset-md-3 border mt-2'>
                    <h2 className='text-center m-4'>View User </h2>
                    <div className='card'>
                        <div className='cardheader'>
                            Details for user id : {user.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b className='m-2'>Name:</b>
                                    {user.name}
                                </li>
                                <li className='list-group-item'>
                                    <b className='m-2'>UserName:</b>
                                    {user.username}
                                </li>
                                <li className='list-group-item'>
                                    <b className='m-2'>Email:</b>
                                    {user.email}
                                </li>

                            </ul>
                        </div>
                    </div>
                    <Link to="/" className='btn btn-primary m-4'>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}
