import React,{useState, useEffect} from 'react'
import Layout from '../../components/layout'
import Input from '../../components/UI/Input'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { signup } from '../../actions';

export default function Signup() {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const auth  = useSelector(state=>state.auth);
    const user  = useSelector(state=>state.user);
    const dispatch = useDispatch();

    

    const userSignup = (e)=>{
        const user = {firstName, lastName, email, password};
        e.preventDefault();
        dispatch(signup(user));
    }

    if(auth.authenticate){
        return <Redirect to='/' />
    }

    if(user.loading){
        return <p>Loading...</p>
    }

    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{marginTop:'50px'}}>
                    <Col md={{span:6, offset:3}}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={{span:6}}>
                                    <Input
                                        label='First Name'
                                        placeholder='First  Name'
                                        value={firstName}
                                        type='text'
                                        onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={{span:6}}>
                                    <Input
                                        label='Last  Name'
                                        placeholder='Last  Name'
                                        value={lastName}
                                        type='text'
                                        onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </Col>
                                <Col md={{span:12}}>
                                    <Input
                                        label='Email'
                                        placeholder='Email'
                                        value={email}
                                        type='text'
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                    <Input
                                        label='Password'
                                        placeholder='Password'
                                        value={password}
                                        type='text'
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
