import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import styled from "styled-components";
import LoginImg from "../images/login2.jpg";

const FormWrapper = styled.div`
  display: flex;
`;

const Form = styled.div`
  height: 100vh;
  position: relative;
  background-color: #fefefe;
  flex: flex-grow;
  flex-grow: 1;
  width: 50vw;
`;

const FormElements = styled.div`
  display: block;
  margin: auto;
  display: block;
  margin: auto;
  width: 200px;
`;

const H1 = styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 100;
  text-align: center;
  text-transform: capitalize;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: rgb(117, 117, 117);
  cursor: pointer;
  display: block;
  width: 200px;
`;

const Input = styled.input`
  padding: 1rem;

  border: 2px solid hsla(0, 0%, 62%, 1);
  display: block;
  margin-bottom: 29px;
  width: 164px;

  /* removes chrome's yellow background */
  &,
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: var(--color-txt-dark);
    box-shadow: 0 0 0px 1000px var(--color-background) inset;
    -webkit-box-shadow: 0 0 0px 1000px var(--color-background) inset;
  }

  :focus {
    outline: none;
  }

  :disabled {
    opacity: var(--opacity-disabled);
  }

  ::placeholder {
    opacity: var(--opacity-placeholder);
  }
`;

const Button = styled.button`
  padding: 1rem;
  margin-top: 6px;
  border: 2px solid hsla(0, 0%, 62%, 1);

  text-transform: uppercase;
  width: 200px;

  cursor: pointer;
  background: transparent;
  border: 2px solid var(--color-border);
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.12) 0 1px 8px 0;

  :hover,
  :focus,
  :active {
    outline: none;
    color: var(--color-focus);
    border-color: var(--color-focus);
  }
`;

const Recede = styled("span")`
  opacity: 0.5;
`;

const Image = styled.div`
  flex: flex-grow;
  flex-grow: 1;
  width: 50vw;
  height: 100vh;
  background-image: url(${LoginImg});
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const login = (email, password) => {
  axios
    .post("http://localhost:3800/user/login", {
      username: email,
      password
    })
    .then(function(response) {
      alert(response.data["session_token"]);
    });
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <FormWrapper>
        <Form>
          <H1>Welcome Back</H1>
          <FormElements>
            <Label htmlFor="email">email</Label>
            <Input
              id="email"
              type="email"
              placeholder="charlie@gmail.com"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              autoFocus
            />
            <Label htmlFor="password">
              password <Recede>(min. 6 characters)</Recede>
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Passw0rd!"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                login(email, password);
              }}
            >
              sign in
            </Button>
          </FormElements>
        </Form>
        <Image />
      </FormWrapper>
    </Layout>
  );
};

export default Login;
