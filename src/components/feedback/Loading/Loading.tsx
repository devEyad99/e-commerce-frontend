import { TLoading } from "../../../types/shared" 

interface LoadingProps {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
}

export default function Loading({loading, error, children}: LoadingProps) {
  if(loading === 'pending'){
    return <div className="text-center">Loading...</div>
  }
  if(loading === 'failed'){
    return <div className="text-center text-red-500">{error}</div>
  }
  return <>{children}</>
}
