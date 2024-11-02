import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#344E41] text-[#DAD7CD] p-4 md:p-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0">
          <h5 className="md:mr-3">&copy; {new Date().getFullYear()} RO-JA</h5>
          <h5>All Rights Reserved</h5>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
          <h5 className="md:mr-3">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </h5>
          <h5>
            <Link href="/terms-of-service">Terms Of Service</Link>
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
