import {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { jwtDecode } from 'jwt-decode'
import moment from 'moment'

import useAxios from '../utils/useAxios'

import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import { IoCheckmarkDoneOutline } from "react-icons/io5";


function HomePage() {
  const [isLeftSidebarClosed, setIsLeftSidebarClosed] = useState(true)
  const [message, setMessage] = useState([])
  const [messages, setMessages] = useState([])

  const [newMessage, setNewMessage] = useState('')
  const [newSearch, setNewSearch] = useState({search: ''})

  const [users, setUsers] = useState([])
  const [profile, setProfile] = useState([])

  const baseURL = import.meta.env.VITE_API_URL

  const axios = useAxios()
  
  // console.log('newMessage => ', newMessage)

  // get token from the localStorage
  const token = localStorage.getItem('authTokens')
  const decodedToken = jwtDecode(token)

  const user_id = decodedToken.user_id
  const username = decodedToken.username

  // console.log(decodedToken)

  const useParamsObj= useParams() 
  // console.log(useParamsObj.id);

  const navigate = useNavigate()
  
  // console.log(user_id === useParamsObj.id);

  
  useEffect(() => {
    try {
      axios.get(`${baseURL}/auth-api/users/`).then((res) => {
        setUsers(res?.data)
        // console.log(res.data);
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  console.log(users);
  
  
  
  useEffect(() => {
    try {
      axios.get(`${baseURL}/chat-app/my-messages/${user_id}/`).then((res) => {
        setMessages(res?.data)
        // console.log(res.data);
      })
    } catch (error) {
      console.error(error)
    }
   
    
  }, [])
  console.log(messages)
  
  
  // get conversion (messages) with
  useEffect(() => {
    // let interval = setInterval(() => {
      // try {
      //   axios.get(`${baseURL}/chat-app/get-messages/${useParamsObj.id}/${user_id}/`).then((res) => {
      //     setMessage(res.data)
      //   })
      // } catch (error) {
      //   console.error(error)
      // }

      
    // }, 5000)

    // return () => clearInterval(interval)
  }, [])
  
  console.log(message);
  console.log(newMessage);
  


  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    // Object.assign(formData, {'message': newMessage, 'user': user_id, 'sender': user_id, 'reciever': useParamsObj.id, 'is_read': false})
    formData.append('user', user_id)
    formData.append('sender', user_id)
    formData.append('reciever', useParamsObj.id)
    formData.append('message', newMessage || 'Jay Hari')
    formData.append('is_read', false)
    
    try {
      axios.post(`${baseURL}/chat-app/send-message/`, formData).then(() => {
        // setMessage((prev) => [...prev, res.data])
        setNewMessage('')
      })
      // setMessage((prev) => [...prev, data])
    } catch (error) {
      console.error(error)
    }
    
  } 
  
  return (
   <>
      <div className="flex flex-col md:flex-row h-screen overflow-auto border">
        {/* Left Sidebar */}
        <aside
          className={`w-full mb-2 md:mb-0 rounded-sm transition-all duration-300 bg-blue-200  md:h-full ${
            isLeftSidebarClosed ? "md:w-16 h-[60px]" : "md:w-64 h-[300px]"
          } flex flex-col py-4 pl-2`}
          style={{scrollbarWidth: 'thin'}}
        >
          <button
            onClick={() => setIsLeftSidebarClosed(!isLeftSidebarClosed)}
            className="mb-4 mr-2 bg-blue-500 text-lg text-white rounded p-2"
          >
            {isLeftSidebarClosed ? <GoSidebarCollapse className={`rotate-90 lg:rotate-0`} /> : <GoSidebarExpand className={`rotate-90 lg:rotate-0`} />}
          </button>
          {!isLeftSidebarClosed && (
            <>

              <div className="w-full">
                <input
                  type="text"
                  className="my-2 p-1 mx-auto focus:outline outline-blue-500 rounded-lg"
                  placeholder="Search users..."
                />
              </div>
              <p className='text-left pl-2 text-green-700 font-medium'>All users, you can chat with them...</p>
              <nav className="overflow-y-auto">
                <ul className="py-2 flex flex-wrap md:flex-col justify-between px-2 md:px-0 gap-x-2 gap-y-4 md:gap-y-0">

                  {
                    users.length === 0 && <li className="mt-2 text-left pl-2">No users available, as of now...</li>
                  }

                  {users?.map((user) => {
                    return ( 
                      <Link 
                        to={`/detailed-messages/${user?.id}/`}
                        key={user?.id}
                        className="py-2 px-1 rounded-md hover:bg-green-300 my-1 flex items-center"
                      >
                        <img
                          src={`${baseURL}${user?.dp_image}`}
                          className="w-12 h-12 p-[2px] rounded-full object-cover border"
                          alt="Vanessa Tucker"
                        />
                        
                        <div className="flex-grow-1 ml-3 font-medium text-left">
                          {user?.user?.username} 
                          <div className="text-xs font-normal">
                            {user?.bio ? user?.bio?.slice(0,20) + '...' : "I'm using SmartChatBot..."}
                          </div>
                        <span className="inline-block text-right ml-auto w-max text-xs font-extralight">{moment.utc(user?.user?.last_login).local().startOf('seconds').fromNow()}</span>
                        </div>
                      </Link>
                    )
                  })}
                </ul>
              </nav>
            </>

          )}
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 h-full border border-slate-500 rounded-md px-2 shadow-md pt-2 overflow-hidden bg-blue-100">
        
          <div className="px-4 rounded-md shadow-md bg-white">
            <div className="flex items-center w-full py-1">
              <div className="relative">
                <img
                  src={baseURL + '/media/'+ decodedToken?.dp_image}
                  className="rounded-full border p-1 w-14  h-14 mr-1"
                  alt="Sharon Lessman"
                />
              </div>
              <div className="flex-grow pl-3 mr-auto">
                <strong>Sharon Lessman</strong>
                <div className="text-muted text-sm">
                  <span className="h-2 w-2  inline-block bg-green-500 rounded-full"></span> <em>Online</em>
                </div>
              </div>
    
              <div>
                <button className="mr-1 px-3 bg-blue-600 text-white rounded-lg py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-phone feather-lg text-xs"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
    
                <button className="mr-1 px-3 bg-cyan-500 text-white rounded-lg py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-video feather-lg text-sm"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                  </svg>
                </button>
    
                <button className="mx-1 px-3 border rounded-lg py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-more-horizontal feather-lg"
                  >
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={19} cy={12} r={1} />
                    <circle cx={5} cy={12} r={1} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
    
    
          <div className="relative mt-2 overflow-auto h-[75%]">
            <div className="p-4">
        
              {message?.map((message) => {
                return (
                  <>
                  {
                    user_id !== message.sender.id &&
                    <div key={message?.id} className={`pb-4 my max-w-[85%] flex gap-x-1`}>
                      <div className='w-max flex-shrink-0'>
                        <img
                          src={`${baseURL}${message?.sender_profile?.dp_image}`}
                          className="rounded-full w-12 h-12 mr-1"
                          alt="Chris Wood"
                        />
                      </div>
                      <div className="relative pb-8 flex flex-col flex-shrink text-left bg-blue-300 rounded-tl-none rounded-xl py-2 px-3 ml-2">
                        <div className="flex justify-between gap-x-4 font-bold mb-2">{message?.sender?.username} </div>
                        {message?.message}
                        <span className="absolute bottom-1 right-4 inline-flex items-center gap-x-2 text-muted text-nowrap font-extralight text-sm small mt-2">
                          {moment.utc(message.date).local().startOf('seconds').fromNow()}
                          <IoCheckmarkDoneOutline className={`${message?.is_read ? 'text-green-400' : ''}`} />
                        </span>
                      </div>
                    </div>
                  }

                  {
                    user_id === message.sender.id &&
                    <div key={message?.id} className={`pb-4 my-2 max-w-[80%] ml-auto flex flex-row-reverse gap-x-1`}>
                      <div className='w-max flex-shrink-0'>
                        <img
                          src={`${baseURL}${message?.sender_profile?.dp_image}`}
                          className="rounded-full w-12 h-12 mr-1"
                          alt="Chris Wood"
                        />
                      </div>
                      <div className="relative pb-8 flex flex-col flex-shrink text-left bg-purple-300 rounded-tr-none rounded-xl py-2 px-3 mr-3">
                        <div className="flex justify-between gap-x-4 font-bold mb-2">You</div>
                        {message?.message}
                        <span className="absolute bottom-1 right-4 inline-flex items-center gap-x-2 text-muted text-nowrap font-extralight text-sm small mt-2">
                          {moment.utc(message.date).local().startOf('seconds').fromNow()}
                          <IoCheckmarkDoneOutline />
                        </span>
                      </div>
                    </div>
                  }
                  </>
              )})}

            </div>
          </div>
    
          
          <div className="flex  py-3 px-4 border-top absolute left-0 right-0 bottom-0 bg-white">
            <div className="flex w-full">
              {/* <form onSubmit={handleSubmit}> */}
                <input
                  type="text"
                  className="p-2 border flex-grow w-full rounded-tr-none rounded-br-none focus:outline hover:outline-blue-500 outline-blue-600 rounded-md"
                  placeholder="Type your message"
                  value={newMessage?.message}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  type='submit'
                  onClick={handleSubmit}
                  className="bg-blue-700 outline-1 outline-blue-500 text-white active:shadow-sm active:shadow-blue-500 hover:bg-white rounded-tl-none rounded-bl-none hover:text-blue-600 border transition-all duration-200 border-blue-600 px-3 py-2 rounded-md"
                >Send</button>
              {/* </form> */}
            </div>
          </div>
              
        </main>


        {/* Right Sidebar */}
        <aside className="bg-teal-100 mt-2 md:w-64 p-4 md:hidden lg:block">
          <aside
            className={`w-full mb-2 md:mb-0 rounded-sm transition-all duration-300 bg-blue-200  md:h-full ${
              isLeftSidebarClosed ? "md:w-16 h-[60px]" : "md:w-64 h-[300px]"
            } flex flex-col py-4 pl-2`}
            style={{scrollbarWidth: 'thin'}}
          >
            <button
              onClick={() => setIsLeftSidebarClosed(!isLeftSidebarClosed)}
              className="mb-4 mr-2 bg-blue-500 text-lg text-white rounded p-2"
            >
              {isLeftSidebarClosed ? <GoSidebarCollapse className={`rotate-90 lg:rotate-0`} /> : <GoSidebarExpand className={`rotate-90 lg:rotate-0`} />}
            </button>
            {!isLeftSidebarClosed && (
              <>

                <div className="w-full">
                  <input
                    type="text"
                    className="my-2 p-1 mx-auto focus:outline outline-blue-500 rounded-lg"
                    placeholder="Search users..."
                  />
                </div>
                <p className='text-left pl-2 text-green-700 font-medium text-lg'>Recent messages...</p>
                <nav className="overflow-y-auto">
                  <ul className="py-2 flex flex-wrap md:flex-col justify-between px-2 md:px-0 gap-x-2 gap-y-4 md:gap-y-0">

                    {
                      messages.length === 0 && <li className="mt-2 text-left pl-2">No messages, as of now...</li>
                    }

                    {messages?.map((message) => {
                      return ( 
                        <Link 
                          to={`/detailed-messages/${message?.sender?.id === user_id ? message.reciever.id : message?.sender?.id}/`}
                          key={message?.id}
                          className="py-2 px-1 rounded-md hover:bg-green-300 my-1 flex items-center"
                        >
                          <img
                            src={`${baseURL}${message?.sender_profile?.dp_image}`}
                            className="w-12 h-12 p-[2px] rounded-full object-cover border"
                            alt="Vanessa Tucker"
                          />
                          
                          <div className="flex-grow-1 ml-3 font-medium text-left">
                            {message?.sender?.username} 
                            <div className="text-xs font-normal">
                              {message?.message.slice(0,20) + '...'}
                            </div>
                          <span className="inline-block text-right ml-auto w-max text-xs font-extralight">{moment.utc(message.date).local().startOf('seconds').fromNow()}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </ul>
                </nav>
              </>

            )}
          </aside>
        </aside>
      </div>

    </>
  )
}

export default HomePage