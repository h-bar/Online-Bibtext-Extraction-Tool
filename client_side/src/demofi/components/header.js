import React from "react";
import {MDBIcon} from "mdbreact";

const jumbotronStyle = {
  backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)',
};

export const Header = () => (
  //<div class="jumbotron card card-image" style={jumbotronStyle}>
  <div class="text-black text-center py-3 px-2">
    <div>
      <h4 class="card-title h1-responsive pt-2 mb-3 font-bold"><strong>Citation strings parser</strong></h4>
      <p class="mx-3 mb-3">This is a web application is based on "Using BibTex to Automatically Generate Labeled Data for Citation Field Extraction" AKBC 2020. Copy and paste your citation strings below and get tagging! 
      </p>
      {/* <a class="btn btn-outline-blue" href="https://github.com/zhiyangxu-umass/Online-Bibtext-Extraction-Tool"><MDBIcon fab icon="github" /> View project</a> */}
    </div>
  </div>
//</div>
);
