import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import LandingPage from "./LandingPage"
import useAxios from "../utils/useAxios"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"


// const apiURL = import.meta.env.VITE_API_URL 

function Home() {
  const {user} = useContext(AuthContext)
  const [isLeftSidebarClosed, setIsLeftSidebarClosed] = useState(true)

  const baseURL = import.meta.env.VITE_API_URL

  const [messages, setMessages] = useState([])
  const [newSearch, setNewSearch ] = useState({search: '', })
  
  
  // get token from localStorage and decode it.
  const token = localStorage.getItem('authTokens')
  const decodedToken = jwtDecode(token)

  // authenticated user data from decodedToken
  const user_id = decodedToken.user_id
  const username = decodedToken.username
  
  
  // use the useAxios Fn to get, update and post data to backend
  const axios = useAxios()
  
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios.get(`${baseURL}/chat-app/my-messages/${user_id}/`).then((res) => {
        setMessages(res?.data)
        console.log(res.data);
        
      })
    } catch (error) {
      console.error(error)
    }
   
    
  }, [])
  console.log(messages)
  
  
  return !user ? <LandingPage /> : (
    <>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <aside
          className={`rounded-sm transition-all duration-300 bg-blue-200  h-full ${
            isLeftSidebarClosed ? "w-16 " : "w-64"
          } flex flex-col py-4 pl-2`}
          style={{scrollbarWidth: 'thin'}}
        >
          <button
            onClick={() => setIsLeftSidebarClosed(!isLeftSidebarClosed)}
            className="mb-4 mr-2 bg-blue-500 text-white rounded p-2"
          >
            {isLeftSidebarClosed ? ">>>" : "<<<"}
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
              <nav className="overflow-y-auto">
                <ul className="py-2">

                  {messages?.map((message) => {
                    return ( 
                      <a
                        href="#"
                        key={message?.id}
                        className="py-2 px-1 rounded-md hover:bg-purple-200 my-1 flex items-center"
                      >
                          <img
                            src={`${baseURL}${message?.sender_profile?.dp_image}`}
                            className="w-12 h-12 p-[2px] rounded-full object-cover border"
                            alt="Vanessa Tucker"
                          />
                          <div className="flex-grow-1 ml-3">
                            {message?.sender?.username}
                            <div className="text-xs">
                              <span className="h-2 w-2  inline-block bg-green-500 rounded-full"></span>  Online
                            </div>
                          </div>
                      </a>
                    )
                  }
                    
                  )}
                  

                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="badge bg-success float-right">2</div>
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        className="rounded-circle mr-1"
                        alt="William Harris"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        William Harris
                        <div className="small">
                          <span className="fas fa-circle chat-online" /> Online
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Sharon Lessman
                        <div className="small">
                          <span className="fas fa-circle chat-online" /> Online
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                        className="rounded-circle mr-1"
                        alt="Christina Mason"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Christina Mason
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar5.png"
                        className="rounded-circle mr-1"
                        alt="Fiona Green"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Fiona Green
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        className="rounded-circle mr-1"
                        alt="Doris Wilder"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Doris Wilder
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                        className="rounded-circle mr-1"
                        alt="Haley Kennedy"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Haley Kennedy
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Jennifer Chang"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Jennifer Chang
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar5.png"
                        className="rounded-circle mr-1"
                        alt="Fiona Green"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Fiona Green
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        className="rounded-circle mr-1"
                        alt="Doris Wilder"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Doris Wilder
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                        className="rounded-circle mr-1"
                        alt="Haley Kennedy"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Haley Kennedy
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Jennifer Chang"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        Jennifer Chang
                        <div className="small">
                          <span className="fas fa-circle chat-offline" /> Offline
                        </div>
                      </div>
                    </div>
                  </a>
                </ul>
              </nav>
            </>

          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full border border-slate-500 rounded-md px-2 shadow-md pt-2 overflow-hidden bg-gray-100">

          <div className="py-2 px-4 shadow-md bg-white">
            <div className="flex items-center w-full py-1">
              <div className="relative">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                  className="rounded-full w-14  h-14 mr-1"
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


          <div className="relative overflow-auto h-[80%]">
            <div className="chat-messages p-4">
              <div className="chat-message-right pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:33 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                  prodesset te vix.
                </div>
              </div>
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:34 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">Sharon Lessman</div>
                  Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                  erat animal commodo.
                </div>
              </div>
              <div className="chat-message-right mb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:35 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">You</div>
                  Cum ea graeci tractatos.
                </div>
              </div>
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:36 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">Sharon Lessman</div>
                  Sed pulvinar, massa vitae interdum pulvinar, risus lectus
                  porttitor magna, vitae commodo lectus mauris et velit. Proin
                  ultricies placerat imperdiet. Morbi varius quam ac venenatis
                  tempus.
                </div>
              </div>
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:37 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">Sharon Lessman</div>
                  Cras pulvinar, sapien id vehicula aliquet, diam velit
                  elementum orci.
                </div>
              </div>
              <div className="chat-message-right mb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:38 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                  prodesset te vix.
                </div>
              </div>
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:39 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">Sharon Lessman</div>
                  Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                  erat animal commodo.
                </div>
              </div>
              <div className="chat-message-right mb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:40 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">You</div>
                  Cum ea graeci tractatos.
                </div>
              </div>
              <div className="chat-message-right mb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:41 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">You</div>
                  Morbi finibus, lorem id placerat ullamcorper, nunc enim
                  ultrices massa, id dignissim metus urna eget purus.
                </div>
              </div>
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:42 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">Sharon Lessman</div>
                  Sed pulvinar, massa vitae interdum pulvinar, risus lectus
                  porttitor magna, vitae commodo lectus mauris et velit. Proin
                  ultricies placerat imperdiet. Morbi varius quam ac venenatis
                  tempus.
                </div>
              </div>
              <div className="chat-message-right mb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:43 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                  prodesset te vix.
                </div>
              </div>
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    2:44 am
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">Sharon Lessman</div>
                  Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                  erat animal commodo.
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex  py-3 px-4 border-top sticky bottom-0 bg-white">
            <div className="input-group  flex-grow">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message"
              />
              <button className="">Send</button>
            </div>
          </div>
          
        </main>

        {/* Right Sidebar */}
        <aside className="bg-gray-200 w-64 p-4 hidden lg:block">
          <h2 className="font-bold">Right Sidebar</h2>
          <p>Additional content goes here.</p>
        </aside>
      </div>

    </>


  )
}

export default Home