'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"


const PatientForm = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)

        try {
            // const userData = { name, email, phone }
            // const user = await createUser(userData)
            // if(user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Get started with appointments.</p>
            </section>

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name='name'
                label="Full name"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                placeholder="John Doe"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name='email'
                label="Email"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
                placeholder="johndoe@gmail.com"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone number"
                placeholder="(+053) 1040 221"
            />

            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
    </Form>
  )
}

export default PatientForm