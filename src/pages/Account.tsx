//..
import { useAppSelector } from "../store/hooks"
import { Heading } from "../components/common"

export default function Account() {
  
  const accountInfo = useAppSelector((state) => state.auth.user);

  return (
   <>
   <Heading title="Account Info"/>
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="text-lg font-semibold">First Name</h2>
        <p>{accountInfo?.firstName}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Last Name</h2>
        <p>{accountInfo?.lastName}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Email</h2>
        <p>{accountInfo?.email}</p>
      </div>
    </div>
   </>
  )
}

