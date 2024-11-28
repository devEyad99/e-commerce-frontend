import Lottie from "lottie-react"
import notFound from '../../../asset/lottieFiles/notFound.json';
import shoppingError from "../../../asset/lottieFiles/shoppingError.json";
import shoppingLoading from "../../../asset/lottieFiles/shoppingLoading.json";
import error from "../../../asset/lottieFiles/error.json";
import success from "../../../asset/lottieFiles/success.json";


const lottieFilesMap = {
  notFound,
  shoppingError,
  shoppingLoading,
  error,
  success
}

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  className?: string;
}

export default function LottieHandler({type, message, className}: LottieHandlerProps) {
  const lottieFile = lottieFilesMap[type];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Lottie animationData={lottieFile} style={{ width: "400px", marginBottom: "30px" }} />
      {message && <h3 className="font-lg">{message}</h3>}
    </div>
  )
};
