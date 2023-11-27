
import Swal from 'sweetalert2';

const ErrorFunction = (text:string) => {
  Swal.fire({
    text: text,
    toast: false,
    position: "center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    customClass: {
      container: "my-swal",
      popup: 'my-swal-position'
    },
  });

  // Return null as this component doesn't render anything in the DOM
  return null;
};

export default ErrorFunction;
