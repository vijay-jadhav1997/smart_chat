import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"

import { RiFileUserFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL

function Profile() {
  const [isProfileEditing, setIsProfileEditing] = useState(false)
  const {user} = useContext(AuthContext)
  // console.log('user => ', user);

  
  return (
    <>
    {
      isProfileEditing 
      ?
      (
        <section className="w-full overflow-hidden dark:bg-gray-900">
          <div className="flex flex-col">
            {/* Cover Image */}
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="User Cover"
              className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
            />

            {/* Profile Image */}
            <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
              <img
                src={`${baseURL}/media/${user?.dp_image}`}
                // src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="User Profile"
                className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
              />

              {/* FullName */}
              <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-2xl font-serif">
                {user?.username}
              </h1>
            </div>

            <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
              {/* Bio */}
              <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
                {user?.bio ? user?.bio : "Hello friends, I'm using SmartChatBot"}
              </p>

              {/* User Details */}
              <div className="w-full my-auto mt-4 pt-2 pb-6 flex flex-col justify-center gap-2 border-t border-purple-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-left pl-2 text-2xl font-semibold flex items-center gap-x-2"> <RiFileUserFill /> Personal details:</h2>
                  <Link to={'/profile'} className="hover:text-blue-400"><FaRegEdit /></Link>
                </div>
                <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                  <div className="w-full">
                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          First Name
                        </dt>
                        <dd className="text-lg font-semibold">{user?.first_name ? user?.first_name : 'N/A'}</dd>
                      </div>
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Last Name
                        </dt>
                        <dd className="text-lg font-semibold">{user?.last_name ? user?.last_name : 'N/A'}</dd>
                      </div>
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Date Of Birth
                        </dt>
                        <dd className="text-lg font-semibold">{user?.date_of_birth ? user?.date_of_birth : 'N/A'}</dd>
                      </div>
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Gender
                        </dt>
                        <dd className="text-lg font-semibold">{user?.first_name ? user?.first_name : 'N/A'}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="w-full">
                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                      
                      <div className="flex flex-col py-3 text-start px-2 border-t sm:border-none border-gray-200  dark:border-gray-700">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Phone Number
                        </dt>
                        <dd className="text-lg font-semibold">{user?.mobile_number ? user?.mobile_number : 'N/A'}</dd>
                      </div>
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Email
                        </dt>
                        <dd className="text-lg font-semibold">
                          {user?.email ? user?.email : 'N/A'}
                        </dd>
                      </div>
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Website
                        </dt>
                        <dd className="text-lg font-semibold hover:text-blue-500">
                          {user?.first_name ? user?.first_name : 'N/A'}
                        </dd>
                      </div>
                      <div className="flex flex-col py-3 text-start px-2">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Location
                        </dt>
                        <dd className="text-lg font-semibold">
                          {user?.address ? user?.address : 'N/A'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                {/* <div className="my-10 lg:w-[70%] md:h-[14rem] xs:w-full xs:h-[10rem]">
                  <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                    My Location
                  </h1>
                
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028974562!2d38.613328040215286!3d8.963479542403238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1710567234587!5m2!1sen!2set"
                    className="rounded-lg w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div> */}
              </div>


              {/* Social Links */}
              {/* <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
                <a href="https://www.linkedin.com/in/samuel-abera-6593a2209/">
                  <div className="p-2 hover:text-primary hover:dark:text-primary">
                    <svg
                      className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                        clipRule="evenodd"
                      />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                    </svg>
                  </div>
                </a>
                <a href="https://twitter.com/Samuel7Abera7">
                  <div className="p-2 hover:text-primary hover:dark:text-primary">
                    <svg
                      className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                  </div>
                </a>
                <a href="">
                  <div className="p-2 hover:text-blue-500 hover:dark:text-blue-500">
                    <svg
                      className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-blue-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </a>
                <a href="https://www.youtube.com/@silentcoder7">
                  <div className="p-2 hover:text-primary hover:dark:text-primary">
                    <svg
                      className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-red-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </a>
              </div> */}
            </div>
          </div>
        </section>
      )
      :
      (
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
            <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              {/*  */}
              <div className="">
                <h1 className="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-2 dark:text-white">
                  Profile
                </h1>
                <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
                  Create Profile
                </h2>
                <form>
                  {/* Cover Image */}
                  <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                    {/* Profile Image */}
                    <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                      <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                        <input
                          type="file"
                          name="profile"
                          id="upload_profile"
                          hidden=""
                          required=""
                        />
                        <label htmlFor="upload_profile">
                          <svg
                            data-slot="icon"
                            className="w-6 h-5 text-blue-700"
                            fill="none"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            ></path>
                          </svg>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {/*  */}
                      <input
                        type="file"
                        name="profile"
                        id="upload_cover"
                        hidden=""
                        required=""
                      />
                      <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                        <label
                          htmlFor="upload_cover"
                          className="inline-flex items-center gap-1 cursor-pointer"
                        >
                          Cover
                          <svg
                            data-slot="icon"
                            className="w-6 h-5 text-blue-700"
                            fill="none"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            ></path>
                          </svg>
                        </label>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                    Upload Profile and Cover Image
                  </h2>
                  <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                    <div className="w-full  mb-4 mt-6">
                      <label htmlFor="" className="mb-2 dark:text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="w-full  mb-4 lg:mt-6">
                      <label htmlFor="" className=" dark:text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row  gap-2 justify-center w-full">
                    <div className="w-full">
                      <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                      <select className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                        <option disabled="" value="">
                          Select Sex
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                      <input
                        type="date"
                        className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                    <button type="submit" className="w-full p-4">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )
    }
      
      
    </>

  )
}

export default Profile