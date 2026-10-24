import Link from "next/link"

export default function RegisterType({registerType}: {registerType: string}) {
  return (
    <section className="flex items-center text-[18px] gap-x-6 mb-4">
      {[{label: 'Log In', href: '/login'}, {label: 'Sign Up', href: '/register'}].map((item, index) => (
        <div className={registerType==item.label ? 'white-btn' : 'blue-btn'} key={index}>
        <Link className="w-full h-full" key={index} href={item.href}>{item.label}</Link>
        {/* <p>{registerType}</p> */}
        </div>  
      ))}
    </section>
  )
}

