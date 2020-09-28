import React, { useState } from "react";
import {
    FormGroup, InputGroup, Input, InputGroupAddon,
    Button, Form
} from "reactstrap";


const LoginForm = ({setUser})=>{

    const [username, setUsername] =  useState("");
    const [password, setPassword]  = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();

        const passKeys = JSON.parse(localStorage.getItem("passKeys"))
        let loginObj =[];
        loginObj = passKeys.filter(item=>{
             if(item.username===username  && item.password===password)
               return true;

               return false;
        })

        if(loginObj.length>0){
            setUser(loginObj);
            return;
        }
        else{
            return alert("Invalid Login and Password");
        }
    }

    return(
        <Form onSubmit={handleSubmit} autoComplete="off">
            <h1>Login</h1>
            <FormGroup>
                <InputGroup>
                <Input type="text" name="username"id="username"placeholder="Username"onChange={e=>setUsername(e.target.value)}  />
                </InputGroup>
                <InputGroup>
                <Input type="password" name="password" id="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
                </InputGroup>
                <InputGroup>
                <InputGroupAddon addonType="append">
                 <Button color="success">Login</Button>
                </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default LoginForm;