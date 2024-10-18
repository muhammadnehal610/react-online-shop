import { useNavigate } from "react-router-dom";
import { Button } from "antd"; // Using Ant Design for the button

function ThankYouPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-7 col-md-8 col-sm-10">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-5">
                <h1 className="text-center mb-4 text-3xl">Thank You!</h1>
                <p className="text-center mb-5 texl-xl">
                  Your purchase has been successfully completed.
                </p>

                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4311/4311308.png"
                    alt="Thank You"
                    className="img-fluid"
                    style={{ width: "150px" }}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <Button type="primary" size="large" onClick={handleGoHome}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThankYouPage;
