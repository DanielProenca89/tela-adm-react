import React from "react";
import Webcam from "react-webcam";
import{FaCamera, FaCheckCircle, FaTrashAlt} from "react-icons/fa"
import { Center, Grid } from "@mantine/core";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  


  

  const WebcamCapture = ({upimage}) => {

    const [image,setImage]=React.useState('');

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
      },
      [webcamRef]
    );
    return (
      <>
<Grid  justify="center">

<Grid.Col span={12}>        {image===''?<Webcam
          audio={false}
          height={'100%'}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={'100%'}
          videoConstraints={videoConstraints}
        />:<img src={image}/>}</Grid.Col>
  <Grid.Col span = {4}> <FaCheckCircle color="green" size = "25" onClick={()=>upimage(image)}>Save</FaCheckCircle></Grid.Col>
        
   <Grid.Col  span = {4}><Center><FaCamera size="50" onClick={capture}></FaCamera></Center></Grid.Col>
        
<Grid.Col span = {4}> <FaTrashAlt color="red" style = {{float:"right"}} size = "25" onClick={()=>setImage('')}>Discard</FaTrashAlt></Grid.Col>
</Grid>  
      </>
    );
  };


  export default WebcamCapture;