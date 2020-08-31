import React from "react";
import {MDBIcon} from "mdbreact";

const jumbotronStyle = {
  backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)',
};

export const Header = () => (
  <div class="jumbotron card card-image" style={jumbotronStyle}>
  <div class="text-white text-center py-5 px-4">
    <div>
      <h2 class="card-title h1-responsive pt-3 mb-5 font-bold"><strong>Academic citation strings parser</strong></h2>
      <p class="mx-5 mb-5">This is a web application is based on "Using BibTex to Automatically Generate Labeled Data for Citation Field Extraction" AKBC 2020. Copy and paste your citation strings below and get tagging! 
      </p>
      <a class="btn btn-outline-white" href="https://github.com/zhiyangxu-umass/Online-Bibtext-Extraction-Tool"><MDBIcon fab icon="github" /> View project</a>
    </div>
  </div>
</div>
);
