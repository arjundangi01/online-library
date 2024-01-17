import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdDeleteForever } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../../utils/firebase";
import Svg from "../../components/svg";
import { Spinner } from "../../components/loading";
import { onAddNewBook, onUpdateBook } from "../../redux/Book/book.action";
import axios from "axios";

const EditBook = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://media.istockphoto.com/id/1159322968/vector/book-with-a-mouse-pointer-arrow-icon-vector-thin-line-illustration-for-ebooks-digital.jpg?s=612x612&w=0&k=20&c=IKmOuSDMncdV6p8ey76nIiMr9-AiecudtDoUpb-utq8="
  );
  const { isAuth } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAllFilled, setIsAllFilled] = useState(true);
  const [isImageUploadLoading, setImageUploadLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [bookData, setBookData] = useState({});
  let { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const {
      data: { data },
    } = await axios.get(`${process.env.REACT_APP_BASE_URL}/books/one/${id}`);
    setBookData(data);
  };
  const handleImageChange = (e) => {
    setImageUploadLoading(true);
    // let image = e.target.files[0];
    uploadImage(e.target.files[0])
      .then((downloadURL) => {
        setBookData({ ...bookData, image: downloadURL });
        setImageUploadLoading(false);

        // console.log(downloadURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(bookData);
    if (
      !bookData?.bookName ||
      !bookData?.price ||
      !bookData?.category ||
      !bookData?.publisherName ||
      !bookData?.writerName
    ) {
      setIsAllFilled(false);

      return;
    }
    setIsAllFilled(true);
    let newObj = { ...bookData };
    if (bookData?.image) {
      newObj = { ...bookData, image: imageUrl };
    }
    setIsSubmitLoading(true);
    dispatch(onUpdateBook(id,newObj,setIsSubmitLoading,navigate));

    // setIsSubmitLoading(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value });
  };
  return (
    <main className="w-[70%] m-auto">
      <form>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Edit Book
            </h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4 flex justify-between">
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">
                    Book Name
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        onChange={handleChange}
                        value={bookData?.bookName}
                        type="text"
                        name="bookName"
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter Book Name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    for="price"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        type="number"
                        name="price"
                        value={bookData?.price}
                        onChange={handleChange}
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter Price"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    for="category"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select Category
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <select
                        className="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        name="category"
                        id=""
                        value={bookData?.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="science">Science</option>
                        <option value="maths">Maths</option>
                        <option value="history">History</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sm:col-span-4 flex justify-between">
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">
                    Writer Name
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        type="text"
                        name="writerName"
                        onChange={handleChange}
                        value={bookData?.writerName}
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter Writer Name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    for="publisherName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Publisher Name
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={bookData?.publisherName}
                        name="publisherName"
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter Publisher Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="cover-photo"
                  className=" text-sm font-medium leading-6 flex gap-3 items-center"
                >
                  Cover photo
                  {isImageUploadLoading && <Spinner />}
                </label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div class="text-center">
                    {!bookData?.image ? (
                      <></>
                    ) : (
                      <MdDeleteForever
                        className="text-red-400 text-[1.8rem]"
                        onClick={() => setBookData({ ...bookData, image: "" })}
                      />
                    )}
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      {!bookData?.image ? (
                        <>
                          {" "}
                          <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                          </label>
                          <input
                            onChange={handleImageChange}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </>
                      ) : (
                        <img
                          className="max-w-sm min-w-sm max-h-52 min-h-52 "
                          src={bookData?.image}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isAllFilled ? (
              ""
            ) : (
              <p className="text-red-600">Please Fill All Detail</p>
            )}
            <div className="flex justify-center mt-5">
              {isSubmitLoading ? (
                <button
                  className="px-5 min-w-[30%]   flex items-center justify-center gap-2 text-white  rounded-2xl
                py-1.5 text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                "
                >
                  <Svg /> loading..
                </button>
              ) : (
                <button
                  onClick={onSubmit}
                  className="  px-5 min-w-[30%] rounded-2xl text-white 
                    py-1.5 text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                  
                  "
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditBook;
