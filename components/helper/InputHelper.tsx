import { useState } from "react";
import SelectOption from "./SelectOption";
export default function InputHelper({
  textClassName = "py-3 px-3",
  isBusinessOnly = false,
  placeholder, options,
  className = "",
  type = "text",
  onChange,
  value = "",
  label,
  showLabel=true,
  extraText,
  fileProps,
  ...rest
}:any) {
  const [showPassword, setShowPassword] = useState(false);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  // const { fileData, setFileData } = fileProps || {};
  const previewPic = (e: React.ChangeEvent<HTMLInputElement>,ind:number) => {
    const { fileData, setFileData } = fileProps || {};
    console.log({ind, fileData});
    const file = e.target.files?.[0];
    if (!file) return;

        if (file.size > MAX_SIZE) {
            e.target.value = "";    
            e.preventDefault();     
            alert("File too large! Maximum allowed is 10MB.");
            return;
        }
    const value = e.target.value;
    if (!file || !value) return;

  const fileName = (value || "").split("\\").pop()?.toLowerCase() || "";
  const newFileData = [{
    file,
    value,
    fileName,
  }];
   
    // console.log({newFileData})
    setFileData([...newFileData]);
}
// console.log({fileProps});
  return (
    <div className={`w-full`}>
      
 <p className='text-gray-700 text-base'>{showLabel ? label : ''}</p>
      <div
        style={showLabel ? { padding: 8 } : {}}
        className={`relative w-full flex flex-row items-center justify-between border bg-white rounded-md py-1 ${className}`}
      >
       
        {
        type==='file'?
        <div className='flex items-center justify-between'>
          {/* file input classNmae */}
          <button 
           className='rounded-md bg-blue-500 text-white px-4 py-2'
          onClick={()=>{
            const a=document.querySelector('#img1')
            console.log('hello')
            if(!a) {
              console.log("File input element not found");
              return;
            };
            (a as HTMLInputElement).click()
          }}>
            <p>Upload File</p>
          </button>
            <p className='text-black ml-2'>{fileProps?.fileData?.[0]?.fileName?.slice(0, 20) || ''}</p>

          <div className="hidden">
            {[0].map((ind)=>
                <input type="file" accept=".pdf, .doc, .docx" name="coverImg" 
                    className="hidden" id={"img1"}
                    onChange={(e)=>previewPic(e,ind)}
                    key={ind}
                />
            )}
          </div>  
        </div>
        :
        type==='textarea'?
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e)}
          placeholder={placeholder || label}
          className={`text-[16px] text-black flex-1 w-full ${textClassName}`}
          // type={type === "password" && !showPassword ? "password" : "text"}
          {...rest}
        />
        :type==='option'?
        <SelectOption options={options} onChange={onChange} value={value} label={label} />
        :<input
          value={value || ''}
          onChange={(e) => onChange(e)}
          placeholder={placeholder || label}
          className={`text-[16px] text-black flex-1 w-full ${textClassName}`}
          type={type === "password" && !showPassword ? "password" : "text"}
          {...rest}
        />}

        {type === "password" ? (
          <button
            className="min-w-fit flex items-center"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <p className="text-sm px-2 bg-">{showPassword ? "Hide" : "Show"}</p>
          </button>
        ) : null}
      </div>
      {extraText?<p className="text-gray-600 text-sm mt-2">{extraText}</p>:null}
    </div>
  );
}