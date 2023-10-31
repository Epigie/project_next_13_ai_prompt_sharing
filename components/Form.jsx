"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Form = ({ type }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [hospital, setHospital] = useState({
    name: "",
    phone_numbers: [],
    emails: [],
    location: null,
    description: "",
    specialisations: [],
    picture: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hospitals/new", {
        method: "POST",
        body: JSON.stringify({
          name: hospital?.name,
          phone_numbers: hospital?.phone_numbers,
          emails: hospital?.emails,
          picture: hospital?.picture,
          location: hospital?.location,
          description: hospital?.description,
          specialisations: hospital?.specialisations,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex-col w-full max-w-full pb-10 flex-start">
      <h1 className="text-left head_text">
        <span className="purple_gradient">{type} Hospital</span>
      </h1>

      <p className="max-w-md text-left desc">
        {type} and share specialised hospitals with the world for ease access
        and discovery.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full my-10 lg:w-4/5 xl:w-3/5 lg:self-center glassmorphism"
      >
        <div className="flex flex-col w-full space-y-4 lg:space-y-0 lg:flex-row lg:space-x-8 h-min">
          <div className="flex flex-col w-full space-y-4 h-min">
            <label>
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Name
              </span>

              <input
                value={hospital?.name}
                onChange={(e) =>
                  setHospital({ ...hospital, name: e.target.value })
                }
                placeholder="Hospital name"
                required
                className="form_input"
              />
            </label>

            <label>
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Phone numbers
              </span>

              <input
                value={hospital?.phone}
                onChange={(e) =>
                  setHospital({ ...hospital, phone: e.target.value })
                }
                placeholder="Hospital phone"
                required
                className="form_input"
              />
            </label>

            <label>
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Emails
              </span>

              <input
                value={hospital?.email}
                onChange={(e) =>
                  setHospital({ ...hospital, email: e.target.value })
                }
                placeholder="Hospital email"
                required
                className="form_input"
              />
            </label>

            <label>
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Picture
              </span>

              <input
                value={hospital?.picture}
                onChange={(e) =>
                  setHospital({ ...hospital, email: e.target.value })
                }
                placeholder="Hospital picture"
                required
                className="form_input"
              />
            </label>
          </div>

          <div className="flex flex-col w-full space-y-4 h-min">
            <label>
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Description
              </span>

              <textarea
                value={hospital?.description}
                onChange={(e) =>
                  setHospital({ ...hospital, description: e.target.value })
                }
                placeholder="Hospital description"
                required
                className="form_textarea "
              />
            </label>

            <label>
              <span className="text-base font-semibold text-gray-700 font-satoshi">
                Hospital Specialisation{" "}
                <span className="font-normal">
                  (#brain_surgery, #cancer_treatmeant, etc.)
                </span>
              </span>
              <input
                value={hospital?.specialisation}
                onChange={(e) =>
                  setHospital({ ...hospital, specialisation: e.target.value })
                }
                type="text"
                placeholder="#Specialisation"
                required
                className="form_input"
              />
            </label>
          </div>
        </div>

        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-purple-500 hover:bg-purple-400 active:bg-ppurple-600 rounded-full text-white"
          >
            {submitting ? `${type}ing... Hospital` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
