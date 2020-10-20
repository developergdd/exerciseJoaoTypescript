import { Grid, TextField } from '@material-ui/core'
import React,{useRef} from 'react';
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

export const TableAddForm=React.memo((props: Props)=>{
  const dispatch = useDispatch()
    const formData = useRef<{firstName:string,lastName:string,age:number}>({firstName:"",lastName:"",age:null});
    const [confirmButtonDisabled, setConfirmButtonDisabled] = React.useState(true);
    const classes = useStyles();


    const confirmButtonVisibilityCheck=()=>{

      if((formData.current.firstName==="" || formData.current.lastName==="" || isNaN(formData.current.age)) && !confirmButtonDisabled){
        return setConfirmButtonDisabled(true);
      }

      if(props.formType==="Edit" && formData.current.firstName===props.formData.firstName && formData.current.lastName===props.formData.lastName && formData.current.age===props.formData.age && !confirmButtonDisabled)
      {
        return setConfirmButtonDisabled(true);
      }
      if(confirmButtonDisabled)
      {
        return setConfirmButtonDisabled(false);
      }
    }

    const handleChange = (event,inputType) => {
      if(inputType==="firstName"){
        formData.current.firstName=event.target.value;
      }
      else if(inputType==="lastName"){
        formData.current.lastName=event.target.value;
      }
      else{
        formData.current.age=event.target.value;
      }
      confirmButtonVisibilityCheck();
      
    };

    const onCreateLine=()=>{
      dispatch(
        AddNewLine({
          id:"new",
          firstName:formData.current.firstName,
          lastName:formData.current.lastName,
          age:formData.current.age
        })
      )
      props.onCloseForm()
    }

    const onEditLine=()=>{
      dispatch(
        UpdateLine({
          id:props.formData.id,
          firstName:formData.current.firstName,
          lastName:formData.current.lastName,
          age:formData.current.age
        })
      )
      props.onCloseForm()
    }

    //Set Default Values
    if(props.formType==="Add"){
      formData.current={
        firstName:"",
        lastName:"",
        age:null
      }
    }
    else
    {
      formData.current={
        firstName:props.formData.firstName,
        lastName:props.formData.lastName,
        age:props.formData.age
      }
    }

    return (
      <ModalsGeneric>
        <div className={classes.root}>
          <h2 id="simple-modal-title">{(props.formType==="Add")?"Insert User Data":"Edit User Data"}</h2>
          <Grid container>
            <Grid item xs={12}>
              <TextField
              autoFocus
                defaultValue={formData.current.firstName}
                variant="outlined"
                label="First Name" 
                onChange={(e)=>handleChange(e,"firstName")}
              >
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formData.current.lastName}
                variant="outlined"
                label="Last Name" 
                onChange={(e)=>handleChange(e,"lastName")}
              >
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formData.current.age}
                variant="outlined"
                label="Age" 
                onChange={(e)=>handleChange(e,"age")}
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
                disabled={confirmButtonDisabled}
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
})