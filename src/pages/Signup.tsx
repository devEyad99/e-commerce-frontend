import { Navigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { Heading } from "../components/common";
import  { Input } from "../Form/index";
import Spinner from "../components/common/Spinner/Spinner";

export default function Signup() {
  const {
    register,
    handleSubmit,
    submitForm,
    emialOnBlurHandler,
    emailAvailabilityStauts,
    loading,
    error,
    accessToken,
    errors,
  } = useRegister();

  if(accessToken){
    return <Navigate to="/"/>
  }
  return (
    <>
      <div className="mb-3 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <Heading title="User Registration" />
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mt-2 space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md hover:drop-shadow-xl"
      >
        <Input
         placeholder="Enter Your First Name" 
         label="First Name" 
         name="firstName"
        register={register}
        errors={errors.firstName?.message as string}/>
        {/* <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            id="firstName"
            placeholder="Enter your first name"
            className={`mt-1 block w-full h-12 rounded-md shadow-sm sm:text-sm ${
              errors.firstName
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div> */}

        {/* <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            id="lastName"
            placeholder="Enter your last name"
            className={`mt-1 block w-full h-12 rounded-md shadow-sm sm:text-sm ${
              errors.lastName
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div> */}
        <Input 
        placeholder="Enter Your Last Name" 
        label="Last Name" 
        name="lastName" 
        register={register} 
        errors={errors.lastName?.message as string} />

        <Input 
        placeholder="Enter Your Email" 
        label="Email Address" 
        name="email" 
        type="email" 
        register={register} 
        onBlur={emialOnBlurHandler}
        errors={
          errors.email?.message as string
          ? errors.email?.message as string
          : emailAvailabilityStauts === "notAvailable"
          ? "This email is already in use"
          : emailAvailabilityStauts === "failed" ?
          "Something went wrong while checking the email availability"
          : ""
        }
        formText={emailAvailabilityStauts === "checking" ? "We are currently checking the avaialbility of this email address. Please wait a moment." 
          : ""
        }
        success={emailAvailabilityStauts === "available" ? "This email is available for use"
          : ""
        }
        disabled={emailAvailabilityStauts === "checking" ? true: false}
        />
        
        {/* <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="Enter your email"
            className={`mt-1 block w-full h-12 rounded-md shadow-sm sm:text-sm ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            We'll never share your email with anyone else.
          </p>
        </div> */}

        <Input 
        label="Password" 
        placeholder="Enter Your Password" 
        name="password" 
        type="password" 
        register={register} 
        errors={errors.password?.message as string}/>
        {/* <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Enter your password"
            className={`mt-1 block w-full h-12 rounded-md shadow-sm sm:text-sm ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div> */}
        
        <Input 
        label="Confirm Password" 
        placeholder="Confirm Your Password" 
        name="confirmPassword" 
        type="password" 
        register={register} 
        errors={errors.confirmPassword?.message as string}/>
        {/* <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            id="confirmPassword"
            placeholder="Confirm your password"
            className={`mt-1 block w-full h-12 rounded-md shadow-sm sm:text-sm ${
              errors.confirmPassword
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div> */}

        <button
          type="submit"
          className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={emailAvailabilityStauts === "checking" ? true : false || loading === "pending"}
        >
          {loading === "pending" ? <Spinner/>  : "Submit"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </>
  );
}