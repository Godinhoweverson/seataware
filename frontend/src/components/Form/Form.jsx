
//Images
import formIllustration from "../../assets/form_illustration.png";

function Form({title, heading, form}) {   
    return (    
          <div className="container my-5 form-container">
            <div className="row justify-content-center form-subContainer">
              <div className="col-12 col-xl-10">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="row g-0">
                    <div className="col-12 col-lg-7 p-4 p-lg-5">
                      <span className="badge text-bg-success mb-3">
                        {title}
                      </span>

                      <h1 className="fw-bold mb-2">
                        {heading}
                      </h1>
                        {form}
                    </div>

                    <div className="col-12 col-lg-5 d-none d-lg-block">
                      <img
                        src={formIllustration}
                        alt="Report Issue Illustration"
                        className="img-fluid h-100 w-100 form-image"
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>    
    )
}

export default Form;