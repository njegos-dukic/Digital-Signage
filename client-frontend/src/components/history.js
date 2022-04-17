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

function createData(name, billboard, start, end, price, media) {
  return { name, billboard, start, end, price, media };
}

const orders = [
  createData('Chipsy Reklama', "Boska 2", "12-04-2022", "22-04-2022", 4231.00, "Link"),
  createData('Chipsy Reklama', "Boska 2", "12-04-2022", "22-04-2022", 4231.00, "Link"),
  createData('Chipsy Reklama', "Boska 2", "12-04-2022", "22-04-2022", 4231.00, "Link")
];


function History() {
  const navigate = useNavigate();
  return (
    <Layout>
    <Container style={{width: "95%"}}>
        <div style={{height: "90%", overflow: "scroll"}}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{backgroundColor: "rgb(37, 150, 190)"}}>
                        <TableCell><b style={{color: "white"}}>Naziv reklame</b></TableCell>
                        <TableCell align="right"><b style={{color: "white"}}>Bilbord</b></TableCell>
                        <TableCell align="right"><b style={{color: "white"}}>Datum pocetka</b></TableCell>
                        <TableCell align="right"><b style={{color: "white"}}>Datum zavrsetka</b></TableCell>
                        <TableCell align="right"><b style={{color: "white"}}>Ukupna cijena</b></TableCell>
                        <TableCell align="right"><b style={{color: "white"}}>Media</b></TableCell>
                        <TableCell align="right"><b style={{color: "white"}}>Zatrazi brisanje</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, id) => (
                        <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{order.name}</TableCell>
                        <TableCell align="right">{order.billboard}</TableCell>
                        <TableCell align="right">{order.start}</TableCell>
                        <TableCell align="right">{order.end}</TableCell>
                        <TableCell align="right">{order.price}</TableCell>
                        <TableCell align="right">{order.media}</TableCell>
                        <TableCell align="right"><Button variant="outlined">OBRISI</Button></TableCell>
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