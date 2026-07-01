import { OtpStep, FormStep, SuccessStep } from "../security.view"

type SecurityStep = {
  Content: any
}

export const securitySteps: SecurityStep[] = [
  { Content: OtpStep },
  { Content: FormStep },
  { Content: SuccessStep },
]
