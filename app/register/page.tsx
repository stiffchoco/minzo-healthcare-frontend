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

export default function Register(){
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
   
  const [authType, setAuthType] = useState('register')
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
    if(isAuthenticated === null) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className='flex flex-col items-center justify-center gap-x-8 lg:flex-row lg:px-5 lg:mt-4'>
        <section className="lg:w-[40%] bg-[#66A56E] text-white px-3 py-5">
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
        <p className='mt-4'>{'Documents are submitted later in Verification, not on this registration form. Private evidence is limited to authorised verification staff and account managers.'}</p>
            <div>
              {sectionsList.map((section, index) => (
                <div key={index}>
                  <h2 className='mt-4 text-lg font-semibold'>{section.topic}</h2>
                  <ul className='mt-2 list-decimal list-inside'>
                    {section.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))} 
            </div>
        </section>
         
          <section className="lg:w-[60%]">
            <section className="bg-white px-4 py-5 w-full space-y-4">
              <RegisterType registerType={authType === 'signup' ? "Sign Up" : "Log In"} /> 
              <div>
                <p>I am registering as</p>
                <div className='flex items-center gap-x-[8px]'>
                  {['Public User', 'Facility Owner'].map((item, index) => (
                    <button onClick={()=>setRegisterAs(item)}  className='px-4 py-2 border rounded flex items-center gap-2' style={registerAs === item ? {background:'lightgray'} : {}} key={index}>
                      {/* <input type='radio' defaultChecked={registerAs === item} checked={registerAs === item} onChange={()=>setRegisterAs(item)}/> */}
                      {/* replace with a div */}
                      <div className='w-4 h-4 border rounded-full flex items-center justify-center'>
                        {registerAs === item && <div className='w-2 h-2 bg-black rounded-full'></div>}
                      </div>
                      <p>{item}</p>
                    </button>
                  ))}
                </div>

              </div>
              
              <RegSection registerAs={registerAs}/>
            </section>
          </section>
          
      </div>
    {/* <Footer /> */}
    </main>
  )
}

function RegSection({registerAs}:any){
  const liberian_counties = Array.from(new Set(API_ENDPOINTS.LIBERIA_CITIES.map(city => city.county)))
  const formData = [
  { label: "Full Name", type: "text", value: "name", isBusinessOnly: false },
  { label: "Email", type: "email", value: "email", isBusinessOnly: false },
  { label: "Phone", type: "text", value: "phone", isBusinessOnly: false },
  { label: "Password", type: "password", value: "password", isBusinessOnly: false },
  { label: "Confirm Password", type: "password", value: "confirm_pass", isBusinessOnly: false },

  { label: "Business Name", type: "text", value: "businessName", isBusinessOnly: true },
  { label: "Business Email", type: "text", value: "businessEmail", isBusinessOnly: true },
  { label: "Business Phone", type: "text", value: "businessPhone", isBusinessOnly: true },
  { label: "Address", type: "text", value: "address", isBusinessOnly: true },
  { label: "County", type: "option", value: "county", isBusinessOnly: true, options: liberian_counties },
  { label: "City", type: "option", value: "city", isBusinessOnly: true, options: API_ENDPOINTS.LIBERIA_CITIES.map(city => city.city) },
  { label: "Business Type", type: "option", value: "type", isBusinessOnly: true, options: API_ENDPOINTS.HEALTHCARE_CATEGORIES },
  { label: "Registration Document URL", type: "file", value: "registrationDocumentUrl", isBusinessOnly: true },

  { label: "Description", type: "textarea", value: "description", isBusinessOnly: true },
  { label: "Website", type: "text", value: "website", isBusinessOnly: true },
  { label: "Opening Hours", type: "text", value: "openingHours", isBusinessOnly: true },
  { label: "Doctors", type: "textarea", value: "doctors", isBusinessOnly: true },
  { label: "Head Nurse", type: "text", value: "headNurse", isBusinessOnly: true },
  { label: "Services", type: "textarea", value: "services", isBusinessOnly: true }
];
  const [formState, setFormState] = useState({}) as any;
  // if(registerAs==='Public User'){
  //   return <PublicUserReg formData={formData}  formState={formState} setFormState={setFormState}/>
  // }
  // if(registerAs==='Facility Owner'){
  //   return <FacilityOwnerReg formData={formData} formState={formState} setFormState={setFormState}/>
  // }
  const { NotifyError, NotifySuccess } = useToast()
  const {postData}= useHttpServices()
  const { 
      fileData,setFileData,
      uploadImages, clearFileDataSlot
  }= useFileInputs(1)

    const regFuncQuery=async()=>{
  // return {data:'succesfull'}
    const path= registerAs==='Public User' ? API_ENDPOINTS.AUTH_ENDPOINTS.NORMAL_SIGNUP : API_ENDPOINTS.AUTH_ENDPOINTS.BUSINESS_SIGNUP
    const {confirm_pass, name, email, phone, password,...business_body}= formState
    const body= {
      name,
      email,
      phone,
      password
    } 
     const {imagesURLs, error: uploadError} = await uploadImages()
        if (uploadError) {
            throw {error: {message: uploadError}}
        }
    if(registerAs==='Facility Owner'){
      if(!imagesURLs || imagesURLs.length === 0){
        throw {error: {message: "Something went wrong while uploading document. Please try again later"}}
      }
      business_body.registrationDocumentUrl = imagesURLs[0].url
    }
      
    return await postData({
      path, 
      body:{...body, ...(registerAs==='Facility Owner' ? business_body : {})}
    })
  }
  const {mutate:regFunc, isPending:regLoading}=useMutation({
    mutationFn: regFuncQuery,
    onError:({error}: {error: any})=>{
      return NotifyError(error.message || 'Could not get data')
    },
    onSuccess:()=>{
      console.log('siccessful')
      setFormState({})
      return NotifySuccess(`You have registered ${registerAs!=='Public User'?'as a Facility Owner, kindly wait for confirmation':''}`)
    }})
  return (
    <div className="space-y-3">
      <PublicUserReg formData={formData.filter((field:any) => !field.isBusinessOnly)}  formState={formState} setFormState={setFormState}/>
      {registerAs==='Facility Owner' && <FacilityOwnerReg 
        fileProps={{ fileData, setFileData, clearFileDataSlot }} 
        formData={formData.filter((field:any) => field.isBusinessOnly)} formState={formState} setFormState={setFormState}/>}
      <LoadButton isLoading={regLoading} 
          disabled={
            (!formState?.email || !formState?.phone) || !formState?.password || (formState.password !== formState?.confirm_pass) 
            || (registerAs==='Facility Owner' && (!fileData || fileData.length === 0))
            || (registerAs==='Facility Owner' && !formState?.businessName)
            // same for businessEmail
            || (registerAs==='Facility Owner' && !formState?.businessEmail)


          }
          onClick={() => regFunc()}
          className="blue-btn w-full mt-4">
            Proceed to Sign Up
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
  