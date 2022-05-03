import React, { useState, useRef, useEffect } from "react";
import { Layout, Container, BoxUpload, ImagePreview } from "./../style/styled";
import FolderIcon from "./../assets/folder_icon_transparent.png";
import CloseIcon from "./../assets/CloseIcon.svg";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function MainScreen() {
  const [image, setImage] = useState(null);
  const [imageMultipart, setImageMultipart] = useState(null);

  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedBillboard, setSelectedBillboard] = useState({});
  const [numberOfDays, setNumberOfDays] = useState({});
  const [billboards, setBillboards] = useState([]);
  
  const videoTag = useRef(null);
  
  const navigate = useNavigate();

  function handleBillboarSelectChanged (event) {
    setSelectedBillboard(event.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate('/login');
      return;
    }

    if (localStorage.getItem("isFromLogin")) {
      toast.info("Dobrodošli " + JSON.parse(localStorage.getItem("user")).username + ".",  { position: toast.POSITION.TOP_LEFT, theme: "colored"} );
      localStorage.removeItem("isFromLogin");
    }
   }, []);

  useEffect(() => 
    axios.get("https://localhost:9000/api/v1/billboard/available")
         .then(res => {
            setBillboards(res.data);
          }), []);

  async function handleImageChange(e) {
    if ((e.target.files[0].size/1024/1024).toFixed(4) > 15) {
      alert("Izabrani fajl je prevelik.\nMaksimalna veličina fajla je 15 MB.")
      return;
    }

    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0].type)
      if (!e.target.files[0].type.includes("image") && !e.target.files[0].type.includes("video")) {
        alert("Molimo izaberite sliku ili video.");
        return;
      }
    }

    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      setFileName(e.target.files[0].name);
      // New part
      setImageMultipart(e.target.files[0]);

      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleSubmit() {
    const FormData = require('form-data');

    const formData = new FormData();
    formData.append('billboardId', selectedBillboard.id);
    formData.append('adName', fileName);
    formData.append('startDate', dateRange[0].toISOString());
    formData.append('endDate', dateRange[1].toISOString());
    formData.append('userId', JSON.parse(localStorage.getItem("user")).id);
    formData.append('content', imageMultipart);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }

    axios.post("https://localhost:9000/api/v1/content", formData, config)
         .then(res => {
            toast.success("Uspješno poslata reklama.",  { position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"} );
            console.log(res.data);
          },
          err => toast.error(err.response.data, {position: toast.POSITION.BOTTOM_RIGHT, theme: "colored"})
        );
  }

  return (
    <Layout>
      <Container>
        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Dodajte sadržaj</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".mp4,.png,.jpg,.jpeg"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setFileName("");
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                    ref={videoTag}
                   // onLoad={analyzeSrc}
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>

        <TextField value={fileName} id="outlined-basic" label="Naziv reklame" variant="outlined" style={{ marginTop: "25px" }} onChange={e => setFileName(e.target.value) } />

        {/* {isUploaded ? <h2>Tip fajla: {typeFile}</h2> : null} */}
      </Container>

      <Container>
        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">Bilbord</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Bilbord"
            onChange={handleBillboarSelectChanged}
            style={{ display: "flex", textAlign: "left" }}
             >
              {
                billboards
                  .map(billboard =>
                    <MenuItem value={billboard}><b>{billboard.name}</b>:&nbsp;{billboard.city}</MenuItem>
                  )
              }
          </Select>
          {
            selectedBillboard.lat && selectedBillboard.lng &&
            <>
              <hr></hr>
              <hr></hr>
              <hr></hr>
            </>
          }

        </FormControl>

        <div style={{ marginTop: "25px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DesktopDateRangePicker
            startText="Početak"
            endText="Kraj"
            inputFormat="dd.MM.yyyy"
            value={dateRange}
            onChange={(newRange) => {
              console.log(newRange);

              setDateRange(newRange);

              if (newRange[0] && newRange[1])
                setNumberOfDays((newRange[1].getTime() - newRange[0].getTime()) / (1000 * 3600 * 24) + 1);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}/>
          </LocalizationProvider>
        </div>

        <TextField value={(!isNaN(selectedBillboard.dailyRate * numberOfDays)) ? ((selectedBillboard.dailyRate * numberOfDays).toFixed(2) + " KM") : ""}  inputProps={{ readOnly: true }} id="outlined-basic" label="Cijena prikazivanja" variant="outlined" style={{ marginTop: "25px" }} />
        {
          selectedBillboard.lat && selectedBillboard.lng &&
          <>
            <Button onClick={() => window.open(`https://maps.google.com/?q=${selectedBillboard.lat},${selectedBillboard.lng}`)} variant="outlined" style={{ width: "18.5%", position: "absolute", top: 143 }}>Vidi&nbsp;na&nbsp;mapi</Button>
          </>
        }
        <Button onClick={() => navigate('/history')} variant="outlined" style={{ width: "18.5%", position: "absolute", bottom: 185 }}>Istorija</Button>
        <Button onClick={() => navigate('/statistic')} variant="outlined" style={{ width: "18.5%", position: "absolute", bottom: 130 }}>Statistika</Button>
        <Button onClick={() => navigate('/login')} variant="contained" style={{ width: "18.5%", position: "absolute", bottom: 75 }}>Odjavi&nbsp;se</Button>
        {
          !isNaN(selectedBillboard.dailyRate * numberOfDays) && isUploaded &&
          <>
            <Button onClick={handleSubmit} variant="contained" style={{ width: "18.5%", position: "absolute", top: 350 }}>Pošalji</Button>
          </>
        }
      </Container>
    </Layout>
  );
}

export default MainScreen;