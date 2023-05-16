import Swal from 'sweetalert2'

type alertParams = {
  text?: string
}

export const showLoadingAlert = () => {
  Swal.fire({
    title: 'Loading!',
    text: 'Fetching Data',
    icon: 'warning',
    toast: true,
    position: 'top',
    timer: 2000,
    timerProgressBar: true
  }).then(result => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
export const showErrorAlert = ({ text }: alertParams) => {
  Swal.fire({
    title: 'Error!',
    text: text,
    icon: 'error',
    toast: true,
    position: 'top',
    timer: 4000,
    timerProgressBar: true
  }).then(result => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
export const showSuccessAlert = ({ text }: alertParams) => {
  Swal.fire({
    title: 'Success',
    text: text,
    icon: 'success',
    toast: true,
    position: 'top',
    timer: 2000,
    timerProgressBar: true
  }).then(result => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
