import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Upload Tips | RO-JA Properties",
  description:
    "Learn how to capture the best images for your property listing.",
  openGraph: {
    title: "Image Upload Tips | RO-JA Properties",
    description:
      "Learn how to capture the best images for your property listing.",
    url: "https://ro-ja.com/image-upload-tips",
    siteName: "RO-JA Properties",
  },
};

const ImageUploadTipsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#344E41] mb-6">
          Image Upload Tips
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              Step 1: Start with an Exterior Shot
            </h2>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Position yourself:</strong> Stand outside the property,
                preferably at a distance that allows the entire building to fit
                within the frame. Choose a clear angle that highlights the
                property's structure and surroundings.
              </li>
              <li>
                <strong>Focus on Lighting:</strong> Ensure there's good natural
                light, preferably during early morning or late afternoon, to
                avoid harsh shadows. Avoid taking pictures on cloudy or dark
                days.
              </li>
              <li>
                <strong>Stabilize:</strong> Hold your phone or camera steady. If
                possible, use a tripod or stable surface to minimize any blur.
              </li>
              <li>
                <strong>Capture the Shot:</strong> Make sure the picture is
                well-centered, and keep the property's entrance visible.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              Step 2: Capture Key Exterior Areas (Optional)
            </h2>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Additional Exterior Shots:</strong> Take pictures of
                unique outdoor features like patios, garages, or gardens.
              </li>
              <li>
                <strong>Focus on Quality:</strong> Each picture should be sharp,
                with clear lighting that highlights these spaces.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              Step 3: Move Inside and Photograph Key Rooms
            </h2>
            <div className="pl-4">
              <h3 className="text-xl font-medium mb-2">Living Area:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Position yourself at the doorway or a corner to capture as
                  much of the room as possible.
                </li>
                <li>
                  Ensure good lighting by opening curtains or turning on lights
                  to avoid shadows.
                </li>
                <li>Check the frame for cleanliness and remove clutter.</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Kitchen:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Capture the full layout, including counters, appliances, and
                  any unique features.
                </li>
                <li>Make sure countertops are clear of personal items.</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Bedrooms:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Show each bedroom's full space from the doorway.</li>
                <li>
                  Capture the main elements (e.g., bed, closet) without clutter.
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Bathrooms:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Stand at the doorway or corner.</li>
                <li>Capture the sink, mirror, and shower/bath area clearly.</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Other Unique Spaces:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  If applicable, take pictures of any amenities like a gym,
                  pool, or study room.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              Step 4: Review and Upload Photos
            </h2>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Review the Quality:</strong> Make sure all pictures are
                clear, well-lit, and free of clutter. Blurry or dark photos
                reduce the appeal of the property.
              </li>
              <li>
                <strong>Select Photos for Upload:</strong> Choose the best
                pictures to give a comprehensive view of the property, both
                inside and out.
              </li>
              <li>
                <strong>Upload:</strong> Access the Ro-ja system's upload
                feature under the property listing, and select photos to upload.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#344E41] mb-4">
              Additional Tips:
            </h2>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Resolution:</strong> Use a device with a good-quality
                camera to ensure high-resolution images.
              </li>
              <li>
                <strong>Image Orientation:</strong> Take all pictures in
                landscape mode for consistency.
              </li>
              <li>
                <strong>Room Preparation:</strong> Ensure each room is tidy and
                presentable before taking photos.
              </li>
            </ul>
          </section>

          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 font-medium">
              <strong>N.B.:</strong> Please note that failure to ensure and
              upload high-quality, clear, and well-lit images of the property
              may lead to the removal and review of the listing from the Roja
              system. Consistent adherence to these standards is essential for
              maintaining the integrity and appeal of the platform's listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadTipsPage;
