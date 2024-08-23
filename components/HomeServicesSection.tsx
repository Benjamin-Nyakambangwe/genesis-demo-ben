import ServiceCard from "./ServiceCard";

const HomeServicesSection = () => {
  const servicesData = [
    {
      title: "List a Property",
      description:
        "Find your place with an immersive photo experience and the most listings, including things you wont find anywhere else",
      action: "Browse Properties For Sale",
      img: "/assets/buy_property_icon.png",
    },
    {
      title: "Rent a Property",
      description:
        "Find your place with an immersive photo experience and the most listings, including things you wont find anywhere else",
      action: "See Your Options",
      img: "/assets/sell_property_icon.png",
    },
    {
      title: "Rent a Property",
      description:
        "Find your place with an immersive photo experience and the most listings, including things you wont find anywhere else",
      action: "Find Rentals",
      img: "/assets/rent_property_icon.png",
    },
  ];
  return (
    <div className="block md:flex justify-between container mx-auto mt-10 pb-8">
      <ServiceCard data={servicesData[0]} />
      <ServiceCard data={servicesData[1]} />
      <ServiceCard data={servicesData[2]} />
    </div>
  );
};

export default HomeServicesSection;
