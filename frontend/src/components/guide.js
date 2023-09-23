import React from 'react'

export default function Guide({heading, src, text}) {
  return (
    <section className="slideIn guide">
    <div className="guideContent">
      <img className="guideImage" src={src} alt="" />
      <div className="guideText">
        <h1 className="heading">{heading}</h1>
        <p>{text}</p>
        <hr className="heading" style={{ backgroundColor:"red", color:"red"}}></hr>
      </div>
    </div>
  </section>
  )
}
