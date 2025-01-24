import swal  from 'sweetalert2';


export const showNotification = (title, icon) => {
  swal.fire({
    title: title,
    icon: icon,
    toast: true,
    timer: 6000,
    position: "top-right",
    timerProgressBar: true,
    showConfirmButton: false,
  });
};