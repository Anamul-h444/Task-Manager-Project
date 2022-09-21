import Swal from "sweetalert2";
import { updateStatusRequest } from "../../api-services/Api-services";

export function UpdateToDO(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {new: 'new', complete: 'complete', progress: 'progress', cancel: 'cancel'},
        inputValue:status,
    }).then((result)=>{
       return updateStatusRequest(id, result.value)
        .then((res)=> {
            return res
        })
    })
}