import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useRef, useState } from "react";
import { useEffect } from "react";

const LocationModal = ({
  google,
  handleMapClick,
  selectedLocation,
  setIsModalOpen,
  setSelectedLocation,
  setLocationName,
}) => {
  const [searchBox, setSearchBox] = useState(null);
  const [searchText, setSearchText] = useState("");

  const mapRef = useRef();

  // useEffect(() => {
  //   // Initialize the Places Autocomplete service
  //   if (google) {
  //     const input = document.getElementById("location-input");
  //     const searchBox = new google.maps.places.Autocomplete(input);
  //     setSearchBox(searchBox);

  //     searchBox.addListener("place_changed", () => {
  //       const place = searchBox.getPlace();
  //       if (!place.geometry) {
  //         return;
  //       }

  //       const lat = place.geometry.location.lat();
  //       const lng = place.geometry.location.lng();
  //       setSelectedLocation({ lat, lng });
  //       setLocationName(place.formatted_address); // Set location name

  //       // Set the searchText to the formatted address
  //       setSearchText(place.formatted_address);
  //       // Center the map on the selected location
  //       mapRef.current.map.panTo({ lat, lng });

  //       console.log(`Latitude: ${lat}, Longitude: ${lng}`); // Log lat and lng
  //     });
  //   }
  // }, [google, setLocationName]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Initialize the Places Autocomplete service
    if (google) {
      const input = document.getElementById("location-input");
      const searchBox = new google.maps.places.Autocomplete(input);
      setSearchBox(searchBox);

      searchBox.addListener("place_changed", () => {
        const place = searchBox.getPlace();
        if (!place.geometry) {
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        setLocationName(place.formatted_address);
        setSearchText(place.formatted_address);

        mapRef.current.map.panTo({ lat, lng });

        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      });
    }

    // Fetch the user's current location and set it as the initial center
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });

        // Set the initial center of the map to the user's current location
        mapRef.current.map.panTo({ lat, lng });
      });
    }
  }, [google, setLocationName]);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-[#E6E6E6] bg-opacity-90 flex justify-center items-center z-40 ">
      <div className=" lg:w-[850px] bg-white lg:h-[550px] md:w-[750px] relative md:h-[550px] w-[330px] h-[450px]  shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="ml-2 mt-2">
          <input
            id="location-input"
            type="text"
            value={searchText}
            placeholder="Search for a location"
            onChange={handleSearchChange}
            className="focus:outline-none  input pl-3  w-2/5 mb-[5px] h-[35px] border border-[2px]"
          />
          <div className="absolute right-4 top-2">
            <div className="flex gap-x-4 items-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className=" text-white bg-[#0077B5] h-[25px] w-[50px] text-[14px] rounded rounded-[5px] "
              >
                Save
              </button>

              <label
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-[25px]  text-black"
              >
                ✕
              </label>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <Map
            ref={mapRef}
            google={google}
            zoom={10}
            initialCenter={currentLocation || { lat: 0, lng: 0 }}
            onClick={handleMapClick}
          >
            {selectedLocation && (
              <Marker
                position={selectedLocation}
                title="Selected Location"
                name="Selected Location"
              />
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBqybgfOd1_p1YKH1nOPOuR_C8Nbfv3kQ0",
})(LocationModal);
