import React from "react";
import { MDBIcon} from "mdbreact";

export const NavBar = () => (
    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //     <a class="navbar-brand" href="http://www.iesl.cs.umass.edu/">UMass IESL</a>
    //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //       <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarNavDropdown">
    //       <ul class="navbar-nav">
    //         <li class="nav-item active">
    //           <a class="nav-link" href="https://github.com/iesl/bibtex-fields-extraction">Github repo<span class="sr-only">(current)</span></a>
    //         </li>
    //         <li class="nav-item">
    //           <a class="nav-link" href="https://openreview.net/pdf?id=OnUd3hf3o3">Paper</a>
    //         </li>
    //         <li class="nav-item dropdown">
    //           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //             People
    //           </a>
    //           <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    //             <a class="dropdown-item" href="https://people.cs.umass.edu/~dthai/">Dung Thai</a>
    //             <a class="dropdown-item" href="#">Zhiyang Xu</a>
    //             <a class="dropdown-item" href="https://people.cs.umass.edu/~nmonath/">Nicholas Monath</a>
    //             <a class="dropdown-item" href="http://borisv.lk.net/">Boris Veytsman</a>
    //             <a class="dropdown-item" href="https://people.cs.umass.edu/~mccallum/">Andrew McCallum</a>
    //           </div>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    
    <ul class="nav navbar-light bg-light nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="http://www.iesl.cs.umass.edu/">UMass IESL</a>
      </li>
  {/* <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </div>
  </li> */}
    <li class="nav-item">
      <a class="nav-link" href="https://github.com/iesl/bibtex-fields-extraction"><MDBIcon fab icon="github" /> GitHub</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="https://openreview.net/pdf?id=OnUd3hf3o3"><MDBIcon icon="book" /> Paper</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#"><MDBIcon icon="rocket" /> Model</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#"><MDBIcon icon="database" /> BibTex Dataset</a>
    </li>
  {/* <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li> */}
</ul>
);