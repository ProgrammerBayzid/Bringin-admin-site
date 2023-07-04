import { useLoaderData } from "react-router-dom";

const RepotedDetails = () => {
  const candidate_report = useLoaderData();
  console.log(candidate_report);
  const { userid, report, image, candidateid } = candidate_report;
  const {
    number,
    fastname,
    lastname,
    gender,
    experiencedlevel,
    startedworking,
    deatofbirth,
    email,
  } = candidateid;
  return (
    <div>
      <div>
        <div className=" p-4 flex flex-col justify-between leading-normal">
          <div className="flex items-center mb-10">
            {candidateid?.image ? (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={candidateid.image}
                alt="Avatar"
              />
            ) : (
              <p></p>
            )}
            <div className="text-sm">
              {fastname ? (
                <p className="text-gray-900 leading-none font-medium text-[18px]">
                  {fastname} {lastname}
                </p>
              ) : (
                <p>....</p>
              )}

              {deatofbirth ? (
                <p className="text-gray-600 font-medium text-[18px] mt-1">
                  {deatofbirth.slice(0, 10)}
                </p>
              ) : (
                <p>....</p>
              )}
              {gender ? (
                <p className="text-gray-600 font-medium text-[18px] mt-1">
                  {gender}
                </p>
              ) : (
                <p>....</p>
              )}
            </div>
          </div>
          <div className="mb-8">
            <div className="">
              {startedworking ? (
                <p className="mb-2 text-gray-700 text-base">
                  Started Working : {startedworking.slice(0, 10)}
                </p>
              ) : (
                <p></p>
              )}

              {experiencedlevel ? (
                <p className="mb-2 text-gray-700 text-base">
                  Experienced Level : {experiencedlevel.slice(0, 10)}
                </p>
              ) : (
                <p></p>
              )}
              {email ? (
                <p className="mb-2 text-gray-700 text-base">Email : {email}</p>
              ) : (
                <p></p>
              )}
              {number ? (
                <p className="mb-2 text-gray-700 text-base">Number : {number}</p>
              ) : (
                <p></p>
              )}
            </div>

            <div>
                <p>Report: {report}</p>
            </div>
            <div>
                <p>Report Image: {image}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepotedDetails;
