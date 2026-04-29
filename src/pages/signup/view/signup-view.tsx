import { Button } from "@/components/ui/button"
import { signupSteps } from "../model/signup-steps"
import { useSignupViewModel } from "../viewmodel/use-signup-view-model"
import AnimatedSplash from "../components/animated-splash"

export default function SignupView() {
  const vm = useSignupViewModel()

  const CurrentStep = signupSteps[vm.currentStep]
  const CurrentForm = CurrentStep.Content

  return (
    <>
      {/* Splash */}
      <AnimatedSplash
        show={vm.showSplash}
        text="Hello!"
        onDone={() => vm.setShowSplash(false)}
      />

      {/* Success */}
      {vm.showSuccess && (
        <AnimatedSplash show text="Your account is ready!" onDone={vm.finish} />
      )}

      {/* Main */}
      {!vm.showSplash && !vm.showSuccess && (
        <div className="space-y-8 text-center">
          <h1 className="text-4xl font-bold">{CurrentStep.title}</h1>
          <p className="text-lg">{CurrentStep.description}</p>

          <div className="py-8">
            <CurrentForm
              formData={vm.formData}
              setFormData={vm.setFormData}
              errors={vm.errors}
              setErrors={vm.setErrors}
            />
          </div>

          <Button className="mt-6 w-full" onClick={vm.next}>
            {CurrentStep.buttonText
              ? CurrentStep.buttonText
              : vm.currentStep === signupSteps.length - 1
                ? vm.formData.avatar_upload
                  ? "Finish"
                  : "Upload"
                : "Next"}
          </Button>
        </div>
      )}
    </>
  )
}
