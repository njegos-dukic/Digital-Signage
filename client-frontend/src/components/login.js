import React, { useEffect, useState } from 'react'
import { Layout, Container, BoxUpload, ImagePreview, LayoutRow } from "./../style/styled";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from "./../assets/logo.png";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    if (!username || username.length < 3) {
      toast.warning("Korisnicko ime mora imati bar 3 karaktera.",  {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      return;
    }

    else if (!password || password.length < 8) {
      toast.warning("Lozinka mora imati bar 8 karaktera, slova i brojeve.",  {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      return;
    }

    let loginDto = {
      username: username,
      password: password
    }

    axios.post("https://localhost:9000/api/v1/login", loginDto)
    .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data))
        localStorage.setItem("isFromLogin", "true")
        navigate('/main')
    },
    err => toast.error(err.response.data, {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"}));
  }

  useEffect(() => {
    localStorage.clear()
  }, []);

  return (
    <Layout>
    <Container>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25%"}}>
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
      <TextField id="outlined-basic" label="Korisničko ime" variant="outlined" style={{ marginTop: "30%" }} onChange={e => setUsername(e.target.value)} />
      <TextField type="password" id="outlined-basic" label="Lozinka" variant="outlined" style={{ marginTop: "25px" }} onChange={e => setPassword(e.target.value)} />
      <hr></hr>
      <a href="mailto:njegos.dukic.998@gmail.com?subject=Smart Bilboard - Zaboravljena lozinka&body=Molim Vas da resetujete administratorsku lozinku za nalog povezan sa ovim mejlom.">Zaboravljena lozinka</a>
      <Button onClick={handleLogin} variant="contained" style={{ marginTop: "25px" }}>Prijavi se</Button>
      <Button onClick={() => navigate('/register')} variant="outlined" style={{ marginTop: "25px" }}>Registruj se</Button>

    </Container>
  </Layout>
  )
}

export default Login