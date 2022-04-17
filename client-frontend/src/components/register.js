import React from 'react'
import { Layout, Container, BoxUpload, ImagePreview, LayoutRow } from "./../style/styled";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from "./../assets/logo.png";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
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
      <TextField id="outlined-basic" label="Korisničko ime" variant="outlined" style={{ marginTop: "15%" }} />
      <TextField type="email" id="outlined-basic" label="Email" variant="outlined" style={{ marginTop: "15px" }} />
      <TextField type="password" id="outlined-basic" label="Lozinka" variant="outlined" style={{ marginTop: "15px" }} />
      <TextField type="password" id="outlined-basic" label="Ponovljena lozinka" variant="outlined" style={{ marginTop: "15px" }} />
      <Button onCLick={() => navigate('/main')} variant="contained" style={{ marginTop: "25px" }}>Kreiraj nalog</Button>
      <Button onClick={() => navigate('/login')} variant="outlined" style={{ marginTop: "15px" }}>Nazad na prijavu</Button>

    </Container>
  </Layout>
  )
}

export default Register