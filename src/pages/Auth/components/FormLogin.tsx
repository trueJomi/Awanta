// import React from 'react'
// import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
// import { useNavigate } from 'react-router-dom'
// import { useAuthFirebase } from '../../../services/AuthFirebase.service'
// import { Input } from '../../../components/Input.component'
// import { LoginWithGoogle } from './LoginWithGoogle'

// function FormLogin() {

//   const auth=useAuthFirebase()
//   const navigate=useNavigate()
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [error,setError]=React.useState<string>()
//   const [email,setEmail]=React.useState<string>()
//   const [password,setPassword]=React.useState<string>()

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const changeEmail=(input:React.ChangeEvent<HTMLInputElement>)=>{
//     setEmail(input.target.value)
//   }
//   const changePassword=(input:React.ChangeEvent<HTMLInputElement>)=>{
//     setPassword(input.target.value)
//   }

//   const login=(event:React.FormEvent<HTMLFormElement>)=>{
//     // event.preventDefault();
//     // if(!email || !password){
//     //   setError("error: complete el correo o la contraseña")
//     // }
//     // else{
//     //   auth.Login(email,password).then(()=>{
//     //     navigate("/")
//     //   }).catch((error)=>{
//     //     setError(error.message)
//     //   })
//     // }
//   }
//   return (
//     <form onSubmit={login}>
//       <div>
//         <div>
//           <Input
//             name="email"
//             label='Correo Electronico'
//             type="email"
//             inputProps={{
//               startAdornment:<Email className='mr-2' />
//             }}
//             change={changeEmail}
//           />
//         </div>
//         <div className="mt-6" >
//           <Input
//             name='password'
//             label="Contraseña"
//             type={showPassword ? 'text' : 'password'}
//             inputProps={{
//               startAdornment:<Lock className='mr-2' />,
//               endAdornment:<button type="button" onClick={handleClickShowPassword} >{showPassword ? <VisibilityOff /> : <Visibility />}</button>
//             }}
//             change={changePassword}
//           />
//         </div>
//         <div className="text-red-500 mt-1 text-xs" >
//           { error }
//         </div>
//       </div>
//       <div className="text-center mt-5">
//         <button
//           type="submit"
//           className="capitalize rounded-3xl bg-blue-base text-whiteBase px-4 py-2" >
//             iniciar Sesion
//         </button>
//       </div>
//     </form>
//   )
// }

// export default FormLogin
