import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button'

const Website = () => {
    const navigate=useNavigate();
  return (
    <>
      <div className="linkedinbox">
      <h4>
          Enter your recipient's website
          <span onClick={()=>{navigate("/Profile/newmail/Personalization")}}> switch to LinkedIn</span>
        </h4>
        <div className="inputrow">
          <div className="inputbox">
            <span>https://</span>
            <input type="text" placeholder="website URL" />
          </div>
          <Button
            content="Create Email"
            height="6rem"
            width="12rem"
            color="#fff"
            background="#0cccbc"
          />
        </div>
        <h4>
          Have many customers?
          <span onClick={()=>{navigate("/Profile/newmail/Personalization/csv")}}> upload a CSV file</span>
        </h4>
      </div>
    </>
  )
}

export default Website