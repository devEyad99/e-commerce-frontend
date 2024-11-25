import { signInSchema, signInType } from "../validations/signInScheme"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { Heading } from "../components/common"
import { Input } from "../Form"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    console.log(data);
  };

  return (
    <>
    <div className="mb-3 space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md ">
    <Heading title="Sign In"/>
    </div>
    <form
      onSubmit={handleSubmit(submitForm)}
     className="mt-2 space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md hover:drop-shadow-xl">
      {/* <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input type="email" id="email" name="email" placeholder="Enter your email" className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
      </div> */}
      <Input type="email" label="Email Address" name="email" placeholder="Enter Your Email" register={register} errors={errors.email?.message as string}/>
      {/* <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input type="password" id="password" name="password" placeholder="Enter your password" className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
      </div> */}
      <Input type="password" label="Password" name="password" placeholder="Enter Your Password" errors={errors.password?.message as string} register={register}/>
     
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign in
        </button>
      </div>
    </form>
    </>
  )
}
