// import { toast, ToastOptions } from "react-toastify";

// interface ErrorObject {
//   message?: string;
//   // Add more properties if needed
// }

// interface ShowErrorFunction {
//   (error: any, setError: React.Dispatch<React.SetStateAction<any | null>>): void;
// }

// export const showError: ShowErrorFunction = (error, setError) => {
//   if (error) {
//     toast.error(error?.message || "Something went wrong !", {
//       position: "top-left",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     setError(null);
//   }
// };


import { toast } from "react-toastify";

interface ErrorObject {
  message?: string;
}

interface SetErrorFunction {
  (error: ErrorObject | null): void;
}

export const showError = (error: ErrorObject | null, setError: SetErrorFunction) => {
  if (error) {
    toast.error(error?.message || "Something went wrong!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setError(null);
  }
};

