import React, { useState } from 'react';
import { Button, Card, IconButton, Container, Box, RadioGroup, Radio, FormControlLabel, Typography, Divider } from '@mui/material';
import { Add, NoteAdd } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import AddProduct from './Product';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
      background: '#ffffff'
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    width: '150vh',
    background: '#ffffff',
    border: '1px solid rgba(33, 33, 33, 0.2)',
    borderRadius: "15px"
  },
  button: {
    minWidth: '18vh',
    background: '#001B94',
    color: '#ffffff',
    height: '6vh',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  text: {
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '16px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    border: '1px solid rgba(33, 33, 33, 0.2)',
    borderRadius: "15px",
    padding: '10px'
  },
  radiogroup: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, paddingRight: '20px', paddingLeft: '20px'
  }
}));

const CreateProduct = () => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);


  async function handleSubmitForm(args) {
    // if (errorStep(args, activeStep)) return;

    switch (activeStep) {
      case 0:
        setActiveStep(1);
        break;
      case 1:
        setActiveStep(2);
        break;
      case 2:
        setActiveStep(3);
      default:
        setActiveStep(0);
    }
  }

  function renderStepContent(props) {
    switch (activeStep) {
      case 0:
        return <InitiateProduct setActiveStep={setActiveStep} {...props} />;
      case 1:
        return <ChooseProduct setActiveStep={setActiveStep} {...props} />;
      case 2:
        return <AddProduct setActiveStep={setActiveStep} {...props} />
      default:
        return <div></div>;
    }
  }

  return (
    <div>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Formik
          initialValues={{}}
          onSubmit={(...args) => handleSubmitForm(args)}
        >
          {(props) => renderStepContent(props)}
        </Formik>
      </div>
    </div>
  )
}

const InitiateProduct = (props) => {
  console.log(props)
  let { setActiveStep } = props;
  const classes = useStyles();
  return (

    <Card className={classes.cardContent}>
      <div>
        <div className={classes.buttonContainer}>
          <IconButton edge="start">
            <NoteAdd />
          </IconButton>
        </div>
        <p className={classes.text}>You don't have any product created yet!</p>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} variant="contained" startIcon={<Add />} onClick={() => setActiveStep(1)}>
            Create
          </Button>
        </div>
      </div>
    </Card>
  )
}

const ChooseProduct = (props) => {
  const classes = useStyles();
  let { setActiveStep } = props;

  const[selectedValue, setSelectedValue] = useState('new_product');
  console.log(selectedValue)

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Card className={classes.cardContent}>
      <div>
        <p className={classes.text}>Do you want to add a new product or a  sub-product to an
          <br />already existing one?</p>
        <div className={classes.buttonContainer}>
          <Container maxWidth="sm" style={{ alignItems: 'center' }}>
            <Box className={classes.container}>
              <RadioGroup
                column
                name="product_type"
              value={selectedValue}
                onChange={handleRadioChange}
                defaultValue="new_product"
                >
                <FormControlLabel
                  className={classes.radiogroup}
                  value="new_product"
                  control={<Radio />}
                  label={
                    <Typography variant="h6" style={{ fontWeight: 600, flexGrow: 1, alignItems: 'flex-start' }}>
                      New Product
                    </Typography>
                  }
                  labelPlacement="start"
                />
                <Divider variant="middle" style={{ margin: "8px" }} />
                <FormControlLabel
                  className={classes.radiogroup}
                  value="existing_product"
                  control={<Radio />}
                  label={
                    <Typography variant="h6" style={{ fontWeight: 600, flexGrow: 1 }}>
                      Existing Product
                    </Typography>
                  }
                  labelPlacement="start"
                />
              </RadioGroup>
            </Box>
          </Container>
        </div>
      </div>
      <Button className={classes.button} onClick={()=>setActiveStep(2)} variant="contained" startIcon={<Add />} style={{ margin: '15px' }}>
        Next
      </Button>
    </Card>
  )
}
export default CreateProduct;
