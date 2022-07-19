import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function InputUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();
    const { _id } = useParams();
    var selectedMale = (gender === "Male") ? 'selected' : 'false';
    var selectedFemale = (gender === "Female") ? 'selected' : 'false';

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const res = await axios.get(`http://localhost:5000/users/${_id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setGender(res.data.gender);
        console.log(res.data);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/users/${_id}`, {
                name,
                email,
                gender
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="m-3">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Edit data</h2>
                    <form onSubmit={updateUser}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Nama</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Jenis Kelamin</span>
                            </label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value={"Male"} selected={selectedMale}>Laki-laki</option>
                                <option value={"Female"} selected={selectedFemale}>Perempuan</option>
                            </select>
                        </div>
                        <div className="card-actions justify-end mt-3">
                            <Link to={"/"}>
                                <button className="btn">Kembali</button>
                            </Link>
                            <button className="btn btn-primary" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
