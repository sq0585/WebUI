import { useState } from 'react';
import './App.css';

function App() {
  const invite = "https://discord.gg/Jp9hkMHSgz"
  const discordWebhook = process.env.REACT_APP_DISCORDWEBHOOK

  const [username, setusername] = useState('')
  const [Password, setPassword] = useState('')
  const [unit0Cost, setUnit0Cost] = useState(10)
  const [unit1Cost, setUnit1Cost] = useState(10)
  const [unit2Cost, setUnit2Cost] = useState(10)
  const [unit3Cost, setUnit3Cost] = useState(10)
  const [TeamImage, setTeamImage] = useState(null)

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  function postWebhook() {
    if (TeamImage) {
      // console.log(TeamImage)
      var fileImg = dataURLtoFile(TeamImage, "imagee.png")

      const payload = new FormData()
      payload.set("payload_json", JSON.stringify({
        username: 'Nom',
        avatar_url: 'https://i.imgur.com/88dtJon.png',
        content: ``,
        allowed_mentions: {
          parse: ['users', 'roles'],
        },
        embeds: [
          {
            color: 11730954,
            title: `Tournament Submission for ${username}`,
            fields: [
              {
                name: 'Total Cost',
                value: unit0Cost + unit1Cost + unit2Cost + unit3Cost,
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
                "attachment://img.png",
            },
          }
        ]
      }))
      payload.set("file", fileImg, "img.png")

      if (Password == process.env.REACT_APP_PASSWORD) {
        if (username === '') {
          alert("Please provide your username on Discord")
        } else {
          fetch(discordWebhook, {
            method: "POST",
            header: ('Content-type', 'multipart/form-data'),
            body: payload
          })
          setusername('')
          setUnit0Cost(10)
          setUnit1Cost(10)
          setUnit2Cost(10)
          setUnit3Cost(10)
          alert("Team Submitted.")
        }
      } else {
        alert("Please provide the correct password")
      }
    } else {
      alert("Please provide the Team image")
    }
  }
  return (
    <div className="App" >
      <div className="App-body" style={{ display: "flex", flexFlow: "row wrap" }}>
        <div style={{ padding: "32px 0 32px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img id="imgfile" alt="" style={{ objectFit: "cover", maxHeight: "60vh", maxWidth: "100vw" }} />
          </div>
          <table>
            <tbody>

              <tr>
                <td><label style={{ fontSize: "medium" }} htmlFor="username">Discord Username:</label></td>
                <td><input type='text' id="username" name="username" value={username} onChange={(event) => { setusername(event.target.value) }} /></td>
              </tr>
              <tr>
                <td><label style={{ fontSize: "medium" }} htmlFor="password">Tourney Password:</label></td>
                <td><input type='password' id="password" name="password" value={Password} onChange={(event) => { setPassword(event.target.value) }} /></td>
              </tr>
              <tr>
                <td><label style={{ fontSize: "medium" }} htmlFor="Unit1">Unit 1:</label></td>
                <td><input type='number' min={"10"} step={"10"} id="Unit1" name="Unit1" value={unit0Cost} onChange={(event) => { setUnit0Cost(Number(event.target.value)) }} /></td>
              </tr>
              <tr>
                <td><label style={{ fontSize: "medium" }} htmlFor="Unit2">Unit 2:</label></td>
                <td><input type='number' min={"10"} step={"10"} id="Unit2" name="Unit2" value={unit1Cost} onChange={(event) => { setUnit1Cost(Number(event.target.value)) }} /></td>
              </tr>
              <tr>
                <td><label style={{ fontSize: "medium" }} htmlFor="Unit3">Unit 3:</label></td>
                <td><input type='number' min={"10"} step={"10"} id="Unit3" name="Unit3" value={unit2Cost} onChange={(event) => { setUnit2Cost(Number(event.target.value)) }} /></td>
              </tr>
              <tr>
                <td><label style={{ fontSize: "medium" }} htmlFor="Unit4">Unit 4:</label></td>
                <td><input type='number' min={"10"} step={"10"} id="Unit4" name="Unit4" value={unit3Cost} onChange={(event) => { setUnit3Cost(Number(event.target.value)) }} /></td>
              </tr>
              <tr>
                <td><label htmlFor="imgInput" style={{ fontSize: "medium" }}>Team Image:</label></td>
                <td><input id="imgInput" type='file' accept='image/*' onChange={(event) => {
                  if (event.target.files[0]) {
                    var img = URL.createObjectURL(event.target.files[0])
                    toBase64(event.target.files[0]).then(data => setTeamImage(data))
                    var imgfile = document.getElementById("imgfile")
                    imgfile.src = img
                    imgfile.onload = function () {
                      URL.revokeObjectURL(imgfile.src)
                    }
                  }
                }} /></td>
              </tr>
            </tbody>
          </table>
          <button onClick={postWebhook}>Submit</button>
        </div>
        <div>
          <img style={{ maxHeight: "100vh" }} alt="" src={process.env.REACT_APP_POINTSYSTEM} />
        </div>
      </div>
      <footer style={{ backgroundColor: "#23272A" }}>
        <a style={{ color: "white" }}>Credits to </a>
        <a href={invite}>
          Jacob
        </a>
      </footer>
    </div>
  );
}

export default App;
