import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"


function LandingPage() {
  const { user } = useContext(AuthContext) || null
  // console.log(user);
  
  const navigate = useNavigate()

  useEffect( () => {
    user && navigate('/home')
  },[])
  
  return (
    <main className="bg-blue-100">
      <section className="py-10  sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
              Bringing People Closer, Your World of Instant Messaging Awaits.
            </h2>
            <p className="mt-6 text-lg text-gray-900">
              Experience seamless communication with our chat app, offering instant messaging, real-time updates, and secure conversations to keep you connected with friends, family, or colleagues effortlessly.
            </p>
            <Link
              to={'/signup'}
              title=""
              className="inline-flex items-center justify-center px-6 py-4 mt-12 text-lg animate-pulse font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700"
              role="button"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1"
                xmlns="http://www.w3.org/3000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Start Your Journey
            </Link>
          </div>
        </div>
        <div className="container mx-auto 2xl:px-12">
          <img
            className="w-full mt-6"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/team/4/group-of-people.png"
            alt=""
          />
        </div>
      </section>
    
      <section className="pb-5">
        <div className="py-5 mb-1 rounded-lg bg-gradient-to-r from-fuchsia-600 to-blue-600">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold leading-tight text-center text-white sm:text-4xl lg:text-5xl">
              You’ll be in great company
            </h2>
            <p className="mt-4 text-white">A smarter way to connect and collaborate. We take care to make your conversations secure, reliable, and fun, no matter where you are.</p>
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-11">
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-1.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-3.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-4.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-orange-500 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Floyd Miles
                </p>
                <p className="mt-2 text-sm text-white truncate">Designer</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-6.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-7.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-9.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-10.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-11.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-12.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-blue-500 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Bessie Cooper
                </p>
                <p className="mt-2 text-sm text-white truncate">Marketer</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-13.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-14.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-15.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-16.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-gray-700 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Annette Black
                </p>
                <p className="mt-2 text-sm text-white truncate">Photographer</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-17.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-18.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-19.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-20.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-21.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-22.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-23.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-24.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-green-400 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Leslie Alexander
                </p>
                <p className="mt-2 text-sm text-white truncate">Developer</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-25.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-26.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-27.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-red-500 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Wade Warren
                </p>
                <p className="mt-2 text-sm text-white truncate">Founder</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-28.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-29.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-gray-800 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Guy Hawkins
                </p>
                <p className="mt-2 text-sm text-white truncate">SaaS Founder</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-30.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-31.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-32.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-33.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-34.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="bg-indigo-500 aspect-w-1 aspect-h-1">
              <div className="p-3 sm:p-5 xl:py-6 2xl:py-8 2xl:px-5">
                <p className="text-sm font-semibold leading-tight text-white sm:text-lg sm:leading-tight">
                  Ralph Edwards
                </p>
                <p className="mt-2 text-sm text-white truncate">Freelancer</p>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-35.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-200"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-4.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="bg-gray-300"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/3/avatar-3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage