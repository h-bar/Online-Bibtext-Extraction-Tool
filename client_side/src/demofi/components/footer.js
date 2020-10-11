import React from "react";
import { MDBIcon} from "mdbreact";

export const Footer = () => (

<footer class="page-footer font-small blue pt-4">

<div class="container-fluid text-center text-md-left">

<h2 class="card-title h2-responsive pt-3 mb-4 text-center"><strong> <MDBIcon icon="atom" /> Neural Model</strong></h2>
  <div class="text-center">
    <p class="text-center">This academic citation parser uses RoBERTa-based NER model introduced in “Using BIBTEX to Automatically Generate Labeled Data for Citation Field Extraction”. This model is trained on 5 million citation strings in various domains and formats. It achieves state of art performance on UMass CFE dataset and domain specific dataset. In comparison to previous SoTA, it achieves a 24.48% relative error reduction, achieving span level F1-scores of 96.3%.</p>
  </div>


<h2 class="card-title h2-responsive pt-3 mb-4 text-center"><strong><MDBIcon icon="book-open" /> Format</strong></h2>
  <div class="row">

    
              <div class="col-md-4 mt-md-0 mt-3">


                <h5 class="text-uppercase font-weight-bold text-center">bibtex</h5>
                <p>The word "BibTeX" stands for a tool and a file format which are used to describe and process lists of references, mostly in conjunction with LaTeX documents. A BibTeX entry consists of the type (the word after @), a citation-key and a number of tags which define various characteristics of the specific BibTeX entry. Among those tags can be for example: author, title, year, etc. Some tags are mandatory for certain types of BibTeX entries, some are optional.
                  There is a set of standard-tags existing, which can be interpreted by BibTeX or third-party tools. Those which are unknown are ignored by BibTeX, thus can be used to store additional information without interfering with the final outcome of a document.</p>
              </div>


              <hr class="clearfix w-100 d-md-none pb-3"/>

              <div class="col-md-4 mb-md-0 mb-3">


                <h5 class="text-uppercase font-weight-bold text-center">RIS</h5>
                <p>RIS is a standardized tag format developed by Research Information Systems, Incorporated (the format name refers to the company) to enable citation programs to exchange data.
                The RIS file format-two letters, two spaces and a hyphen—is a tagged format for expressing bibliographic citations. According to the specifications, the lines must end with the ASCII carriage return and line feed characters. Note that this is the convention on Microsoft Windows, while in other contemporary operating systems, particularly Unix, the end of line is typically marked by line feed only.
                Multiple citation records can be present in a single RIS file. A record ends with an "end record" tag ER - with no additional blank lines between records.
                </p>

              </div>
        
              <hr class="clearfix w-100 d-md-none pb-3"/>
        <div class="col-md-4 mb-md-0 mb-3">
          <h5 class="text-uppercase font-weight-bold text-center">json</h5>
          <p>JavaScript Object Notation is an open standard file format, and data interchange format, that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and array data types. In the downloaded JSON file, the labels and tokens are stored in a python dictionary.</p>
        </div>


  </div>


  <h2 class="card-title h2-responsive pt-3 mb-4 text-center"><strong><MDBIcon far icon="clone" /> Example</strong></h2>
  <div class="row">

    
              <div class="col-md-6 mt-md-0 mt-3 px-4">


                <h5 class="text-uppercase font-weight-bold text-center">bibtex</h5>
                {/* <pre style={{backgroundColor: "rgba(15, 122, 207)",}}> */}
                <p class="px-4 py-3" style={{color:"white", backgroundColor: "rgba(15, 122, 207)"}}>{"@misc{key0,"}<br/>
                    {"author = {Dung Thai and Sree Harsha Ramesh and Shikhar Murty and Luke Vilnis and Andrew McCallum},"}<br/>
                    {"title = {Embedded-state latent conditional random fields for sequence labeling},"}<br/>
                    {"booktitle = {In Computational Natural Language Learning},"}<br/>
                    {"year = {2018},"}<br/>
                    {"}"}
                </p>
                {/* </pre> */}
              </div>


              <hr class="clearfix w-100 d-md-none pb-3"/>

              <div class="col-md-6 mb-md-0 mb-3 px-4">


                <h5 class="text-uppercase font-weight-bold text-center">RIS</h5>
                {/* <pre style={{backgroundColor: "rgba(15, 122, 207)",}}> */}
                <p class="px-4 py-3" style={{color:"white",backgroundColor: "rgba(15, 122, 207)"}}>{"TY  - JOUR"}<br/>
                    {"AU  - Dung Thai and Sree Harsha Ramesh and Shikhar Murty and Luke Vilnis and Andrew McCallum"}<br/>
                    {"TI  - Embedded-state latent conditional random fields for sequence labeling"}<br/>
                    {"T1  - In Computational Natural Language Learning"}<br/>
                    {"PY  - 2018"}<br/>
                    {"ER  - "}<br/>
                </p>
                {/* </pre> */}
              </div>
        


  </div>







</div>

<div class="footer-copyright text-center py-3"><MDBIcon icon="hammer" /> Powered By:
  <a href="http://www.iesl.cs.umass.edu/"> UMass IESL</a>
</div>


</footer>




);
