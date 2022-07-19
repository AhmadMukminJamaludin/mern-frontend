import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Card() {
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    };

    const deleteUser = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${_id}`);
            getUsers();
            console.log("data berhasil dihapus.");
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div>
            <Link to={"/add-user"} className="btn btn-primary m-3 flex justify-center">Tambah</Link>
            {Users && (
                <div className="m-3 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-x-4">
                    {Users.map((data, i) => {
                        return (
                            <div className="card w-96 bg-base-100 shadow-xl m-3" key={i}>
                                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{data.name}</h2>
                                    <p>{data.email}</p>
                                    {data.gender == "Male" ? <div className="badge badge-primary badge-outline">Laki-laki</div> : <div className="badge badge-secondary badge-outline">Perempuan</div>}
                                    <div className="card-actions justify-end">
                                        <Link className='btn btn-warning text-white' to={`edit-user/${data._id}`}>Edit</Link>
                                        <button className='btn btn-error text-white' onClick={() => deleteUser(data._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
