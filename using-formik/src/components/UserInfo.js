import React from 'react';


const UserInfo = props => {

    return (
        <div className="userInformation">
            <h1>Our Users: </h1>
            {props.users.map(user => {
                return (
                    <div>
                        <h2>{user.userName}</h2>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                    </div>
                )
            })}
            
        </div>
    )
}

export default UserInfo;