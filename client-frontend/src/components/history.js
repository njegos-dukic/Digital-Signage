import React from 'react'
import { Layout, Container, BoxUpload, ImagePreview } from "../style/styled";
import Button from '@mui/material/Button';
import './table.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function History() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate('/login');
    }
   }, []);

   useEffect(() => {
     let id = JSON.parse(localStorage.getItem("user")).id;
     console.log("USER: ", id);
      axios.get(`https://localhost:9000/api/v1/content/user/${id}/ad`)
        .then(res => {
          setOrders(res.data);
        },
        err => toast.error(err.response.data, {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"}))
   }, []);

  function handleDelete(id) {
    axios.delete(`https://localhost:9000/api/v1/content/delete/${id}`)
      .then(() => {
        setOrders(orders.filter(o => o.id != id))
        toast.success("Uspjesno obrisana reklama.", {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"});
      },
      err => toast.error(err.response.data, {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"}))
   }

  return (
    <Layout>
    <Container style={{width: "95%"}}>
        <div style={{height: "90%", overflow: "scroll"}}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{backgroundColor: "rgb(37, 150, 190)"}}>
                        <TableCell><b style={{color: "white"}}>Naziv reklame</b></TableCell>
                        <TableCell align="center"><b style={{color: "white"}}>Bilbord</b></TableCell>
                        <TableCell align="center"><b style={{color: "white"}}>Datum početka</b></TableCell>
                        <TableCell align="center"><b style={{color: "white"}}>Datum završetka</b></TableCell>
                        <TableCell align="center"><b style={{color: "white"}}>Status</b></TableCell>
                        <TableCell align="center"><b style={{color: "white"}}>Cijena</b></TableCell>
                        <TableCell align="center"><b style={{color: "white"}}>Sadržaj</b></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, id) => (
                        <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{order.adName}</TableCell>
                          <TableCell align="center">{order.billboard.name}</TableCell>
                          <TableCell align="center">{new Date(order.startDate).toLocaleDateString('sr-Latn')}</TableCell>
                          <TableCell align="center">{new Date(order.endDate).toLocaleDateString('sr-Latn')}</TableCell>
                          <TableCell align="center"><b>{order.approved ? <span style={{color: "green"}}>ODOBRENO</span> : <span style={{color: "orange"}}>OBRADA</span> }</b></TableCell>
                          <TableCell align="center">{order.totalCost.toFixed(2) + " KM"}</TableCell>
                          <TableCell align="center"><a href={ 'https://localhost:9000/api/v1/content/ad/' + order.id }>Link</a></TableCell>
                          <TableCell align="right" onClick={() => handleDelete(order.id)}><Button variant="outlined">OBRIŠI</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        <Button onClick={() => navigate('/main')} variant="contained" style={{ marginTop: "25px" }}>POVRATAK NA GLAVNI EKRAN</Button>
    </Container>
   
  </Layout>
  )
}

export default History