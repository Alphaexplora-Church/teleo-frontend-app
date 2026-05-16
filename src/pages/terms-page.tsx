import PageHeader from "@/components/page-header"
import { TermsContent } from "@/components/terms"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function TermsPage() {
  return (

    <div className="mx-auto max-w-2xl px-4 py-8">
      <PageHeader title="Terms and Conditions" backTo="/landing" />
      <TermsContent />
      <Button asChild size="lg" className="w-full mt-8">
      <Link to="/landing">Go Back</Link>
      </Button>

    </div>
  )
}
