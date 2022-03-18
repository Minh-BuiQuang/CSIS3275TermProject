import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import login from '../assets/images/login.jpg';

function Login() {
    const [employeeId, setEmployeeId] = useState("");
    const [pin, setPin] = useState("");
    const navigate = useNavigate();

    const handleEmpIdChange = (e) => {
        setEmployeeId(e.target.value);
    }
    
    const handlePinChange = (e) => {
        setPin(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('https://localhost:44348/api/Login/Authenticate?employeeId='+employeeId+"&pin="+pin);
        const data = await response.json();

        if(data.success === true) {
            localStorage.clear();
            localStorage.setItem('authenticated', true);
            localStorage.setItem('empName', data.data.firstName+" "+data.data.lastName);
            navigate('/stock-records');
        } else {
            window.alert("Wrong Credentials");
        }
    }
    

    return (
        <div className='row'>
            <div className='col'>
                <img className='w-50' src={login} alt='login' />
            </div>
            <form className='col' onSubmit={handleLogin}>
                <h2 className='mb-3'>Login</h2>
                <div className="form-group">
                    <input type="text" className="form-control mb-2"  placeholder="Employee Id" value={employeeId} onChange={handleEmpIdChange} /><br />
                    <input type="password" className="form-control mb-2" placeholder="Enter Pin" value={pin} onChange={handlePinChange} /><br />
                </div>
                <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
        </div>
    )
}

export default Login;

/*
email: "mprandini0@sohu.com"
employeeId: 100
firstName: "Mair"
lastName: "Prandini"
phone: "1624680669"
pin: 1111
role: "Manager"
*/