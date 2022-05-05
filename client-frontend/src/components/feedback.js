import React from 'react'
import { Layout, Container, BoxUpload, ImagePreview } from "../style/styled";
import Button from '@mui/material/Button';
import './table.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Feedback() {
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate('/login');
    }
   }, []);

  function handleSubmit() {

    if (!feedback) {
      toast.warning("Molimo unesite feedback.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"})
      return;
    }

    let feedbackDto = {
      feedback: feedback,
      userId: JSON.parse(localStorage.getItem("user")).id
    }

    axios.post("https://localhost:9000/api/v1/messages", feedbackDto)
      .then(() => { 
        toast.success("Uspješno poslat feedback.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"})
        setFeedback("")
      },
          err => toast.error(err.response.data, {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"}))
    }

  return (

    <Layout>
      <Container>
        <BoxUpload>
          <TextField multiline maxRows={15} style={{ width: "90%", maxHeight: "500px" }}value={feedback} id="outlined-basic" label="Poruka" variant="outlined" onChange={e => setFeedback(e.target.value) } />
        </BoxUpload>
        <Button onClick={() => handleSubmit()} variant="contained" style={{ marginTop: "25px" }}>POŠALJI PORUKU</Button>
        <Button onClick={() => navigate('/main')} variant="contained" style={{ marginTop: "25px" }}>POVRATAK NA GLAVNI EKRAN</Button>
      </Container>
  </Layout>
  )
}

export default Feedback