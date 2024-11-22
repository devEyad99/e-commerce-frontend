import { TLoading } from "../../../types/shared" 
import CategorySkeletons from "../skeletons/CategorySkeleton/CategorySkeletons";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";


const skeletonsTypes = {
  product: ProductSkeleton,
  cart: CartSkeleton,
  category: CategorySkeletons
}

interface LoadingProps {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
}

export default function Loading({loading, error, children, type="category"}: LoadingProps) {

  const Component = skeletonsTypes[type]

  if(loading === 'pending'){
    return <div className="text-center"><Component/></div>
  }
  if(loading === 'failed'){
    return <div className="text-center text-red-500">{error}</div>
  }
  return <>{children}</>
}
