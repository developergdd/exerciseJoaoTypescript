import { Checkbox } from '@material-ui/core'
import React,{useState,useEffect} from 'react'


interface Props {
    readonly selectedLinesArr:string[]
    readonly onCheckBoxChange:Function
    readonly rowId:string
}
export default function TableDeleteCheckbox(props: Props) {

    const [checkboxState,setCheckboxState] = useState<boolean>(false);

    const handleCheckboxState=() => {
        setCheckboxState(!checkboxState);
        props.onCheckBoxChange(props.rowId);
    };

    useEffect(() => {
        setCheckboxState(false)
     }, [props.rowId])
    
    return(
        <div>
            <Checkbox style={{padding:'0px', float:'right'}} checked={checkboxState}  onChange={()=>handleCheckboxState()}/>
        </div>
        
    ) 
}