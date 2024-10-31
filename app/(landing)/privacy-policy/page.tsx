import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RO-JA Properties",
  description:
    "Learn about how RO-JA Properties collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | RO-JA Properties",
    description:
      "Our commitment to protecting your privacy and personal information.",
    url: "https://roja.co.zw/privacy-policy",
    siteName: "RO-JA Properties",
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#344E41] mb-6">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="mb-6">
            At Roja, we respect your privacy and are committed to protecting the
            personal information you share with us. This Privacy Policy explains
            how we collect, use, and protect your data in accordance with
            Zimbabwean law, including the Cyber and Data Protection Act [Chapter
            12:07].
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              1. Information We Collect
            </h2>
            <div className="pl-4">
              <h3 className="text-xl font-medium mb-2">
                1.1 Personal Information
              </h3>
              <p className="mb-4">
                When you register on the Platform or interact with our services,
                we may collect personal details such as your name, contact
                information, financial information, property history, and other
                data relevant to your interaction with the Platform.
              </p>

              <h3 className="text-xl font-medium mb-2">
                1.2 Non-Personal Information
              </h3>
              <p className="mb-4">
                We may also collect non-identifiable data related to how you use
                our Platform, such as browser type, device information, and
                browsing behaviour.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              2. How We Use Your Information
            </h2>
            <div className="pl-4">
              <h3 className="text-xl font-medium mb-2">
                2.1 Providing Services
              </h3>
              <p className="mb-4">
                Your personal information is used to facilitate transactions,
                verify users, and improve the services we provide. This may
                include processing rental agreements, managing user accounts,
                and responding to customer inquiries.
              </p>

              <h3 className="text-xl font-medium mb-2">2.2 Communication</h3>
              <p className="mb-4">
                We use your contact details to send you service-related
                communications, such as confirmation emails, service updates, or
                responses to your inquiries.
              </p>

              <h3 className="text-xl font-medium mb-2">2.3 Marketing</h3>
              <p className="mb-4">
                With your explicit consent, we may send you promotional content
                or updates about new services, features, or opportunities on the
                Platform. You can opt out of these communications at any time.
              </p>

              <h3 className="text-xl font-medium mb-2">
                2.4 Statistical Analysis
              </h3>
              <p className="mb-4">
                We may use non-identifiable information to compile anonymous
                statistical reports to understand how users engage with our
                Platform and improve its functionality.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              3. Data Sharing
            </h2>
            <div className="pl-4">
              <h3 className="text-xl font-medium mb-2">
                3.1 Third-Party Service Providers
              </h3>
              <p className="mb-4">
                To provide certain services, we may share your information with
                trusted third-party partners who comply with the Cyber and Data
                Protection Act of Zimbabwe.
              </p>

              <h3 className="text-xl font-medium mb-2">
                3.2 Legal Requirements
              </h3>
              <p className="mb-4">
                We may be required to disclose your personal information to
                comply with legal obligations, court orders, or government
                regulations.
              </p>

              <h3 className="text-xl font-medium mb-2">
                3.3 Business Transfers
              </h3>
              <p className="mb-4">
                In the event of a merger, acquisition, or sale of assets, your
                personal information may be transferred as part of the
                transaction.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              4. Data Security
            </h2>
            <div className="pl-4">
              <p className="mb-4">
                4.1 We take appropriate technical and organizational measures to
                secure your data against unauthorized access, loss, or misuse.
              </p>
              <p className="mb-4">
                4.2 While we strive to protect your data, no system is
                completely secure.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              5. Cookies
            </h2>
            <div className="pl-4">
              <h3 className="text-xl font-medium mb-2">
                5.1 What Are Cookies?
              </h3>
              <p className="mb-4">
                Cookies are small text files placed on your device when you
                visit our Platform.
              </p>

              <h3 className="text-xl font-medium mb-2">
                5.2 How We Use Cookies
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Personalize your experience</li>
                <li>Simplify sign-in process</li>
                <li>Track and analyze usage data</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">5.3 Managing Cookies</h3>
              <p className="mb-4">
                You can adjust your browser settings to block or delete cookies.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              6. Your Rights
            </h2>
            <div className="pl-4">
              <h3 className="text-xl font-medium mb-2">
                6.1 Access and Correction
              </h3>
              <p className="mb-4">
                You have the right to access and correct your personal
                information. You can do this by contacting us at
                admin@ro-ja.co.zw.
              </p>

              <h3 className="text-xl font-medium mb-2">6.2 Data Deletion</h3>
              <p className="mb-4">
                You may request the deletion of your personal information at any
                time by emailing admin@ro-ja.co.zw.
              </p>

              <h3 className="text-xl font-medium mb-2">
                6.3 Withdrawal of Consent
              </h3>
              <p className="mb-4">
                If you have given us consent to process your data, you may
                withdraw this consent at any time by unsubscribing from
                communications or contacting us directly.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              7. Data Retention
            </h2>
            <div className="pl-4">
              <p className="mb-4">
                7.1 We will only retain your personal data for as long as
                necessary to fulfil the purposes for which it was collected, or
                as required by law. Once the data is no longer needed, it will
                be securely deleted or anonymized.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              8. Data Transfers
            </h2>
            <div className="pl-4">
              <p className="mb-4">
                8.1 Your personal information may be processed and stored
                outside of Zimbabwe. However, we ensure that any transfer of
                data is compliant with applicable data protection laws, and that
                adequate safeguards are in place to protect your privacy.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <div className="pl-4">
              <p className="mb-4">
                9.1 We may update this Privacy Policy from time to time to
                reflect changes in our practices or for legal or regulatory
                reasons. Any changes will be posted on this page, and we
                encourage you to review it periodically.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              10. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or how we
              handle your personal information, please contact us at{" "}
              <a
                href="mailto:admin@ro-ja.co.zw"
                className="text-[#588157] hover:text-[#344E41] underline"
              >
                admin@ro-ja.co.zw
              </a>
            </p>
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

export default PrivacyPolicyPage;
