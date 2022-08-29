import {useDispatch, useSelector} from 'react-redux'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Accordion, Button, Card, Badge } from 'react-bootstrap'
import axios from 'axios'
import MainScreen from '../../components/MainScreen'
import Loading from '../../components/Loading/Loading'
import { listNotes } from '../../actions/notesActions'
import ErrorMessage from '../../components/ErrorMessage'

const MyNotes = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const noteList = useSelector((state) => state.noteList);

    const { loading, error, notes,  } = noteList;

    const userLogin = useSelector((state)=>state.userLogin)

    const {userInfo} = userLogin

    const deleteHandler = (id) => {
        if(window.confirm('Are You Sure ?')){

        }
    }

    useEffect(()=> {
        dispatch(listNotes())
        console.log(listNotes(), "==> dari use Effect")
        console.log(userInfo, "userInfo dari use Effect")
        if(!userInfo){
            navigate('/')
        }
    },[dispatch, userLogin])

  return(
  <MainScreen title={`Welcome Back ${userInfo.name}`}>
    <Link to="createnote">
        <Button style={{marginLeft: 10, marginBottom: 6}} size="lg">
            Create New Note
        </Button>
    </Link>
            {loading && <Loading/>}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {notes?.map((note)=>(
                    <Accordion defaultActiveKey="0" key={note._id}>
                        <Card style={{margin: 10}} >
                        <Card.Header style={{display:"flex"}}>
                            <span 
                            style={{
                                color: "black",
                                textDecoration: "none",
                                flex: 1,
                                cursor: "pointer",
                                alignSelf:"center",
                                fontSize: 18
                            }}>
                                <Accordion.Button as={Card.Text} variant="link" eventkey='0'>
                                    {note.title}
                                </Accordion.Button>
                            </span>
                        <div>
                            <Button href={`/note/${note._id}`}>Edit</Button>
                            <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>Delete</Button>
                        </div>
                        </Card.Header>
                        <Accordion.Body eventkey='0'>
                        <Card.Body>
                            <h4>
                                <Badge style={{color: "white"}} bg="success">
                                    Category - {note.category}
                                </Badge>
                            </h4>

                            <blockquote className="blockquote mb-0">
                                <p>
                                    {' '}
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                    posuere erat a ante.{' '}
                                </p>
                                <footer className="blockquote-footer">
                                    Created on{" "}
                                    <cite title="Source Title">
                                        {note.createdAt}
                                    </cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                        </Accordion.Body>
                    </Card>
                    </Accordion>
                ))
            }
  </MainScreen>)
}

export default MyNotes