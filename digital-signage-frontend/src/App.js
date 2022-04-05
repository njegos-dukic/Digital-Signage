import React, { useState, useRef } from "react";
import { Layout, Container, BoxUpload, ImagePreview } from "./style";
import FolderIcon from "./assets/folder_icon_transparent.png";
import CloseIcon from "./assets/CloseIcon.svg";
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
import * as nsfwjs from 'nsfwjs'

function App() {
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedBillboard, setSelectedBillboard] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const videoTag = useRef(null);
  
  function handleBillboarSelectChanged (event) {
    setSelectedBillboard(event.target.value);
  };

  async function handleImageChange(e) {
    // if ((e.target.files[0].size/1024/1024).toFixed(4) > 15)
    //   alert("Izabrani fajl je prevelik.\nMaksimalna veličina fajla je 15 MB.")

    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      setFileName(e.target.files[0].name);
      setCurrentPrice((e.target.files[0].size/1024/1024).toFixed(2) + " BAM")
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function analyzeSrc() {
    const model = await nsfwjs.load()

    const predictions = await model.classify(videoTag)
    console.log('Predictions: ', predictions)
  }

  return (
    <Layout>

      <Container>
        {/* <h2>Izaberite sadržaj za prikazivanje</h2> */}
        {/* <p>Sadržaj:</p> */}

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
                    onLoad={analyzeSrc}
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
            value={selectedBillboard}
            label="Bilbord"
            onChange={handleBillboarSelectChanged}
            style={{ display: "flex", textAlign: "left" }}
             >
              <MenuItem value=""><em></em></MenuItem>
              <MenuItem value={"1"}>Boska 1</MenuItem>
              <MenuItem value={"2"}>Boska 2</MenuItem>
              <MenuItem value={"3"}>Zepter</MenuItem>
              <MenuItem value={"4"}>Ekvator</MenuItem>
              <MenuItem value={"5"}>Delta</MenuItem>
              <MenuItem value={"6"}>Jumbo</MenuItem>
          </Select>
        </FormControl>

        <div style={{ marginTop: "25px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DesktopDateRangePicker
            startText="Početak"
            endText="Kraj"
            inputFormat="dd.MM.yyyy"
            value={dateRange}
            onChange={(newRange) => {
              setDateRange(newRange);
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

        <TextField value={currentPrice} disabled={true} id="outlined-basic" label="Cijena prikazivanja" variant="outlined" style={{ marginTop: "25px" }} />

        <Button variant="contained" style={{ width: "18.75%", position: "absolute", bottom: 75 }}>Pošalji</Button>

      </Container>

    </Layout>
  );
}

export default App;