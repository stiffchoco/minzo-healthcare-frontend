const base = "/images/facilities";

const pools: Record <string, string[]> ={
    hospital:["hospital-1.jpg","hospital-2.jpg","hospital-3.jpg"],
    clinic:["clinic-1.jpg", "clinic-2.jpg", "clinic-3.jpg"],
    pharm: ["pharmacy-1.jpg", "pharmacy-2.jpg", "pharmacy-3.jpg"],
    lab: ["laboratory-1.jpg"],
}; 

const fallback = ["default-1.jpg", "default-2.jpg"];

function hash(s: string){
    let h=0;
    for(let i= 0; i <s.length; i++) h = (h*31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

export function facilityImage(category:string, seed: string, apiImage?:string){
    if(apiImage) return apiImage;
    const c = category.toLowerCase();
    const key = Object.keys(pools).find((k)=> c.includes(k));
    const pool = key ? pools[key] : fallback;

    return `${base}/${pool[hash(seed) % pool.length]}`;
}

//Distinct photos for the facilities page;

export function facilityGallery(category:string, seed: string, count=3, apiImages: string[] = []){
    const c = category.toLowerCase();
    const key= Object.keys(pools).find((k)=>c.includes(k));
    const rot =(a: string[]) =>(a.length ? a.map((_, i) =>a[(hash(seed) +i)% a.length]) :[]);
    const ordered = [...new Set([...rot(key? pools [key]: []), ...rot(fallback),
     ...rot(Object.values(pools).flat())])];
     const out = [...apiImages];
     for (const f of ordered){
        if(out.length >=count) break;
        out.push(`${base}/${f}`);
     }
     return out;
}