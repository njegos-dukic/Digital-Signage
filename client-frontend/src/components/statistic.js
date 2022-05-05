import React from 'react'
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Layout, Container, BoxUpload, ImagePreview } from "../style/styled";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      text: 'Broj naručenih reklama po bilbordu',
    },
  },
};




function Statistic() {
  const [orders, setOrders] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [totalAds, setTotalAds] = useState("");
  const [totalSpending, setTotalSpending] = useState("");
  const [totalDays, setTotalDays] = useState("");

  const data = {
    labels,
    datasets: [
      {
        label: 'Reklame',
        data: dataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate('/login');
    }
   }, []);

   useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user")).id;
    axios.get(`https://localhost:9000/api/v1/content/user/${id}/ad`)
        .then(res => {
         setOrders(res.data);
         var dict = {}

         setTotalAds(res.data.length + " reklama");
         let spent = 0;
          let days = 0;

         res.data.forEach(o => {
           spent += o.totalCost;
           days += ((new Date(o.endDate).getTime() - new Date(o.startDate).getTime()) / (1000 * 3600 * 24)) + 1;
          if (dict[o.billboard.name] == undefined) {
            dict[o.billboard.name] = {
              name: o.billboard.name,
              count: 0
            };
          }

          setTotalSpending(spent.toFixed(2) + " KM");
          setTotalDays(days + " dana")

           dict[o.billboard.name].count += 1
         });

         let lab = [];
         let dat = [];
         for (const [key, value] of Object.entries(dict)) {
           lab = [...lab, key];
           dat = [...dat, value.count];
          }

          setLabels(lab);
          setDataValues(dat);

       })
  }, []);
   
  return (
    <Layout>
    <Container>
      <Bar style={{height: "472px", width: "875px", marginTop: "5%" }} 
                     data = {{
                      labels: labels,
                      datasets: [
                        {
                          label: 'Reklame',
                          data: dataValues,
                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                      ],
                    }}

      options={options}  />
    </Container>

    <Container>
    <FormControl>
      <TextField className="e-input" value={totalAds} id="outlined-basic" label="Ukupno reklama" variant="outlined" style={{ marginTop: "25px" }} inputProps={{ readOnly: true }} />
      <TextField value={totalDays} id="outlined-basic" label="Ukupan broj dana" variant="outlined" style={{ marginTop: "25px" }} inputProps={{ readOnly: true }} />
      <TextField value={totalSpending} id="outlined-basic" label="Ukupna potrošnja" variant="outlined" style={{ marginTop: "25px" }} inputProps={{ readOnly: true }} />
    </FormControl>
      <Button onClick={() => navigate('/main')} variant="contained" style={{ width: "13.55%", position: "absolute", bottom: 75 }}>Glavni ekran</Button>

    </Container>

  </Layout>
  )
}

export default Statistic