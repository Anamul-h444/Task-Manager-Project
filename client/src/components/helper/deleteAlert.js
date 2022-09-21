import Swal from "sweetalert2";
import { deleteTask } from "../../api-services/Api-services";


export function DeleteToDO(_id){
    return  Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
          //Trigger delete
        return  deleteTask(_id)
          .then((deleteResult)=>{
            return deleteResult
          })
        }
    })

}