import React from "react";
import Footer from "./Footer";

export default function Page(props: { children: any }) {
  return (
    <div className='application'>
      <div className='container'>
        <div className="row justify-content-md-center">
          <div className='col-lg-6'>
            {props.children}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}