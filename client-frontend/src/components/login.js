import React from 'react'
import { Layout, Container, BoxUpload, ImagePreview, LayoutRow } from "./../style/styled";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from "./../assets/logo.png";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <Layout>
    <Container>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30%"}}>
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
      <TextField id="outlined-basic" label="Korisničko ime" variant="outlined" style={{ marginTop: "30%" }} />
      <TextField type="password" id="outlined-basic" label="Lozinka" variant="outlined" style={{ marginTop: "25px" }} />
      <Button onClick={() => navigate('/main')} variant="contained" style={{ marginTop: "25px" }}>Prijavi se</Button>
      <Button onClick={() => navigate('/register')} variant="outlined" style={{ marginTop: "25px" }}>Registruj se</Button>

    </Container>
  </Layout>
  )
}

export default Login