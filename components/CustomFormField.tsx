import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Control } from "react-hook-form"

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { E164Number } from "libphonenumber-js/core";

export enum FormFieldType {
    INPUT = 'input',
    CHECKBOX = 'checkbox',
    PHONE_INPUT = 'phoneInput',
    TEXTAREA = 'textarea',
    SKELETON = 'skeleton',
    DATE_PICKER = 'datePicker',
    SELECT = 'select'
}

interface CustomProps {
    control: Control<any>
    fieldType: FormFieldType
    name: string
    label?: string
    iconSrc?: string
    iconAlt?: string
    placeholder?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    children?: React.ReactNode
    skeleton?: (field: any) => React.ReactNode
}

const RenderField = ({field, props}: {field:any; props: CustomProps}) => {
    const { fieldType, iconAlt, iconSrc, placeholder } = props
    switch ( fieldType ) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image 
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="ml-2"
                        />
                    )}

                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput 
                        defaultCountry="PH"      
                        value={field.value as E164Number | undefined}   
                        onChange={field.onChange}
                        className="input-phone"    
                        international
                        withCountryCallingCode
                        placeholder={placeholder}       
                    />
                </FormControl>
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem>
            {fieldType !== FormFieldType.CHECKBOX && label &&
                <FormLabel>{ label }</FormLabel>
            }        

            <RenderField  field={field} props={props} />

            <FormMessage />
        </FormItem>
        )}
        />
  )
}

export default CustomFormField