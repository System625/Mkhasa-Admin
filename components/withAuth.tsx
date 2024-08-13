import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/login")
      }
    }, [status, router])

    if (status === "authenticated") {
      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth