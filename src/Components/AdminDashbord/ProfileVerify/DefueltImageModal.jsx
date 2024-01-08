import { useEffect } from "react";
import { useState } from "react";

const DefueltImageModal = ({
  setSelectedDefaultFile,
  setSelectedFile,
  setSelectedImage,
  setdefultImageOpen,
  toggleDrop,
  defultImageOpen,
}) => {
  const [imageFiles, setImageFiles] = useState([]); // Use state to store the image files

  const handleDefaultFileSelect = (defaultFileUrl, imageFil) => {
    setSelectedFile(imageFil);
    setSelectedImage(null);
    setdefultImageOpen(false);
    toggleDrop(false);
    const imageUrl = URL.createObjectURL(imageFil);

    setSelectedDefaultFile(imageUrl);
  };

  const imageFileNames = [
    "dp1.svg",
    "dp2.svg",
    "dp3.svg",
    "dp4.svg",
    "dp5.svg",
    "dp6.svg",
    "dp7.svg",
    "dp8.svg",
    "dp9.svg",
    "dp10.svg",
    "dp11.svg",
    "dp12.svg",
  ];

  useEffect(() => {
    // Fetch and load image files when the component mounts
    const fetchImages = async () => {
      const files = [];
      for (const fileName of imageFileNames) {
        try {
          const response = await fetch(`/images/defultImage/${fileName}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const blob = await response.blob();
          const file = new File([blob], fileName, { type: blob.type });
          files.push(file);
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      }
      setImageFiles(files);
    };

    fetchImages();
  }, []);

  // if click outside of modal the modal was close
  const closeDefultImageModal = () => {
    setdefultImageOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-[#090808] bg-opacity-70 flex justify-center items-end z-40 App pb-10 ">
      <div className=" lg:w-[700px] lg:h-[259px] bg-white rounded  p-3 flex  justify-center lg:ml-5 ">
        <div>
          <p
            className="cursor-pointer flex justify-end mb-2"
            onClick={closeDefultImageModal}
          >
            ✕
          </p>
          <div className="grid grid-cols-6 lg:gap-10 gap-2 md:gap-5">
            {imageFiles.map((image, i) => (
              <div key={i}>
                <img
                  className="cursor-pointer lg:w-[70px] lg:h-[70px] md:w-[50px] md:h-[50px] w-[30px] h-[30px]"
                  onClick={() => handleDefaultFileSelect(image.name, image)}
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefueltImageModal;
