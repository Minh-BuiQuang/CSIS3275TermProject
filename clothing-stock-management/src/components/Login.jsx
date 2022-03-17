import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

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

    const handleLogin = (e) => {
        e.preventDefault();
        const loginUser = async () => {
            const response = await fetch('https://localhost:44348/api/Login/Authenticate?employeeId='+employeeId+"&pin="+1111);
            const data = await response.json();
            
            if(data.success === true) {
                setAuthenticated(true);
                navigate('/customers');
            } else {
                window.alert("Wrong Credentials");
            }

        }
        loginUser();
    }
    

    return (
        <form onSubmit={handleLogin}>
        <div className="form-group">
            <input type="text" className="form-control"  placeholder="Enter Employee Id" value={employeeId} onChange={handleEmpIdChange} /><br />
            <input type="password" className="form-control" placeholder="Enter Pin" value={pin} onChange={handlePinChange} /><br />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
}

export default Login;