import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm relative">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-4 left-0 mb-4"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
