import toast, { Toaster } from 'react-hot-toast';

class ToastHelper {
  SuccessToast(param){
    return toast(param)
  }
}
export const {
    SuccessToast
 } = new ToastHelper();