import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './LoginFormStyles.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Form id="loginForm">
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="example@mail.com" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        );
      }
}