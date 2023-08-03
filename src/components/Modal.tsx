import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import CustomDatePicker from "./DatePicker";

export default function ModalSection({ handleSubmit, open, setOpen }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="first-name"
                              name="firstName"
                              autoComplete="fistName"
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="lastName"
                              id="last-name"
                              autoComplete="family-name"
                              className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Gender
                      </h2>
                      <div className="flex items-center justify-between">
                        {/*
                            Gender Option
                        */}
                        <div className="flex items-center gap-x-3">
                          <input
                            id="gender-male"
                            name="gender"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            value="male"
                          />
                          <label
                            htmlFor="gender-male"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Male
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="gender-female"
                            name="gender"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            value="female"
                          />
                          <label
                            htmlFor="gender-female"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Female
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="gender-other"
                            name="gender"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            value="other"
                          />
                          <label
                            htmlFor="gender-other"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Others
                          </label>
                        </div>
                      </div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        DOB
                      </h2>
                      <div className="text-black">
                        <CustomDatePicker handleChange={undefined} />
                      </div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Measurement
                      </h2>
                      {/* Measurement  */}
                      <div className="flex justify-between flex-col align-between ">
                        <div>
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Weight
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              type="number"
                              name="weight"
                              id="weight-input"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <label htmlFor="weight-input" className="sr-only">
                                Weight
                              </label>
                              <select
                                id="weight-measure"
                                name="weightMeasurement"
                                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                              >
                                <option>KG</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="height"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Height
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              type="number"
                              name="height"
                              id="height"
                              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <label
                                htmlFor="height-measurement"
                                className="sr-only"
                              >
                                Height
                              </label>
                              <select
                                id="height-measurement"
                                name="heightMeasurement"
                                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                              >
                                <option>Inch</option>
                                <option>Cm</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center bg-[#3c50e0] text-white rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="mt-3 flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
