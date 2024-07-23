import React from 'react'
import {FieldValues,UseFormRegister, FieldErrors} from 'react-hook-form'
import { BsCurrencyDollar } from "react-icons/bs";


interface InputProps {
    id: string;
    disabled?: boolean;
    formatPrice?: boolean;
    type?: string;   
    label: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    disabled,
    formatPrice,
    type = 'text',
    label,
    register,
    errors,
    required
}) => {
  return (
    <div className="relative w-full">
        {
            formatPrice && <BsCurrencyDollar className="text-neutral-700 absolute top-5 left-2" size={24}/>
        }
        <input id={id} disabled={disabled} type={type} placeholder=" " {...register(id, {required})} className={`peer w-full rounded-md border-2 p-4 pt-6 mt-4 disabled:cursor-not-allowed disabled:opacity-70 outline-none ${formatPrice ? 'pl-9': 'pl-4'} ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}` }/>
        <label className={`absolute transform translate-y-5 text-md ${formatPrice ? 'left-9' : 'left-4'}  duration-300 transition peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-9 peer-focus:scale-75 peer-focus:translate-y-5 ${errors[id] ? 'text-rose-500' : 'text-gray-500'}`}>{label}</label>
    </div>
  )
}

export default Input