import { Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ModalsGeneric from '../Generics/ModalsGeneric'
import { AddNewLine, UpdateLine } from '../../store/dashboard/actions'
import { DashboardRow } from '../../store/dashboard/types'
import fetch from 'unfetch'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
      justifyContent: 'center',
    },
  },
}))

interface Props {
  readonly onCloseForm:() => void;
  readonly receivedFormData:DashboardRow|undefined
  readonly formType:'Add'|'Edit'
}

const TableAddForm = ({ onCloseForm, receivedFormData, formType }: Props):JSX.Element => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: 0 })
  const classes = useStyles()

  const confirmButtonVisibilityCheck = () => {
    if ((formData.firstName === '' || formData.lastName === '' || formData.age === 0)) {
      return true
    }

    if (formType === 'Edit' && receivedFormData && formData.firstName === receivedFormData.firstName && formData.lastName === receivedFormData.lastName && formData.age === receivedFormData.age) {
      return true
    }
    return false
  }

  const handleBlurChange = (event: any, inputType:string) => {
    if (inputType === 'firstName') {
      setFormData({
        ...formData,
        firstName: event.target.value
      })
    } else if (inputType === 'lastName') {
      setFormData({
        ...formData,
        lastName: event.target.value
      })
    } else {
      setFormData({
        ...formData,
        age: event.target.value,
      })
    }
  }

  const createLineServer = async () => {
    const createLineObj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age
    }
    await fetch(`${'http://localhost:5000/createProject'}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(createLineObj)
    })
    .then(r => r.json())
    .then(data => dispatch(
      AddNewLine({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
      }),
    ))
  }

  const onCreateLine = () => {
    createLineServer()
    onCloseForm()
  }

  const editLineServer = async () => {
    if (!receivedFormData) { return }
    const editLineObj = {
      id: receivedFormData._id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age
    }
    const response = await fetch(`${'http://localhost:5000/updateProject'}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(editLineObj)
    })
      if (response.ok) {
        dispatch(
          UpdateLine({
            _id: receivedFormData._id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: formData.age,
          }),
        )
      }
  }

  const onEditLine = () => {
    // console.log(formData.current)
    editLineServer()
    onCloseForm()
  }

  useEffect(() => {
    if (!receivedFormData) { return }
    // Set Default Values
    if (formType === 'Add') {
      setFormData({
        firstName: '',
        lastName: '',
        age: 0,
      })
    } else {
      setFormData({
        firstName: receivedFormData.firstName,
        lastName: receivedFormData.lastName,
        age: receivedFormData.age,
      })
    }
  }, [receivedFormData, formType])

  return (
    <ModalsGeneric>
      <div className={classes.root}>
        <h2 id="simple-modal-title">{(formType === 'Add') ? 'Insert User Data' : 'Edit User Data'}</h2>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              autoFocus
              defaultValue={formData.firstName}
              variant="outlined"
              label="First Name"
              onBlur={(e) => handleBlurChange(e, 'firstName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              defaultValue={formData.lastName}
              variant="outlined"
              label="Last Name"
              onBlur={(e) => handleBlurChange(e, 'lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              defaultValue={formData.age}
              variant="outlined"
              label="Age"
              onBlur={(e) => handleBlurChange(e, 'age')}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              textAlign: 'center', // this does the magic
            }}
          >
            <Button
              variant="contained"
              disabled={confirmButtonVisibilityCheck()}
              onClick={() => {
                if (formType === 'Add') {
                  onCreateLine()
                } else {
                  onEditLine()
                }
              }}
              color="default"
            >
              Confirm
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              textAlign: 'center', // this does the magic
            }}
          >
            <Button
              variant="contained"
              onClick={() => onCloseForm()}
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

export default TableAddForm
