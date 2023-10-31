import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

export default function EditUser({ params }) {

    const { id } = useParams();
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })
    const { name, username, email } = user
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    }
    useEffect(() => {
        loadUser()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/users/${id}`, user)
        navigate("/")
    }
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/users/${id}`)
        setUser(result.data);

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='rounded p-4 shadow col-md-6 offset-md-3 border mt-2'>
                    <h2 className='text-center m-4'>User Register</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='Name'>Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" name="name" onChange={e => onInputChange(e)} value={name} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='User Name'>User Name</label>
                            <input type="text" className="form-control" placeholder="Enter Username" name="username" onChange={e => onInputChange(e)} value={username} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='Email' >E-mail</label>
                            <input type="email" className="form-control" placeholder="Enter Email" name="email" onChange={e => onInputChange(e)} value={email} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary mx-2'>Save</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
