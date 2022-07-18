import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Card() {
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:5000/users"
        }).then((res) => {
            setUsers(res.data);
        })
    }, []);

    return (
        <div>
            <Link to={"/add-user"} className="btn btn-primary m-3 flex justify-center">Tambah</Link>
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
                                    <button className='btn btn-warning text-white'>Edit</button>
                                    <button className='btn btn-error text-white'>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
