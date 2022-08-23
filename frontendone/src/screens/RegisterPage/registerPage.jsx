import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useEffect, useState, } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from "../../components/MainScreen"
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userAction';

const RegisterPage = () => {

    // Form
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [picMessage, setPicMessage] = useState(null)
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")

    // Non Form
    const userRegister = useSelector((state)=>state.userRegister)
    const dispatch = useDispatch()
    const {loading, error, userInfo} = userRegister

    
    
    useEffect(()=>{
        const userInfo = localStorage.getItem('userInfo')

        if(userInfo){
            navigate('/mynotes')
        }
    },[userInfo])

    // console.log(email, "===> email")
    // console.log(password, "===> password")

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage("Password Do not Match")
        } else {
            setMessage(null)
            dispatch(register(name, email, password, pic))
        }
    }

    const postDetails = (pics) => {
        if(!pics){
            return setPicMessage("Please Select An Image")
        }
        setPicMessage(null)
        if(pics.type ==='image/jpeg' || pics.type === 'image/png'){
            const data = new FormData()
            data.append('file', pics)
            data.append('upload_preset', 'notezipper-ian')
            axios.post("https://api.cloudinary.com/v1_1/cloudinaryian/image/upload", data)
            .then((response)=>{
                console.log(response, "==> ini dari response register")
                console.log(response.data.url, "==> ini dari response data url register")
                setPic(response.data.url.toString())
                console.log(pic, "=====> ini dari pic response")
            })
            .catch((error)=>{
                console.log(error, "===> ini error dari ")
            })
        } else {
            return setPicMessage("Please select an Image")
        }
    }

        

    return(
    <MainScreen title="Register">
        <div className="loginContainer">
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter email" 
            onChange={(e)=>{setName(e.target.value)}}
            value={name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else trust us.
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                value={confirmPassword}/>
            </Form.Group>
            {picMessage && (<ErrorMessage/>)}
            <Form.Group className="mb-3" controlId="formBasicPicture">
            <label className="form-label">Default file input example</label>
            <input type="file" 
            className="form-control"
            id="customFile"
            accept='image/*' 
            onChange={(e)=>postDetails(e.target.files[0])}
            />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            <Row>
                <Col>
                Already Have an Account ? <Link to='/login'><span style={{color: "blue"}}> Please Login</span></Link>
                </Col>
            </Row>
        </Form>
        </div>
    </MainScreen>
        )
    }


export default RegisterPage