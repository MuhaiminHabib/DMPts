import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import Swal from 'sweetalert2'

type alertParams = {
  text?: string
}
type dataType = {
  errorMessage: string
}

type ExtendedSerializedError = errorParams & {
  status: number
  data: dataType
}

type errorParams = {
  error: FetchBaseQueryError | SerializedError | undefined
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
export const showErrorAlert = ({ error }: errorParams) => {
  const extendedError: ExtendedSerializedError = error as ExtendedSerializedError
  Swal.fire({
    title: 'Error!',
    text: extendedError.status === 500 ? 'Internal Server Error' : extendedError.data.errorMessage,
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
