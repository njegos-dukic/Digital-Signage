import React, { useState } from 'react'
import { Layout, Container, BoxUpload, ImagePreview, LayoutRow } from "./../style/styled";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from "./../assets/logo.png";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

toast.configure();

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  function handleRegister() {

    if (!username || username.length < 3) {
      toast.warning("Korisnicko ime mora imati bar 3 karaktera.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      return;
    }

    else if (!password1 || password1.length < 8) {
      toast.warning("Lozinka mora imati bar 8 karaktera, slova i brojeve.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      return;
    }

    else if (!email || !validateEmail(email)) {
      toast.warning("Email nije u validnom formatu.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      return;
    }

    else if (password1 != password2) {
      toast.warning("Lozinke se ne poklapaju.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      return;
    }

    let registerDto = {
      username: username,
      password: password1,
      email: email
    }

    axios.post("https://localhost:9000/api/v1/register", registerDto)
    .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data))
        localStorage.setItem("isFromLogin", "true")
        navigate('/main')
      },
    err => toast.error(err.response.data, {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"}));
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Layout>
    <Container>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%"}}>
            <img
                src={Logo}
                draggable={"false"}
                alt="placeholder"
                style={{ width: 100, height: 100 }}
            />
        </div>
        <Typography style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10%"}}>
            Smart Billboard
        </Typography>
      <TextField id="outlined-basic" label="Korisničko ime" variant="outlined" style={{ marginTop: "15%" }} onChange={e => setUsername(e.target.value)} />
      <TextField type="email" id="outlined-basic" label="Email" variant="outlined" style={{ marginTop: "15px" }} onChange={e => setEmail(e.target.value)} />
      <TextField type="password" id="outlined-basic" label="Lozinka" variant="outlined" style={{ marginTop: "15px" }} onChange={e => setPassword1(e.target.value)} />
      <TextField type="password" id="outlined-basic" label="Ponovljena lozinka" variant="outlined" style={{ marginTop: "15px" }} onChange={e => setPassword2(e.target.value)} />
      <Button onClick={handleRegister} variant="contained" style={{ marginTop: "25px" }}>Kreiraj nalog</Button>
      <Button onClick={() => navigate('/login')} variant="outlined" style={{ marginTop: "15px" }}>Nazad na prijavu</Button>

    </Container>
  </Layout>
  )
}

export default Register