import { useForm } from "react-hook-form";

const IndustaryEditModal = ({ title, message, add, closeModal, modalData,  }) => {
    // const [refresh, setRefresh] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    //   const editIndustry = (data, e) => {
    //     // console.log(data);
    //     const industryeditdata = {
    //       industryname: data.industryname,
    //     };
    
    //     fetch(`https://rsapp.unbolt.co/industry_update/${modalData._id}`, {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(industryeditdata),
    //     })
    //       .then((res) => res.json())
    //       .then((result) => {
    //         setRefresh(!refresh);
    //         e.target.reset();
    //         console.log(result);
    //       });
    //   };

    return (
        <div >
              <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal h-[700px]">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title} o</h3>
                    <p className="py-4">{message}</p>
                    <div className=" p-7">
                  <form onSubmit={handleSubmit(add)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Edit Industry Name</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={modalData.industryname}
                        {...register("industryname", {
                          required: "industryname is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.industryname && (
                        <p className="text-red-500">
                          {errors.industryname.message}
                        </p>
                      )}
                    </div>

                    <input
                      className="shadow-lg rounded lg:text-[20px] md:text-[18] text-[16px] font-bold text-white px-3  bg-[#0077B5] cursor-pointer lg:py-4 md:py-3 py-[6px] w-full mt-4"
                      value="Add "
                      type="submit"
                    />
                  </form>
                  <div></div>
                </div>
                    <div className="modal-action">
                        
                        <button onClick={closeModal} className='btn btn-outline'>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndustaryEditModal;