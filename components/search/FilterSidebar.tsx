"use client";
import type {ReactNode} from "react";
import {categories} from "@/lib/categories";

type Props = {
    type: string;
    rating: number;
    radius : number;
    useLocation: boolean;
    onType : (v: string) => void;
    onRating: (v: number) => void;
    onRadius: (v: number) => void;
    onUseLocation: (on: boolean) => void;
    onClear:() => void;
};

const ratings = [
    [1, "*1+ & up"],
    [2, "**2+ & up"],
    [3, "***3+ & up"],
    [4, "***4+ & up"],
    [5, "*****5"]
] as const;

const radii = [
    [5, "Within 5 km"],
    [10, "Within 10 km"],
    [20, "Within 20 km"],
] as const;

function Group({title, children}: {
    title: string; children: ReactNode
})
{
    return (
        <fieldset className="mt-5 first-of-type:mt-4">
            <legend className="mb-1 text-sm font-semibold text-slate-900 lg: font-medium lg:text-sky-100">
                {title}
            </legend>
            {children}
        </fieldset>
    )
}

function Option({checked, onChange, label }: {checked: boolean; onChange: () => void; label: string}){
    return(
        <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm lg: gap-2 lg:py-1">
            <input type="checkbox" 
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 rounded border-slate-400 accent-[#0b4468] lg:h-4 lg:w-4 lg:accent-[#5b9a68]"/>
        {label}
        </label>
    )
}

export default function FilterSidebar(p:Props) {
    return (
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 lg:top-24
        lg:rounded-3xl lg:border-0 lg:bg-[#0b4468] lg:text-white lg:shadow-none">
            <h2 className="text-xl font-bold lg:text-lg">Filter Results</h2>
            <Group title="Category">
                <Option checked = {!p.type} onChange={() => p.onType("")} label="All Categories"/>
                    {categories.map((c) => (
                        <Option key={c.value}
                        checked={p.type === c.value}
                        onChange={()=> p.onType(p.type === c.value ? "": c.value)}
                        label={c.short}/>
                    ))}
            </Group>
            <Group title="Rating">
                <Option checked={p.rating ===0} 
                onChange={() => p.onRating(0)}
                label = "All Ratings" />
                {ratings.map(([v, label]) => (
                    <Option key={v}
                    checked={p.rating === v} onChange={() => p.onRating(p.rating === v ? 0 :v)}
                    label={label} />
                ))}
            </Group>

            <Group title="Distance">
                <Option checked={p.radius === 0}
                onChange={() => p.onRadius(0)}
                label="Any distance" />
                {radii.map(([v, label]) => (
                    <Option key={v} checked = {p.radius === v} onChange={() => p.onRadius(p.radius === v? 0 :v)}
                    label={label} />
                ))}
            </Group>
            
            <Group title="Location">
                <Option checked={p.useLocation}
                onChange={() => p.onUseLocation(!p.useLocation)} label="Use my location" />
            </Group>

                <button type="button"
                onClick={p.onClear}
                className="mt-6 w-full rounded-xl border border-slate-400 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 lg:w-auto lg:border-white lg:text-white lg:hover:bg-white/10">

                </button>

        </aside>
    )
}