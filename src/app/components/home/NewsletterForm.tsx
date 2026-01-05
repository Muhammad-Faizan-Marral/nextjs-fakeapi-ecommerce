"use client";
import React from "react";
import { MdCalendarMonth, MdHandshake } from "react-icons/md";

const NewsletterForm = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0A0A0A] py-16 sm:py-24 lg:py-32 border-t border-white/5 mt-[9rem]">
      {/* Gradient Background */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-10">
        <div
          className="aspect-[1155/678] w-[72rem] opacity-20 bg-gradient-to-tr from-purple-600 to-pink-500"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:max-w-none lg:grid-cols-2">
          {/* LEFT SECTION */}
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Subscribe to our newsletter.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Get exclusive access to new drops, special offers, and the latest tech news delivered to your inbox.
            </p>

            {/* Email Input + Button */}
            <form className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm"
              />

              <button
                type="submit"
                className="flex-none rounded-md bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* RIGHT SECTION */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            {/* WEEKLY ARTICLES */}
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <MdCalendarMonth className="text-white text-3xl" />
              </div>

              <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Non-spammy, curated content about the latest in tech and audio engineering.
              </dd>
            </div>

            {/* NO SPAM */}
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <MdHandshake className="text-white text-3xl" />
              </div>

              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Official promise. We only send you emails when we have something cool to show you.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
