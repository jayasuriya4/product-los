import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, TextField, Typography, Grid, Button } from '@mui/material';
import { ArrowBackSharp } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Api from '../../api';
import imageSkeleton from '../../assets/upload-img.svg';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      minWidth: theme.spacing(60),
      background: '#ffffff',
      border: '1px solid rgba(33, 33, 33, 0.2)',
      borderRadius: '15px',
      margin: '10px',
    },
    content: {
      background: '#ffffff',
      border: '1px solid rgba(33, 33, 33, 0.2)',
      borderRadius: '15px',
      width: '100%',
      height: '100%',
    },
    button: {
      background: '#001B94',
      color: '#ffffff',
      fontWeight: 600,
      height: '5vh',
      width: '12vh',
      margin: theme.spacing(2),
    },
    text: {
      fontWeight: 600,
      fontStyle: 'normal',
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.7)',
      marginLeft: theme.spacing(2),
      marginTop: '8px',
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewBox: {
      background: '#ffffff',
      border: '1px solid rgba(33, 33, 33, 0.2)',
      borderRadius: '15px',
      overflow: 'hidden',
      height: '200px',
      width: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'cover',
    },
  }));

const AddProduct = (props) => {
    let { setActiveStep } = props;
    const classes = useStyles();

    const [productData, setProductData] = useState({
      name: "",
      title: "",
      description: "",
      icon: "",
    });
    const [iconMeta, setIconMeta] = useState();
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setProductData((prevProductData) => ({
        ...prevProductData,
        [name]: value,
      }));
    };
  
    const handlePreview = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const preview = document.getElementById("preview");
        preview.src = event.target.result;
      };
  
      reader.readAsDataURL(file);
      setIconMeta(file);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await Api.createProduct(iconMeta);
      } catch (error) {
        console.log(error);
      }
    };
  
    const uploadIcon = async () => {
      try {
        const s3Icon = await Api.uploadFile(iconMeta);
        console.log(s3Icon);
        !isEmpty(s3Icon) &&
          setProductData((prevState) => ({ ...prevState, icon: s3Icon.url }));
        console.log("INSIDE UPLOAD FUNCTION");
      } catch (error) {
        console.log(error);
      }
    };
    console.log(productData)
    return (
        <Card className={classes.cardContainer}>
            <CardContent className={classes.content}>
                <div style={{ display: 'flex' }}>
                    <IconButton onClick={() => setActiveStep(1)} style={{ background: "#001B94", color: "#ffffff" }}><ArrowBackSharp /></IconButton>
                    <Typography className={classes.text} variant="subtitle1">
                        Create New Product
                    </Typography>
                </div>
                <Box display="flex" justifyContent="center">
                    <Card className={classes.card}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={8}>
                                    <CardContent>
                                        <TextField
                                            style={{ margin: '20px' }}
                                            variant="outlined"
                                            fullWidth
                                            name="name"
                                            value={productData.name}
                                            onChange={handleChange}
                                            label="Product Name"
                                            placeholder="Enter the product name"
                                        />
                                        <TextField
                                            style={{ margin: '20px' }}
                                            variant="outlined"
                                            fullWidth
                                            name="title"
                                            value={productData.title}
                                            onChange={handleChange}
                                            label="Product Title"
                                            placeholder="Enter the product title"
                                        />
                                        <TextField
                                            style={{ margin: '20px' }}
                                            variant="outlined"
                                            multiline
                                            fullWidth
                                            name="description"
                                            value={productData.description}
                                            onChange={handleChange}
                                            label="Product Description"
                                            placeholder="Enter the product description"
                                        />
                                    </CardContent>
                                </Grid>
                                <Grid item xs={6} md={4} className={classes.imageContainer}>
                                    <Box style={{ textAlign: 'center' }}>
                                        <Typography style={{ fontSize: '16px', fontWeight: 600, margin: '5px' }} >Product Icon</Typography>
                                        <div className={classes.previewBox}>
                                            <label for="file-upload">
                                                <img id="preview" src={imageSkeleton} className={classes.previewImage} />
                                            </label>
                                            <input hidden id='file-upload' type='file' style={{ margin: "20px" }} accept="image/*" onChange={(event) => handlePreview(event)} ></input>
                                        </div>
                                        <Button className={classes.button} onClick={uploadIcon}>Upload</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Box>
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <Button className={classes.button}>Cancel</Button>
                    <Button className={classes.button} onClick={handleSubmit}>Next</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddProduct;
