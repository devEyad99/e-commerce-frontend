//..
import { Suspense } from "react"
import LottieHandler from "../LottieHandler/LottieHandler"


export default function PAgeSuspenseFullback({children}: {children: React.ReactNode}) {
  return (
    <Suspense
    fallback={
      <LottieHandler type="shoppingLoading" message="loading please wait..."/>
    }
    >
    {children}
    </Suspense>
  )
}
