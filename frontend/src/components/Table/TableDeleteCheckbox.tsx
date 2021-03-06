import { Checkbox } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

interface Props {
    readonly onCheckBoxChange:(rowId:string) => void;
    readonly rowId:string
}
const TableDeleteCheckbox = ({ rowId, onCheckBoxChange }: Props):JSX.Element => {
  const [checkboxState, setCheckboxState] = useState<boolean>(false)

  const handleCheckboxState = () => {
    setCheckboxState(!checkboxState)
    onCheckBoxChange(rowId)
  }

  useEffect((): void => {
    setCheckboxState(false)
  }, [rowId])

  return (
    <div>
      <Checkbox style={{ padding: '0px', float: 'right' }} checked={checkboxState} onChange={() => handleCheckboxState()} />
    </div>

  )
}

export default TableDeleteCheckbox
