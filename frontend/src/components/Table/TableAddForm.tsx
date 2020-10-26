import { Grid, TextField } from '@material-ui/core'
import React,{useEffect,useState} from 'react';
import ModalsGeneric from '../Generics/ModalsGeneric'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AddNewLine,UpdateLine } from '../../store/dashboard/actions'
import { useDispatch } from 'react-redux'
import { DashboardRow } from '../../store/dashboard/types'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root':{
      width: '100%',
      margin:theme.spacing(1),
      justifyContent: 'center',
    }
  }
}));

interface Props {
  readonly onCloseForm:Function
  readonly formData:DashboardRow
  readonly formType:"Add"|"Edit"
}

export default function TableAddForm(props: Props){
  const dispatch = useDispatch()
    const [formData, setFormData] = useState({firstName:"",lastName:"",age:null});
    const classes = useStyles();


    const confirmButtonVisibilityCheck=()=>{
      if((formData.firstName==="" || formData.lastName==="" || formData.age==null || isNaN(formData.age))){
          return true;
      }

      else if(props.formType==="Edit" && formData.firstName===props.formData.firstName && formData.lastName===props.formData.lastName && formData.age===props.formData.age)
      {
          return true;
      }
      else
      {
        return false;
      }
    }

    const handleBlurChange = (event,inputType) => {
      if(inputType==="firstName"){
        setFormData({
          ...formData,
          firstName:event.target.value
        })
      }
      else if(inputType==="lastName"){
        setFormData({
          ...formData,
          lastName:event.target.value
        })
      }
      else{
        setFormData({
          ...formData,
          age:event.target.value
        })
      }
    };

    const onCreateLine=()=>{
      dispatch(
        AddNewLine({
          id:"new",
          firstName:formData.firstName,
          lastName:formData.lastName,
          age:formData.age
        })
      )
      props.onCloseForm()
    }

    const onEditLine=()=>{
      //console.log(formData.current)
      dispatch(
        UpdateLine({
          id:props.formData.id,
          firstName:formData.firstName,
          lastName:formData.lastName,
          age:formData.age
        })
      )
      props.onCloseForm()
    }

    

    useEffect(() => {
      //Set Default Values
    if(props.formType==="Add"){
      setFormData({
        firstName:"",
        lastName:"",
        age:null
      })
    }
    else
    {
      setFormData({
        firstName:props.formData.firstName,
        lastName:props.formData.lastName,
        age:props.formData.age
      })
    }
   }, [props.formData,props.formType])

    return (
      <ModalsGeneric>
        <div className={classes.root}>
          <h2 id="simple-modal-title">{(props.formType==="Add")?"Insert User Data":"Edit User Data"}</h2>
          <Grid container>
            <Grid item xs={12}>
              <TextField
              autoFocus
                defaultValue={formData.firstName}
                variant="outlined"
                label="First Name" 
                onBlur={(e)=>handleBlurChange(e,"firstName")}
              >
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formData.lastName}
                variant="outlined"
                label="Last Name" 
                onBlur={(e)=>handleBlurChange(e,"lastName")}
              >
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formData.age}
                variant="outlined"
                label="Age" 
                onBlur={(e)=>handleBlurChange(e,"age")}
              >
              </TextField>
            </Grid>
            <Grid item xs={6}
              style={{
                textAlign:'center' // this does the magic
              }}
            >
              <Button
                variant="contained"
                disabled={confirmButtonVisibilityCheck()}
                onClick={() => {
                  if(props.formType==="Add"){
                    onCreateLine();
                  }
                  else{
                    onEditLine();
                  }
                }}
                color="default"
              >
                Confirm
              </Button>
            </Grid>
            <Grid item xs={6}
              style={{
                textAlign:'center' // this does the magic
              }}
            >
              <Button
                variant="contained"
                onClick={() => props.onCloseForm()}
                color="secondary"
              >
                Cancel
              </Button> 
            </Grid>
          </Grid>
        </div>
      </ModalsGeneric>      
    )
}