import { toast} from 'react-toastify';


const useToast = () => {
    const NotifySuccess = (message:any)=> {
        // toast(message)
        toast.success(message, {
          toastId: "success 1",
      })
    }

    const NotifyError = (message:any) => {
      toast.error(message, {
        toastId: "error 1",
    })
    }  

return {
    NotifyError, NotifySuccess
  };
};

export default useToast