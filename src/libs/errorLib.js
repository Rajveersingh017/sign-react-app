import swal from "sweetalert";

export function onError(error) {
    let message = error.toString();
  
    // Auth errors
    if (!(error instanceof Error) && error.message) {
      message = error.message;
    }
  
    // alert(message);
    swal(message);
  }