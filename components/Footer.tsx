const Footer = () => {
  return (
    <div className="block md:flex justify-between items-center p-5 text-[#DAD7CD] bg-[#344E41]">
      <div className="block md:flex container">
        <h5 className="mr-3">&copy; {new Date().getFullYear()} ROJA </h5>
        <h5>All Rights Reserved </h5>
      </div>
      <div className="block md:flex">
        <h5 className="mr-3">Privacy Policy</h5>
        <h5>Terms Of Service</h5>
      </div>
    </div>
  );
};

export default Footer;
