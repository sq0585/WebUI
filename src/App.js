import { useState } from 'react';
import './App.css';

function App() {
  const tierURL = "https://tiermaker.com/list/anime-and-manga/7ds-grand-cross-green-king-update-1071002/4174211"
  const discordWebhook = "https://discord.com/api/webhooks/1182351574660550656/lJs6c1w-DhB8dVZDItbw2nZ6FvfWg3PopYlLWVm3JK7VxzfdvSx98rVXc6LHw9CFd8hC"
  const hawk = "https://tiermaker.com/images/template_images/2022/1071002/7ds-grand-cross-green-king-update-1071002/zzzzz-1675871881nusestie-2jpg.png"
  
  const [username, setusername] = useState()
  const [Password, setPassword] = useState()
  const [unit0Cost, setUnit0Cost] = useState(10)
  const [unit1Cost, setUnit1Cost] = useState(10)
  const [unit2Cost, setUnit2Cost] = useState(10)
  const [unit3Cost, setUnit3Cost] = useState(10)
  const [TeamImage, setTeamImage] = useState()
  const [submit, setsubmit] = useState(null)
  function postWebhook() {
    var hook = new XMLHttpRequest();

    hook.open('POST', discordWebhook);

    hook.setRequestHeader('Content-type', 'multipart/form-data');

    var imgUploaded = document.getElementById("imgfile");
    var img = imgUploaded.src
    var file = new File([img], "image.png");
    console.log(file)
    // setTeamImage(file)
    // event.persist()


    var content = {
      username: 'Thorny',
      avatar_url: 'https://i.imgur.com/88dtJon.png',
      content: ``,
      allowed_mentions: {
        parse: ['users', 'roles'],
      },
      // embeds to be sent
      embeds: [
        {
          color: 11730954,
          title: `Tournament Submission for ${username}`,
          fields: [
            {
              name: 'Total Cost',
              value: unit0Cost+unit1Cost+unit2Cost+unit3Cost,
            },
            {
              name: 'Unit 1',
              value: unit0Cost,
              inline: true
            },
            {
              name: 'Unit 2',
              value: unit1Cost,
              inline: true
            },
            {
              name: 'Unit 3',
              value: unit2Cost,
              inline: true
            },
            {
              name: 'Unit 4',
              value: unit3Cost,
              inline: true
            },
          ],
          image: {
            url:
              hawk,
          },
        },
      ]
    }

    // const form = new FormData();
    // form.set("img", )
    // const payload = new FormData()
    // payload.set("content", "Hello there")
    // payload.set("username", content.username)
    // payload.set("avatar_url", content.avatar_url)
    // // payload.set("payload_json", JSON.stringify(content.embeds[0]))
    // payload.set("image1", JSON.stringify({url: hawk}))
    // payload.set("img", file)
    // payload.set("file", file, "img.png")
    // fetch(discordWebhook, {
    //   method: "POST",
    //   header: ('Content-type', 'multipart/form-data'),
    //   body: payload
    // })

    if (Password == "null123") {
      hook.send(JSON.stringify(content))
      setsubmit(true)
      setusername()
      setUnit0Cost(10)
      setUnit1Cost(10)
      setUnit2Cost(10)
      setUnit3Cost(10)
    } else {
      setsubmit(false)
    }
  }
  // imgInput.onchange = evt => {
  //   const [file] = imgInp.files
  //   if (file) {
  //     imgfile.src = URL.createObjectURL(file)
  //   }
  // }
  return (
    <div className="App" >
      {/* <img className="App-logo" alt="logo" src={hawk} /> */}
      <body className="App-body" style={{display:"flex", flexFlow:"row wrap"}}>
        <div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img id="imgfile" alt="" />
        </div>
        <table>
          <tr>
            <td><label style={{ fontSize: "medium" }} for="username">Discord Username:</label></td>
            <td><input type='text' id="username" name="username" value={username} onChange={(event)=>{setusername(event.target.value)}}/></td>
          </tr>
          <tr>
            <td><label style={{ fontSize: "medium" }} for="password">Tourney Password:</label></td>
            <td><input type='password' id="password" name="password" value={Password} onChange={(event)=>{setPassword(event.target.value)}}/></td>
          </tr>
          <tr>
            <td><label style={{ fontSize: "medium" }} for="Unit1">Unit 1:</label></td>
            <td><input type='number' min={"10"} step={"10"} id="Unit1" name="Unit1" value={unit0Cost} onChange={(event)=>{setUnit0Cost(Number(event.target.value))}}/></td>
          </tr>
          <tr>
            <td><label style={{ fontSize: "medium" }} for="Unit2">Unit 2:</label></td>
            <td><input type='number' min={"10"} step={"10"} id="Unit2" name="Unit2" value={unit1Cost} onChange={(event)=>{setUnit1Cost(Number(event.target.value))}}/></td>
          </tr>
          <tr>
            <td><label style={{ fontSize: "medium" }} for="Unit3">Unit 3:</label></td>
            <td><input type='number' min={"10"} step={"10"} id="Unit3" name="Unit3" value={unit2Cost} onChange={(event)=>{setUnit2Cost(Number(event.target.value))}}/></td>
          </tr>
          <tr>
            <td><label style={{ fontSize: "medium" }} for="Unit4">Unit 4:</label></td>
            <td><input type='number' min={"10"} step={"10"} id="Unit4" name="Unit4" value={unit3Cost} onChange={(event)=>{setUnit3Cost(Number(event.target.value))}}/></td>
          </tr>
          <tr>
            <td><label for="imgInput" style={{ fontSize: "medium" }}>Team Image:</label></td>
            <td><input id="imgInput" type='file' accept='image/*' onChange={(event) => {
              var imgfile = document.getElementById("imgfile")
              var img = URL.createObjectURL(event.target.files[0])
              imgfile.src = img
              imgfile.onload = function () {
                URL.revokeObjectURL(imgfile.src)
              }
            }} /></td>
          </tr>
        </table>
        <button onClick={postWebhook}> Click me</button>
        </div>
        <div>
          <img style={{maxHeight:"100vh"}} alt="" src='https://cdn.discordapp.com/attachments/895226507897741362/1262474495550296215/AOzVUa7LXNeHAAAAAElFTkSuQmCC.png?ex=669aaeff&is=66995d7f&hm=4d69374d0957cdb672c99acf1448ee99b0517fc052611a91c8583c04033ea542&'/>
        </div>
      </body>
      {/* <footer>
        <a>Credits to </a>
        <a href={tierURL}>
          {tierURL}
        </a>
      </footer> */}
    </div>
  );
}

export default App;
