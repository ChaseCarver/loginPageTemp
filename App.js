import './App.css';
import { useState } from "react";


function App() {
  //default is true because we want to display a create account page, once clicked login change to false and display a create account form
  const [createAccount, setCreateAccount] = useState(true);
    
  //isLogged in saved in local storage/cookies
  const [logins, setLogins] = useState([{username:"poopdeck@gmail.com", password:"1L0V3Y0U"}, {username:"dopesickhotcool@hotymail.cum", password:"K8icKzFliPzzz"}])
  const [formData, setFormData] = useState({username:"", password:""});
  const [userName, setUserName] = useState("test")
  //Login auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [logIn, setLogIn] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)
  const [allWrong, setAllWrong] = useState(false)
  //create auth
  const [isTaken, setIsTaken] = useState(false)
  const [usernameIsEmpty, setUsernameIsEmpty] = useState(false)
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false)
  const [passwordIsDifferent, setPasswordIsDifferent] = useState(false)
  const [isSucessful, setIsSucessful] = useState(false)
  //password auth
  const [needsLowercase, setNeedsLowercase] = useState(false)
  const [needsUppercase, setNeedsUppercase] = useState(false)
  const [needsNumber, setNeedsNumber] = useState(false)
  const [needsLength, setNeedsLength] = useState(false)

  
  
  //updates inputs when typing
  function handleChange(e){
    if(e.target.name == "username"){setFormData({...formData, username: e.target.value})}
    else{setFormData({...formData, password: e.target.value})}
  }
  
  //button click for create account
  function handleCreate(e){
    //prevent refresh when button is pushed
    e.preventDefault()
    //reset all of auth vars
    let isTakenTemp = false
    setIsTaken(false)
    setUsernameIsEmpty(false)
    setPasswordIsEmpty(false)
    setPasswordIsDifferent(false)
    //resets password requirement banners
    setNeedsLowercase(false)
    setNeedsUppercase(false)
    setNeedsNumber(false)
    setNeedsLength(false)

    //get inputs
    let username = document.getElementById("create-username")
    let password = document.getElementById("create-password")
    let confirmPassword = document.getElementById("create-confirm-password")

    //check list to see if username is taken
    logins.forEach((element) => {
        if(element.username == username.value){
          console.log("username taken!");
          isTakenTemp = !isTakenTemp}})

    //if username is taken or password is empty or passwords match, display error banner, else create new login
    if(isTakenTemp){setIsTaken(true)}

    //check if username taken, check if password is empty, check password strength, check if passwords match, if all true then push it to login list
      const lowercase = /[a-z]/g
      const uppercase = /[A-Z]/g
      const numbers = /[0-9]/g
      
      if(!isTakenTemp){
        if(username.value == ""){setUsernameIsEmpty(true)}
        else if(password.value == ""){setPasswordIsEmpty(true)}
        else if(!lowercase.test(password.value)){setNeedsLowercase(true)}
        else if(!uppercase.test(password.value)){setNeedsUppercase(true)}
        else if(!numbers.test(password.value)){setNeedsNumber(true)}
        else if(password.value.length < 8){setNeedsLength(true)}
        else if(password.value != confirmPassword.value){setPasswordIsDifferent(true)}
        //if form is filled out correctly, push info to login object, take user to login page, and display sucess banner
        else{
              setLogins([...logins, formData]);
              setCreateAccount(!createAccount)
              setIsSucessful(true)
              }
        }
  }
  //button click for log in
  function validateLogin(e){
    //prevent page from refreshing
    e.preventDefault()
    //reset vars used in foreach loop
    let logInTemp = false
    let wrongPassTemp = false
    //reset all banners
    setIsSucessful(false)
    setWrongPass(false)
    setAllWrong(false)
    setLogIn(false)
    setWrongPass(false)
    //get input elements
    let username = document.getElementById("login-username")
    let password = document.getElementById("login-password")
    
    logins.forEach((element) => {
        //check each username in login object
        if(element.username == username.value){
          //check if passowrd matches
          if(element.password == password.value){
            //store in temperary var while the rest of the loop finishes
            logInTemp = true
            //set header username var to inputed username
            setUserName(username.value)
          }else wrongPassTemp = true
        }
      }
    )
    //log in if info is correct
    if(logInTemp){setIsLoggedIn(true);setLogIn(true)}
    //display banner if wrong password
    else if(wrongPassTemp){setWrongPass(true)}
    //display banner if wrong username does not exist
    else {setAllWrong(true)}
  }
  return (
    <>
      <div className="background ">
      <div className="fixed top-0 flex justify-end items-center bg-slate-300 h-12 w-full">{isLoggedIn && <><p className="border border-color-red flex items-center">{userName}</p><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={() => {setIsLoggedIn(false); setCreateAccount(!createAccount); setLogIn(false)}}>Log out</button></>}</div>
      <div className="md:justify-around md:flex-row flex flex-col h-screen justify-center items-center">
      {createAccount && (<div className="md:w-3/12 flex flex-col create w-10/12 items-center h-2/5 justify-center">
        <h1 className="flex text-2xl font-bold justify-center">CREATE ACCOUNT</h1>
        <form className="md:w-10/12 flex flex-col items-center w-full">
          <label className="m-1 flex  flex-col w-full">Username
            <input id ="create-username" className="shadow shadow-stone-400 border border-slate-500 rounded"type="text" name="username" onChange={handleChange}></input>
          </label>
          <label className="m-1 w-full flex flex-col">Password
            <input id ="create-password" className="shadow shadow-stone-400 border border-slate-500 rounded" type="password" name="password" onChange={handleChange}></input>
          </label>
          <label className="m-1 flex flex-col w-full">Confirm password
            <input id ="create-confirm-password" className="border border-slate-500 rounded shadow shadow-stone-400" type="password"></input>
          </label>
          <button onClick={handleCreate} className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-full">Submit</button>
        </form>
        {isTaken &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Username taken!</p>)}
        {usernameIsEmpty &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Please enter a username!</p>)}
        {passwordIsEmpty &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Please enter a password!</p>)}
        {passwordIsDifferent &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Passwords do not match!</p>)}
        {needsLowercase &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Your password must incluse a lowercase letter!</p>)}
        {needsNumber &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Your password must incluse a number!</p>)}
        {needsUppercase &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Your password must incluse an uppercase letter!</p>)}
        {needsLength &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Your password must be at least 8 characters long!</p>)}
      </div>)}
      {createAccount ? (
      <div className="md:w-3/12 flex flex-col create w-10/12 items-center h-2/5 justify-center">
        <div className="md:w-10/12 flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold justify-center flex">Already a user?</h1>
          <button className="md:w-10/12 w-full my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={()=> {setCreateAccount(!createAccount)}}>Log in</button>
        </div>
      </div>
      ):(
        <div className="flex flex-col create w-10/12 items-center h-2/5 justify-center">
          <h1 className="flex text-2xl font-bold justify-center">LOG IN</h1>
            <form className="md:w-1/5 flex flex-col items-center w-full">
              <label className="m-1 flex  flex-col w-full">Username
                <input className="shadow shadow-stone-400 border border-slate-500 rounded" id ="login-username" type="text" name="username" onChange={handleChange}></input>
              </label>
                <br></br>
              <label className="m-1 flex  flex-col w-full">Password
                <input className="shadow shadow-stone-400 border border-slate-500 rounded" id ="login-password" type="password" name="password" onChange={handleChange}></input>
              </label>
              <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-full" onClick={validateLogin}>Submit</button>
            </form>
        {logIn && (<p className="bg-lime-300 font-semibold p-0.5 my-1 border-lime-500 border-l-4">Logged in!</p>)}
        {allWrong &&(<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4" >Username does not exist!</p>)}
        {wrongPass && (<p className="bg-amber-300 font-semibold p-0.5 my-1 border-amber-500 border-l-4">Password incorrect</p>)}
        {isSucessful && (<p className="bg-lime-300 font-semibold p-0.5 my-1 border-lime-500 border-l-4">Account Created! Please log in.</p>)}
        </div>
      )
      }</div>
      </div>
    </>
  );
}

export default App;