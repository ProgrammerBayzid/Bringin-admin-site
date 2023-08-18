import { useForm } from "react-hook-form";

const SalaryEditModal = ({ title, message, add, closeModal, modalData,  })=> {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    return (
        <div>
             <div >
              <input type="checkbox" id="salary-modal" className="modal-toggle" />
            <div className="modal h-[700px]">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title} </h3>
                    <p className="py-4">{message}</p>
                    <div className=" p-7">
                  <form onSubmit={handleSubmit(add)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Edit Salary</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={modalData.salary}
                        {...register("salary", {
                          required: "salary is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.salary && (
                        <p className="text-red-500">
                          {errors.salary.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Edit Simbol</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={modalData.simbol}
                        {...register("simbol", {
                          required: "simbol is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.simbol && (
                        <p className="text-red-500">
                          {errors.simbol.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Edit Currency</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={modalData.currency}
                        {...register("currency", {
                          required: "currency is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.currency && (
                        <p className="text-red-500">
                          {errors.currency.message}
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
        </div>
    );
};

export default SalaryEditModal;