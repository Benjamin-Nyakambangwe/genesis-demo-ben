import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RO-JA Properties",
  description: "Read our terms and conditions for using RO-JA Properties platform.",
  openGraph: {
    title: "Terms of Service | RO-JA Properties",
    description: "Our platform's terms and conditions of use.",
    url: "https://roja.co.zw/terms-of-service",
    siteName: "RO-JA Properties",
  },
};

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#344E41] mb-6">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          {/* Introduction Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Introduction</h2>
            <div className="pl-4 space-y-4">
              <p>1.1 Welcome to Ro-ja (hereafter referred to as "the Platform"). By accessing or using the Platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using the Platform.</p>
              <p>1.2 The Platform is provided by Ro-ja (referred to as "we," "us," or "our"), based in Harare, Zimbabwe. Our company operates in compliance with Zimbabwean law, including the Cyber and Data Protection Act.</p>
              <p>1.3 These Terms apply to all users, including landlords, tenants, investors, and other third parties who interact with the Platform.</p>
            </div>
          </section>

          {/* Privacy Regulations Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Privacy Regulations</h2>
            <div className="pl-4 space-y-4">
              <p>2.1 We are committed to protecting your privacy in accordance with the Cyber and Data Protection Act [Chapter 12:07] of Zimbabwe. By using the Platform, you consent to the processing, storage, and use of your personal data as described in our Privacy Policy.</p>
              <p>2.2 We collect and process your data for the purpose of facilitating transactions, verifying parties, and improving our services. Data collected includes but is not limited to name, contact information, financial details, and property history. </p>
              <p>2.3 We may request your consent to send you marketing or promotional messages electronically. This consent must be explicitly granted before we send such communications. Additionally, we may use your information to compile statistical reports for internal business use. Any data or profiles we create will remain anonymous and will not be linked to you personally by any third party. </p>
              <p>2.4 All communications from us, including emails or notifications, will include a clear option to withdraw your consent or unsubscribe. You can easily reverse your permission by following the provided link in each communication. </p>
              <p>2.5 We will only use the personal or organizational information you submit through email, telephone, or forms on the Platform to respond to specific requests or inquiries you’ve made. We will not share this information with any third party, except in cases outlined in clauses 2.3 and 2.4, or where legally required to do so. </p>
              <p>2.6 If we provide services to you through third-party partners, your information may be shared with those parties to facilitate service delivery. By using the Platform, you consent to the necessary sharing of your information with trusted third parties authorized by us to offer such services. These third parties will only process your information for our service purposes and will not use it for any commercial reasons without your explicit consent. Furthermore, we will ensure that any third party handling your data complies with the applicable Cyber and Data Protection Act of Zimbabwe or equivalent data protection measures. </p>
              <p>2.7 Under the Cyber and Data Protection Act, Ro-ja is required to ensure that all personal data is processed lawfully, fairly, and transparently. </p>
              <p>2.8 Users' data will not be retained longer than necessary, in accordance with section 31 of the Act. Data minimization principles apply, and users will be informed of any automated decision-making or profiling that impacts them. </p>
              <p>2.9 Users retain the right to withdraw consent for data processing at any time, and Ro-ja will ensure compliance within a reasonable timeframe. </p>
              <p>2.10 Like many online platforms, we use "cookies" to enhance your experience on the Platform. Cookies allow us to personalize your visits, streamline the sign-in process, remember your preferences, and monitor how the Platform is used. Cookies are small files stored on your device by your browser. While you can opt to disable cookies through your browser settings, doing so may limit some of the Platform's functionality. </p>
              <p>2.11 You have the right to access, correct, or delete your personal data by contacting our Data Protection Officer at admin@ro-ja.co.zw. </p>
            </div>
          </section>

          {/* Copyright Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Copyright</h2>
            <div className="pl-4 space-y-4">
              <p>3.1 All content on the Platform, including text, graphics, logos, and software, is the intellectual property of Ro-ja and is protected under Copyright and Neighbouring Rights Act [Chapter 26:05] of Zimbabwe. </p>
              <p>3.2 Unauthorized use of any materials, including copying or reproduction, is strictly prohibited without prior written consent from Ro-ja. </p>
              <p>3.3 If you upload content to the Platform, you grant us a non-exclusive, royalty-free license to use, distribute, and display such content in connection with our services. </p>
              <p>3.3 All rights to the Platform’s content are reserved, and such content may not be reproduced without the express permission in writing from us. All rights not specifically granted in terms of these terms and conditions or by special permission are reserved. </p>
              <p>3.4 No business, person or web site may frame the Platform or any of the pages on the Platform in any way whatsoever without the permission in writing from us. </p>
            </div>
          </section>

          {/* Hyperlinks Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Hyperlinks</h2>
            <div className="pl-4 space-y-4">
              <p>4.1 You may link to our Platform, provided that it does not imply any form of association, approval, or endorsement by us without our express consent. </p>
              <p>4.2 The Platform may contain links to third-party websites, which are not controlled by us. We are not responsible for the content or privacy practices of these external sites. You access such third-party links at your own risk. </p>
              <p>4.3 The details of the properties available on the Platform are provided to us by third parties, private individuals and affiliated estate agents for your information only. We cannot verify these details and therefore make no warranties or representations as to their accuracy or completeness. If you rely on these details, you do so at your own risk. </p>
            </div>
          </section>

          {/* Blacklisting Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Blacklisting</h2>
            <div className="pl-4 space-y-4">
              <p>5.1 We reserve the right to terminate or suspend your account and blacklist you from the Platform for any violation of these Terms or for fraudulent or illegal activities. </p>
              <p>5.2 Users who have been blacklisted are prohibited from attempting to re-register or access the Platform using any other name or account. </p>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Disclaimer</h2>
            <div className="pl-4 space-y-4">
              <p>6.1 The Platform and its services are provided on an "as-is" and "as-available" basis. We make no warranties or guarantees as to the accuracy, reliability, or completeness of the Platform's content. </p>
              <p>6.2 Users are encouraged to report any possible malfunctions and errors to (type in the word support then) @ro-ja.co.zw. We shall not be liable if we cannot process your details due to circumstances beyond our reasonable control. </p>
              <p>6.3 We disclaim any liability for any damages, losses, or injuries arising from your use of the Platform, including but not limited to, errors, interruptions, or delays in the service. </p>
              <p>6.4 We are not responsible for the content uploaded by users, including listings or reviews. You acknowledge that you use such content at your own risk. </p>
            </div>
          </section>

          {/* Security Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Security</h2>
            <div className="pl-4 space-y-4">
              <p>7.1 Any individual or entity attempting to introduce harmful code to the Platform, gain unauthorized access to any part of the Platform, alter or tamper with its content or pages, or duplicate its materials without permission, will be prosecuted to the fullest extent of the law. In cases where such actions result in damage or loss, we reserve the right to seek civil damages. </p>
              <p>7.2 Although we take steps to ensure that files and materials available for download on the Platform are safe, we do not guarantee that these materials are completely free from viruses, malware, or other potentially harmful code. </p>
              <p>7.3 While we strive to protect your data, no system is completely secure. Therefore, we cannot guarantee absolute security of your information. </p>
              <p>7.4 Any breach of security will be subject to legal action under the Cyber and Data Protection Act and other applicable Zimbabwean laws. </p>
              <p>7.5 Data breaches will be promptly reported to the relevant authorities and impacted users in accordance with sections 32 and 33 of the Act. </p>
            </div>
          </section>

          {/* Disputes Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Disputes</h2>
            <div className="pl-4 space-y-4">
              <p>8.1 In the event of any disputes arising out of the use of the Platform, the parties agree to resolve the matter amicably. Should this fail, disputes will be referred to arbitration in Harare, Zimbabwe, in accordance with the Arbitration Act [Chapter 7:15]. </p>
              <p>8.2 Each party will bear its own legal fees, and the unsuccessful party will bear the costs of the arbitration. </p>
            </div>
          </section>

          {/* Whole Agreement Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Whole Agreement</h2>
            <div className="pl-4 space-y-4">
              <p>9.1 These Terms constitute the entire agreement between you and Ro-ja regarding the use of the Platform. Any prior agreements, whether written or verbal, are hereby superseded. </p>
              <p>9.2 We reserve the right to amend these Terms at any time, and such changes will take effect immediately upon posting on the Platform. </p>
            </div>
          </section>

          {/* Listing Rules Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">Listing Rules</h2>
            <div className="pl-4 space-y-4">
              <p>10.1 All property listings must be genuine, and the images uploaded must represent the actual property being marketed. Use of logos, promotional banners, or irrelevant images is strictly prohibited. </p>
              <p>10.2 Duplicate listings and misleading information will result in the immediate removal of the listing and may lead to account suspension. </p>
              <p>10.3 We reserve the right to remove any content or listings that violate these terms or applicable laws. </p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
