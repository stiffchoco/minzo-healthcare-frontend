// import Link from "next/Link";
'use client'
import Footer from "@/components/layout/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import RegisterType from "@/components/helper/RegisterType"
import InputHelper from "@/components/helper/InputHelper"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import LoadButton from "@/components/helper/LoadButton"
import useToast from "@/hooks/useToast"
import API_ENDPOINTS from "@/config/apiEndpoints"
import useHttpServices from "@/hooks/useHttpServices"
import useFileInputs from "@/hooks/useFileInputs"
import { getCookie, setCookie } from 'cookies-next';
import { usePathname } from "next/navigation"

export default function Login(){
  const router= useRouter()
  const pathname = usePathname()
  // const searchParams = useSearchParams()
  const [registerAs, setRegisterAs] = useState('Public User')
  const why=[
    '✓ Help patients find your facility',
    '✓ Keep public information up to date',
    '✓ Read and respond to reviews',
    '✓ Build a healthier community'
  ]
const next=[
    '1. Create your facility account',
    '2. Confirm facility details',
    '3. Submit documents in Verification',
    '4. Authorised admin review'
  ]
  const prepare=[
    'Registration certificate',
    'Operating licence / permit applicable to your category',
    'Owner / authorised manager ID',
    'Proof of facility address',
    'Additional professional evidence where applicable'
  ]
  const sectionsList=[
    {topic: 'What Happens Next?', content: next},
    {topic: 'Prepare for Verification', content: prepare}
  ]
   
  const [authType, setAuthType] = useState('login')
  const [isAuthenticated, setIsAuthenticated] = useState< boolean | null >(null); 
  useEffect(() => {
    const token = getCookie("minzo_token");
    if(token) {
      window.location.href = "/";
    }
    else {
      setIsAuthenticated(false);  
      return;
    }
  }, []);
  // useEffect(() => { 
  //   console.log({pathname, search: window.location.search})
  //  const type = new URLSearchParams(window.location.search).get("type") || ""
  //   if(type === 'signup'){
  //     setAuthType('signup')
  //   } else {
  //     setAuthType('login')
  //   }
  // }, [pathname])
  if(isAuthenticated === null) return null;
  return (
    <main className="min-h-screen bg-gray-50">
      <div className='flex flex-col items-center justify-center gap-x-8 lg:flex-row lg:px-5 lg:mt-4'>
        <section className="bg-[#66A56E] text-white px-3 py-5">
          <p className='text-sm font-semibold'>{authType === 'signup' ? "REGISTRATION" : "LOGIN"}</p>
          <div>
            <h1 className='text-2xl my-6 font-bold'>Trusted Healthcare. <br /> Stronger Communities</h1>
            <p className=''>{"Join Liberia's healthcare directory. Help people find your facility, understand your services and share their experiences."}</p>
            <p className='mt-2'>{'Your health. Our shared responsibility for a brighter Liberia.'}</p>
          </div>
        <div>
          <ul className='mt-4 '>
            {why.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        </section>
      
          <section className="bg-white px-4 py-5 w-full space-y-4">
            <RegisterType registerType={authType === 'signup' ? "Sign Up" : "Log In"} /> 
            
            <LoginPage />
          </section>
          
      </div>
    {/* <Footer /> */}
    </main>
  )
}
function LoginPage(){
  
  const formData = [
  
  { label: "Email/Phone", type: "text", value: "identifier"},
  { label: "Password", type: "password", value: "password"}
];
  const [formState, setFormState] = useState({}) as any;
  
  const { NotifyError, NotifySuccess } = useToast()
  const {postData}= useHttpServices()
const router= useRouter()

    const loginFuncQuery=async()=>{
  // return {data:'succesfull'}
    const path=  API_ENDPOINTS.AUTH_ENDPOINTS.NORMAL_SIGNIN
    return await postData({
      path, 
      body: formState
    })
  }
  const {mutate:loginFunc, isPending:regLoading}=useMutation({
    mutationFn: loginFuncQuery,
    onError:({error}: {error: any})=>{
      return NotifyError(error.message || 'Could not get data')
    },
    onSuccess:({data}: {data: any})=>{
      console.log('siccessful')
      setFormState({})
      console.log({data:data?.data?.user?.token})
      setCookie('minzo_token', data?.data?.user?.token || '')
      
      NotifySuccess(`You have signed in successfully`)
      router.push('/')
      return
    }})
  return (
    <div className="space-y-3 bg-white">
      <PublicUserReg formData={formData}  formState={formState} setFormState={setFormState}/>
      <LoadButton isLoading={regLoading} 
          disabled={
            !formState?.identifier || !formState?.password
          }
          onClick={() => loginFunc()}
          className="blue-btn w-full mt-4">
            Proceed to Sign In
      </LoadButton>
    </div>
  );
}

function PublicUserReg({formData, formState, setFormState}:any){
  const formChange=({value, key, isOption}:any) => {
    // console.log({value, key})
    setFormState({
      ...formState,
      [key]: value
    })
  }
  return(
    <div className="">
      <h2 className='text-lg font-bold'>Public User Registration</h2>
      <p>Fill in your details to register as a Public User.</p>
      <div className='py-6 space-y-3'>
        {formData.map((field:any, index:number) => (
          <div key={index}>
            <InputHelper
             onChange={(e:any) => formChange({value:field.type==='option'?e:e.target.value, key: field.value, isOption: field.type==='option'})}
            {...field}
            value={formState[field.value] ?? ''}   
            />
            
          </div>
        ))}
      </div>
    </div>
  )
}

function FacilityOwnerReg({formData, formState, setFormState, fileProps}:any){
  const formChange=({value, key, isOption}:any) => {
    setFormState({
      ...formState,
      [key]: value
    })
  }
  return(
    <div className="space-y-3">
      <h2 className='text-lg font-bold'>Facility Owner Registration</h2>
      <p>Fill in your details to register as a Facility Owner.</p>
      <div className='py-6 space-y-3'>
         
      {formData.map((field:any, index:number) => (
        <div key={index}>
          <InputHelper
            onChange={(e:any) => formChange({value:field.type==='option'?e:e.target.value, key: field.value, isOption: field.type==='option'})}
            {...field}
            value={formState[field.value] ?? ''}
            fileProps={fileProps}
          />
        </div>
      ))}
      </div>
    </div>
  )
}
  