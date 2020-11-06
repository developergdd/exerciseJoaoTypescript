import React from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
  const top = 40
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

interface Props {
  // eslint-disable-next-line no-undef
  readonly children:JSX.Element
}

const ModalsGeneric = ({ children }:Props):JSX.Element => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  return (
    <div>
      <Modal
        open
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {children}
        </div>
      </Modal>
    </div>
  )
}

export default ModalsGeneric
