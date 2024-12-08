import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mt-24 mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#344E41]">
          About Ro-ja
        </h1>
      </div>

      <section className="mb-8">
        <p className="text-lg mb-4 text-center">
          Welcome to Ro-ja, your ultimate partner in connecting landlords and
          tenants seamlessly through the power of technology! Ro-ja was created
          to revolutionize the property rental experience by simplifying the
          entire process, from listing to lease signing. We believe finding or
          renting a property should be easy, secure, and tailored to meet the
          needs of modern landlords and tenants alike.
        </p>
        <p className="text-lg mb-4 text-center">
          Gone are the days when individuals were forced to pay unscrupulous
          agents exorbitant fees, only to be deceived, disappointed by the
          listings provided, and ultimately waste valuable resources visiting
          those properties. Ro-ja offers the ultimate solution to all these
          problems!
        </p>
      </section>

      <div className="flex justify-center my-4">
        <Image
          src="/img/roja-about.png"
          alt="About Ro-ja"
          width={500}
          height={500}
        />
      </div>

      <section className="mb-8">
        <div className="flex justify-center my-4 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-[#344E41]">
            Our Key Competencies
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 [&>*:last-child:nth-child(odd)]:md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-8 w-8 text-[#344E41]" />
                Effortless Property Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Ro-ja makes it easy for landlords to showcase their properties
                with detailed descriptions, high-quality images, and interactive
                features that attract the right tenants. Our platform enables
                landlords to create listings that truly stand out, capturing the
                essence and unique qualities of each property.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-8 w-8 text-[#344E41]" />
                Comprehensive Tenant Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Security is at the heart of Ro-ja. We offer a robust tenant
                verification process to ensure a safe rental experience for
                landlords. Background checks, payment histories, and
                identification validation are seamlessly integrated to provide
                peace of mind and build trust between parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-8 w-8 text-[#344E41]" />
                Smart Property Matchmaking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Ro-ja uses advanced algorithms and machine learning technology
                to match tenants with the most suitable properties based on
                preferences and requirements. Our system goes beyond basic
                filters to offer personalized recommendations, ensuring that
                tenants find a place they can truly call home, while landlords
                receive tenant leads that fit their criteria.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-8 w-8 text-[#344E41]" />
                Streamlined Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Say goodbye to paperwork and back-and-forth emails! Ro-ja
                facilitates direct communication between landlords and tenants
                and provides a secure, digital environment for document
                exchange. From rental agreements to payment receipts, all
                essential documents are organized and accessible in one place.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-8 w-8 text-[#344E41]" />
                Data-Driven Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With Ro-ja, landlords can gain valuable insights into market
                trends, rental prices, and tenant preferences. Our data-driven
                tools empower landlords to make informed decisions about
                pricing, marketing, and property management, helping maximize
                their property's potential.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <p className="text-lg mb-4 text-center font-bold text-[#344E41]">
          Whether you're a landlord seeking dependable tenants or a tenant
          looking for the perfect rental, Ro-ja is designed to make the journey
          smooth, secure, and enjoyable. Join us today, and discover a smarter
          way to rent!
        </p>
      </section>
    </div>
  );
}
