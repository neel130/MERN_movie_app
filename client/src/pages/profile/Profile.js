import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { userContext } from '../../App'

const Profile = () => {
    const { state, dispatch } = useContext(userContext);
    const [update, setUpdate] = useState(false);
    const [name, setName] = useState(state?.name);

     const updateProfile = async()=>{
       const res = await fetch('/user/update/'+state?._id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name
        })
       })
       const data = await res.json();
       console.log(data)
       if(data.success){
        localStorage.setItem("user",JSON.stringify(data.user));
        dispatch({type:"UPDATE_USER",payload:data.user})
        setUpdate(false)
       }
     }
     console.log(state)

    return (
        <>
            <div style={{ margin: "100px" }} className="container">
                <div className="left-arrow">
               <Link to={'/'}> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></Link>
                </div>
                <div
                    onClick={() => setUpdate(true)}
                    style={{ marginLeft: "300px" }} className="edit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </div>
                <h1> {!update ? <> {state?.name} </> : <input value={name} onChange={(e) => setName(e.target.value)} type="text" />}</h1>
                <h3>{state?.email}</h3>
                {update ? <button onClick={updateProfile} className='btn btn-primary' >Update Profile</button> : null}
            </div>

        </>
    )
}

export default Profile