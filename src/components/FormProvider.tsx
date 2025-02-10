import type { FormEventHandler, ReactNode } from 'react'

import React from 'react'
import { FormProvider as Form } from 'react-hook-form'

interface FormProviderProps {
  children?: ReactNode
  methods?: any
  onSubmit?: FormEventHandler<HTMLFormElement>
}

/**
 * FormProvider Component
 *
 * A wrapper component that provides form functionality using react-hook-form.
 *
 * @component
 * @param {object} props - Component props
 * @param {ReactNode} [props.children] - Child elements to be wrapped by the form
 * @param {any} [props.methods] - Form methods from react-hook-form (useForm hook)
 * @param {FormEventHandler<HTMLFormElement>} [props.onSubmit] - Form submission handler
 *
 * @example
 * ```tsx
 * const methods = useForm();
 *
 * return (
 *   <FormProvider
 *     methods={methods}
 *     onSubmit={handleSubmit(onSubmit)}
 *   >
 *     <TextField name="email" />
 *     <Button type="submit">Submit</Button>
 *   </FormProvider>
 * );
 * ```
 */
function FormProvider({
  children,
  onSubmit,
  methods,
}: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  )
}

export default React.memo(FormProvider)
