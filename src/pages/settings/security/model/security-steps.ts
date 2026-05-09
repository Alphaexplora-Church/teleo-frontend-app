import { OtpStep, FormStep, SuccessStep } from "../view/security-view"

type SecurityStep = {
  Content: React.FC<any>
}

export const securitySteps: SecurityStep[] = [
  { Content: OtpStep },
  { Content: FormStep },
  { Content: SuccessStep },
]
