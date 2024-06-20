import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"
export default function Welcome({currentUser}) {
    // function name(){
    //     console.log(currentUser.name)
    // }

    if (!currentUser ) {
        // currentUser is undefined or null, return null or a loading message
        return <h1>Loading...</h1>;
      }
    //   console.log(currentUser);

  return (
    <Container>
        <img src = {Robot} alt ="robot"></img>
        <h1 > Welcome, <span>{currentUser.username}</span></h1>
        <h3>Please Select the chat to start messaging</h3>
    </Container>
    
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

// import React from 'react';
// import styled from 'styled-components';
// import Robot from "../assets/robot.gif";

// export default function Welcome({ currentUser }) {
//   if (!currentUser) {
//     // currentUser is undefined or null, return a loading message
//     return <h1>Loading...</h1>;
//   }

//   // For debugging purposes, let's log currentUser
//   console.log(currentUser);

//   return (
//     <Container>
//       <img src={Robot} alt="robot" />
//       <h1>Welcome, <span>{currentUser.username}</span></h1>
//       <h3>Please select a chat to start messaging</h3>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;
