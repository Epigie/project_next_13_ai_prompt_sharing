"use client";
import { useState, useEffect } from "react";
import { IoPerson, IoLockClosed, IoEllipse } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import Link from "next/link";
// resources
import Logo from "public/logo.png";
import { classNames } from "@app/utilities/common";
import AppImage from "@components/AppImage";
import {
  ErrorMessage,
  FormField,
  SubmitButton,
  SuccessMessage,
} from "@components/forms";
import { loginSchema } from "@app/utilities/schemas";
import AuthFramework from "@components/framework/AuthFramework";

const SigninPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState(null);
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  console.log(session);
  if (session && session?.authenticated) {
    router.push("/profile");
  }

  useEffect(() => {
    session?.user && redirect(`/`);
  }, [session]);

  const loginHandler = async (values, { setErrors, setSubmitting }) => {
    try {
      const formData = new FormData();
      setSubmitting(true);

      const response = signIn("hospitalfinder", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      console.log("response", response);
      const userData = response?.data;

      setSuccessMessage(response?.message);
    } catch (error) {
      console.error("error", error);

      setErrorMessage(error?.message);
      setErrors(error?.errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFramework>
      <section
        className={classNames(
          `relative flex flex-col items-center justify-around w-screen h-screen px-4 space-y-8 text-gray-800 md:flex-row transition-all duration-300 ease-in bg-black/20`
        )}
      >
        <div
          className={classNames(
            `flex flex-col w-full bg-gradient-to-tr from-white to-white/30 space-y-0 overflow-x-hidden overflow-y-auto text-xs text-left transition-all duration-300 ease-in-out shadow-lg md:w-11/12 lg:w-4/5 lg:justify-center lg:items-center h-4/5 backdrop-blur-xl md:space-y-4 text-gray-800 rounded-3xl lg:text-sm xl:text-base md:scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-400 scrollbar-track-transparent md:shadow-xl`
          )}
        >
          <div className="flex flex-col w-full px-6 py-4 space-y-4 transition-all duration-300 ease-in-out lg:justify-evenly lg:flex-row">
            <div className="flex items-start self-center py-4 space-x-2 text-transparent lg:space-x-0 lg:space-y-4 lg:items-center bg-clip-text bg-gradient-to-bl from-indigo-700 via-sky-500 to-app-blue">
              <AppImage
                src={Logo}
                className={`object-cover`}
                alt={"HospitalFinder logo"}
                height="h-16 md:h-24 2xl:h-28"
                width="w-16 md:w-24 2xl:28"
                linkTo={`/`}
                sizes="(max-width: 768px) 112px, (max-width: 1280px) 112px, (max-width: 1536px) 112px, 64px"
              />

              <div className="flex flex-col items-center self-center w-auto -mt-2 space-y-4 lg:pt-16">
                <h1 className="self-center text-5xl md:text-8xl">{`HospitalFinder`}</h1>

                <h2 className="self-center hidden text-base font-medium text-gray-800 lg:flex lg:text-xl">
                  {`Discover Specialised Hospitals.`}
                </h2>

                <div className="items-center self-center hidden py-2 pt-10 lg:flex">
                  <p className="flex items-center text-gray-800">
                    New to HospitalFinder?&nbsp;
                    <Link href={"/auth/register"} className="text-blue-500">
                      Create account Now!
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center self-center w-auto space-y-4 lg:hidden">
              <h2 className="flex self-center -mt-2 text-xs font-medium text-center text-gray-800">
                {`Discover Specialised Hospitals.`}
              </h2>
            </div>

            <div className="self-center hidden lg:flex h-3/5" />

            <div className="flex flex-col items-center self-center w-full space-y-4 lg:w-30">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={loginHandler}
              >
                {(errors, isSubmitting, values) => (
                  <Form className="flex flex-col px-6 py-4 space-y-2 text-xs text-left text-gray-800 transition-all duration-300 ease-in-out shadow-lg bg-white/70 backdrop-blur-xl md:space-y-4 md:max-w-sm rounded-3xl lg:text-sm xl:text-base md:shadow-xl">
                    <h1 className="self-center text-sm font-medium text-gray-800 xl:text-lg">
                      {"Login to get started"}
                    </h1>

                    {errorMessage && (
                      <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}
                    {successMessage && (
                      <SuccessMessage>{successMessage}</SuccessMessage>
                    )}

                    <FormField
                      isAuth
                      type="text"
                      name="email"
                      label={"Email"}
                      errors={errors.email}
                      placeholder="Email"
                      uppercase={true}
                      icon={<IoPerson className="ml-2 text-xl text-gray-400" />}
                    />

                    <FormField
                      isAuth
                      type="password"
                      name="password"
                      label={"Password"}
                      placeholder="********"
                      errors={errors.password}
                      icon={
                        <IoLockClosed className="ml-2 text-xl text-gray-400" />
                      }
                    />

                    <div className="flex flex-col items-center self-center w-auto">
                      <SubmitButton
                        type={"submit"}
                        radius={`rounded-full`}
                        padding={`py-1 px-2`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "wait..." : "Login"}
                      </SubmitButton>

                      <div className="flex items-center self-center mt-4">
                        <p className="flex items-center text-gray-800">
                          New to HospitalFinder? &nbsp;
                          <Link
                            href={"/auth/register"}
                            className="text-blue-600"
                          >
                            Register Now
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <section className="flex flex-col self-center w-full pb-4 space-x-4 text-center text-gray-950">
            <section className="flex flex-wrap items-center self-center py-4 space-x-4 text-justify lg:text-center w-fit">
              <IoEllipse className={`hidden lg:flex w-1 h-1`} />
              <Link href="https://link.co.zm" className={`flex `}>
                Link Pharmacy
              </Link>
              <IoEllipse className={`flex w-1 h-1`} />
              <Link href="/docs/about" className={`flex `}>
                About
              </Link>
              <IoEllipse className={`flex w-1 h-1`} />
            </section>

            <Link
              href="/docs/about"
              className="flex flex-col self-center px-6 space-4"
            >
              &copy; HospitalFinder 2023
            </Link>
          </section>
        </div>
      </section>
    </AuthFramework>
  );
};

export default SigninPage;
