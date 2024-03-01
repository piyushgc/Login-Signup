import { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function newPassword(){

    const [email, setEmail] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:2001/password',{email,oldPassword,newPassword})
        .then(result => {
            console.log(result)
            if(result.data.message === 'Success'){
                navigate('/login')
            }
        })
        .catch(err=> console.log(err))
    }
    return (

        <div className= 'd-flex  justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25 '>
        <h3 className='text-center'>Change Password</h3>
        <form onSubmit={handleSubmit} >
        <div className = "mb-3">
                <label htmlFor='email'>
                    <strong>Email</strong>
                </label>
                <input 
                    type="email"
                    placeholder='Enter email'
                    autoComplete='off'
                    name = 'email'
                    className='form-control rounded-0'
                    onChange={(e)=>setEmail(e.target.value)}
                />
        </div>
        <div className = "mb-3">
                <label htmlFor='email'>
                    <strong>Old Password</strong>
                </label>
                <input 
                    type="password"
                    placeholder='Enter Old Password'
                    autoComplete='off'
                    name = 'Password'
                    className='form-control rounded-0'
                    onChange={(e)=>setOldPassword(e.target.value)}
                />
        </div>
        <div className='mb-3'>
            <label htmlFor="email">
                <strong>New Password</strong>
            </label>
            <input 
            type="password"
            placeholder='Enter New Password'
            name='Password'
            className='form-control rounded-0' 
            onChange={(e)=>setNewPassword(e.target.value)}
            />
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'>
            Submit
        </button>
        </form>  
        
        </div>
    </div>
    );
}

export default newPassword ;