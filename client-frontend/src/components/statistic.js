import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Layout, Container, BoxUpload, ImagePreview } from "../style/styled";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
      display: true,
      text: 'Broj narucenih reklama po bilbordu',
    },
  },
};

const labels = ['Boska', 'Zepter', 'Jumbo', 'Delta', 'Centrum'];

const data = {
  labels,
  datasets: [
    {
      label: 'Reklame',
      data: [5, 11, 2, 13, 4],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

function Statistic() {
  const navigate = useNavigate();
  return (
    <Layout>
    <Container>
      {/* <h2>Izaberite sadržaj za prikazivanje</h2> */}
      {/* <p>Sadržaj:</p> */}

      <Bar style={{height: "472px", width: "875px", marginTop: "5%" }} options={options} data={data} />


      {/* {isUploaded ? <h2>Tip fajla: {typeFile}</h2> : null} */}
    </Container>

    <Container>
    <FormControl>
      <TextField className="e-input" value="22 reklame" id="outlined-basic" label="Ukupan broj reklama" variant="outlined" style={{ marginTop: "25px" }} inputProps={{ readOnly: true }} />
      <TextField value="77 dana" id="outlined-basic" label="Ukupan broj dana" variant="outlined" style={{ marginTop: "25px" }} inputProps={{ readOnly: true }} />
      <TextField value="4560.00 KM" id="outlined-basic" label="Ukupna potrosnja" variant="outlined" style={{ marginTop: "25px" }} inputProps={{ readOnly: true }} />
    </FormControl>
      <Button onClick={() => navigate('/main')} variant="contained" style={{ width: "13.55%", position: "absolute", bottom: 75 }}>Glavni ekran</Button>

    </Container>

  </Layout>
  )
}

export default Statistic