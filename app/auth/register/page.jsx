"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useRouter } from "next/navigation";
import { IoEllipse } from "react-icons/io5";
import AuthFramework from "@components/framework/AuthFramework";
import ColorPicker from "@components/ColorPicker";
import { HexColorInput } from "react-colorful";
import {
  FormField,
  PhotoField,
  SubmitButton,
  SuccessMessage,
} from "@components/forms";
import { ErrorMessage, Form, Formik } from "formik";
import { signupSchema } from "@app/utilities/schemas";
import AppImage from "@components/AppImage";
import Logo from "public/logo.png";
import {
  IoArrowBack,
  IoLockClosed,
  IoMail,
  IoPhonePortrait,
} from "react-icons/io5";
import { classNames } from "@app/utilities/common";

const Register = () => {
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [error, setError] = useState(null);

  const handleProceed = () => {
    setStep((prev) => prev + 1);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const router = useRouter();

  const signupHandler = async (values, { setErrors, setSubmitting }) => {
    try {
      const formData = new FormData();

      if (values.name) {
        formData.append("name", values.name);
      }
      if (values.email) {
        formData.append("email", values.email);
      }
      if (values.password) {
        formData.append("password", values.password);
      }
      if (values.password_confirmation) {
        formData.append("password_confirmation", values.password_confirmation);
      }

      setSubmitting(true);

      const res = await fetch(`${apiUrl}/api/v1${endpoint}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      res.status === 201 &&
        router.push("/auth/login?success=Account has been created");

      const userData = response.data;
      logIn(userData);

      setSuccessMessage(response.message);

      navigate(from_location, { replace: true });
    } catch (error) {
      console.error("error", error);
      setErrorMessage(error.message);
      setErrors(error.errors);
      setError(error);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFramework>
      <section
        style={{
          backgroundColor: `#${selectedColor}`,
        }}
        className={classNames(
          `relative flex flex-col items-center justify-around w-screen h-screen px-4 space-y-8 text-gray-800 md:flex-row transition-all duration-300 ease-in`,
          selectedColor === null && "bg-white/20"
        )}
      >
        <section
          className={classNames(
            `flex flex-col w-full bg-gradient-to-tr from-white to-white/40 space-y-0 overflow-x-hidden overflow-y-auto text-xs text-left transition-all duration-300 ease-in-out shadow-lg md:w-11/12 lg:w-4/5 lg:justify-center lg:items-center h-4/5 backdrop-blur-xl md:space-y-4 text-gray-800 rounded-3xl lg:text-sm xl:text-base md:scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-400 scrollbar-track-transparent md:shadow-xl`
          )}
        >
          <section className="flex flex-col w-full px-6 py-4 space-y-4 transition-all duration-300 ease-in-out lg:justify-evenly lg:flex-row">
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
                    Not New?&nbsp;
                    <Link href={"/auth/register"} className="text-blue-500">
                      Login Now!
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <section className="flex flex-col items-center self-center w-auto space-y-4 lg:hidden">
              <h2 className="flex self-center -mt-2 text-xs font-medium text-center text-gray-800">
                {`Discover Specialised Hospitals.`}
              </h2>
            </section>

            <section className="self-center hidden lg:flex h-3/5" />

            <section className="flex flex-col items-center self-center w-full space-y-4 lg:w-45">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                }}
                onSubmit={signupHandler}
                validationSchema={signupSchema}
              >
                {({ errors, isSubmitting, values }) => (
                  <Form
                    className={`relative flex justify-center items-center w-full h-full transition-all duration-300 ease-in-out`}
                  >
                    <section className="relative flex flex-col items-center self-center px-6 py-4 space-y-2 text-xs text-left text-gray-800 transition-all duration-300 ease-in-out shadow-lg md:space-y-4 bg-white/70 backdrop-blur-xl rounded-3xl lg:text-sm xl:text-base md:shadow-xl">
                      {errorMessage && (
                        <section className="flex self-center">
                          <ErrorMessage>{errorMessage}</ErrorMessage>
                        </section>
                      )}
                      {successMessage && (
                        <SuccessMessage>{successMessage}</SuccessMessage>
                      )}

                      {step === 0 && (
                        <>
                          <FormField
                            isAuth
                            type="text"
                            name="name"
                            label={"Name"}
                            errors={errors?.name}
                            values={values?.name}
                            placeholder="John Mulenga"
                            icon={
                              <IoPhonePortrait className="ml-2 text-xl text-teal-500" />
                            }
                          />

                          <FormField
                            isAuth
                            type="email"
                            name="email"
                            label={"Email"}
                            errors={errors?.email}
                            values={values?.email}
                            placeholder="andy@epigie.com"
                            icon={
                              <IoMail className="ml-2 text-xl text-teal-500" />
                            }
                          />

                          <FormField
                            isAuth
                            type="password"
                            name="password"
                            label={"Password"}
                            placeholder="********"
                            errors={errors?.password}
                            values={values?.password}
                            icon={
                              <IoLockClosed className="ml-2 text-xl text-teal-500" />
                            }
                          />

                          <FormField
                            isAuth
                            type="password"
                            name="password_confirmation"
                            label={"Confirm password"}
                            placeholder="********"
                            errors={errors?.password_confirmation}
                            values={values?.password_confirmation}
                            icon={
                              <IoLockClosed className="ml-2 text-xl text-teal-500" />
                            }
                          />

                          <section className="flex flex-col space-y-0">
                            {errors && (
                              <section className="flex flex-col">
                                {errors.name && (
                                  <ErrorMessage>
                                    {"Name has errors."}
                                  </ErrorMessage>
                                )}
                                {errors.email && (
                                  <ErrorMessage>
                                    {"Email has errors."}
                                  </ErrorMessage>
                                )}
                                {errors.password && (
                                  <ErrorMessage>
                                    {"Password has errors."}
                                  </ErrorMessage>
                                )}
                                {errors.password_confirmation && (
                                  <ErrorMessage>
                                    {"Password confirmation have errors."}
                                  </ErrorMessage>
                                )}
                              </section>
                            )}
                          </section>

                          <section className="flex space-x-4">
                            <section
                              className="p-2 bg-blue-600 rounded-full h-fit left-4"
                              onClick={() => setStep(1)}
                            >
                              <IoArrowBack className="text-xl text-white" />
                            </section>

                            <SubmitButton
                              disabled={isSubmitting}
                              padding={`py-1 px-2`}
                              radius={`rounded-full`}
                            >
                              {isSubmitting ? "wait..." : "Create"}
                            </SubmitButton>
                          </section>
                        </>
                      )}

                      <section className="flex items-center self-center py-2 lg:hidden">
                        <p className="flex items-center text-gray-800">
                          Not new?&nbsp;
                          <Link
                            href={"/auth/login"}
                            className="text-indigo-500"
                          >
                            login Now
                          </Link>
                        </p>
                      </section>
                    </section>
                  </Form>
                )}
              </Formik>
            </section>
          </section>

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
              <IoEllipse className={`hidden lg:flex w-1 h-1`} />
            </section>

            <Link
              href="/docs/about"
              className="flex flex-col self-center px-6 space-4"
            >
              &copy; HospitalFinder 2023
            </Link>
          </section>
        </section>
      </section>
    </AuthFramework>
  );
};

export default Register;
