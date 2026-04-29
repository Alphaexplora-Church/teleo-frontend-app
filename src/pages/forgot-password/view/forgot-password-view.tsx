import { Button } from "@/components/ui/button"
import { forgotPasswordSteps } from "../model/forgot-password-steps"
import { useForgotPasswordViewModel } from "../viewmodel/use-forgot-password-view-model"

export default function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel()

  const isSuccess = vm.currentStep >= forgotPasswordSteps.length - 1
  const CurrentForm = forgotPasswordSteps[
    Math.min(vm.currentStep, forgotPasswordSteps.length - 1)
  ].Content

  return (
    <div className="space-y-2 text-center">
      <div className="py-8">
        <CurrentForm
          formData={vm.formData}
          setFormData={vm.setFormData}
          errors={vm.errors}
          setErrors={vm.setErrors}
        />
      </div>

      <Button className="mt-6 w-full" onClick={isSuccess ? vm.finish : vm.next}>
        {isSuccess ? "Go to Login" : "Confirm"}
      </Button>
    </div>
  )
}
