import React from 'react'
import { useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = React.useState({
        email:"",
        password:""
    })
    let navigate = useNavigate();



    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST", 
           
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0ZWQ5MGJmMTIwZTAyYzc0OGJjNjE5In0sImlhdCI6MTcxNjQ0NzAzMX0._hX4k4XHLe217evtobtFJJ-UspmQ1EYoXp-tObQXD5Q"
        
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
            
          
          });
          const json = await response.json()
          console.log(json)
          if (json.success ){
            // redrect
            localStorage.setItem('token',json.authToken)
            props.showAlert("Login Successfully","success")
            navigate("/")
           
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

  return (
    <div className='container mt-3'>
        <h2 className='my-3'>Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password}  onChange={onChange} id="password" name='password'/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      
    </div>
  )
}

export default Login
