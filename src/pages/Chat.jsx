import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { allUserRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate=useNavigate();    
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentChat, setCurrentChat]=useState(undefined);
  // const [loading, setLoading] = useState(true);
  useEffect( ()=>{
    const fetchData=async()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }else{
        // setLoading(true);
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    fetchData();
  },[]);
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])
  useEffect(()=>{

    const fetchData = async()=>{
      // console.log("this is current user :" ,currentUser);

      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        else{
          navigate("/setAvatar");
        }
        // setLoading(false);
      }
    }
    fetchData();
  },[currentUser]);
  const handleChatChange = (chat)=>{
    setCurrentChat(chat)
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contacts>
        {currentChat===undefined ?(
          <Welcome currentUser={currentUser}/>
        ):(
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}></ChatContainer>
        )}
      </div>
    </Container>
    // <Container>
    //   {loading ? (
    //     <div>Loading...</div> // Render loading indicator while fetching data
    //   ) : (
    //     <div className="container">
    //       <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
    //     </div>
    //   )}
    // </Container>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

