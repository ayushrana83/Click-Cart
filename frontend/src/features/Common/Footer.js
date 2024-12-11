function Footer() {
    return (
      <>
        <div className=" bg-gray-100">
          <div className="max-w-2xl mx-auto text-gray-700 py-8">
            <div className="text-center">
              <h3 className="text-3xl mb-3 text-gray-700"> Download our Ecommerce App </h3>
              <p className="text-gray-700"> Buy what you want. </p>
              <div className="flex justify-center my-8">
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                    className="w-7 md:w-8"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-800">Download on </p>
                    <p className="text-sm md:text-base text-gray-700"> Google Play Store </p>
                  </div>
                </div>
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                    className="w-7 md:w-8"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-800">Download on </p>
                    <p className="text-sm md:text-base text-gray-700"> Apple Store </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-600">
              <p className="order-2 md:order-1 mt-8 md:mt-0">
                {' '}
                © e-commerce, 2023.{' '}
              </p>
              <div className="order-1 md:order-2">
                <span className="px-2">About us</span>
                <span className="px-2 border-l">Contact us</span>
                <span className="px-2 border-l">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default Footer;