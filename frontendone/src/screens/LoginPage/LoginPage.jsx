import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useEffect, useState, } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import './LoginPageStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userAction';
   

const LoginPage = () => {
    const userLogin = useSelector((state)=>state.userLogin)
    const {loading, error, userInfo} = userLogin
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    
    useEffect(()=>{
        const userInfo = localStorage.getItem('userInfo')

        if(userInfo){
            navigate('/mynotes')
        }
    },[userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    // console.log(email, "===> email")
    // console.log(password, "===> password")

    return(
    <MainScreen title="Login">
        <div className="loginContainer">
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}/>
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            <Row>
                <Col>
                New Customer ? <Link to='/register'><span style={{color: "blue"}}> Register Here</span></Link>
                </Col>
            </Row>
        </Form>
        </div>
    </MainScreen>
    )}
export default LoginPage