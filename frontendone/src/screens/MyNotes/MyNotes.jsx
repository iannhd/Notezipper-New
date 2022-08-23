import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Button, Card, Badge } from 'react-bootstrap'
import axios from 'axios'
import MainScreen from '../../components/MainScreen'

const MyNotes = () => {

    const [notes, setNotes] = useState([])

    const deleteHandler = (id) => {
        if(window.confirm('Are You')){

        }
    }

    const baseUrl = 'http://localhost:5000'

    const fetchData = async () => {
        const {data} = await axios.get(`/api/users/notes`)
        console.log(data,"===> ini data");
        setNotes(data)
    }
    console.log(notes, "==> ini notes"); 
    useEffect(()=> {
        fetchData()
    },[])

  return(
  <MainScreen title="Welcome Back Ian..">
    <Link to="createnote">
        <Button style={{marginLeft: 10, marginBottom: 6}} size="lg">
            Create New Note
        </Button>
    </Link>
            {
                notes.map((note)=>(
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
                                    Create on - Date
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