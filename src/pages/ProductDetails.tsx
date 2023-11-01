import ProductReview from '@/components/ProductReview';
import {
  useEditBooksMutation,
  useGetSpecificBooksQuery,
} from '@/redux/api/apiSlice';
import { useParams } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// type Book = {
//   name: string;
//   category: string;
//   author: string;
//   pricing: number;
//   status: string;
// };
enum GenderEnum {
  selfhelp = 'Self-Help',
  Romantic = 'Romantic',
  Comedy = 'Comedy',
}
enum statusEnum {
  OnStock = 'On Stock',
  NoStock = 'On Stock',
}

interface IFormInput {
  name: string;
  category: GenderEnum;
  author: string;
  pricing: number;
  status: boolean;
}

export default function ProductDetails() {
  const [editBooks, { isLoading, isError, isSuccess }] = useEditBooksMutation();
  const { _id } = useParams();
  const { data: product } = useGetSpecificBooksQuery(_id);

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (Editdata) => {
    isLoading;
    editBooks({ _id, data: Editdata });
    console.log({ _id, data: Editdata });
    if (isSuccess) {
      // Handle success
      console.log('successful');
    } else if (isError) {
      // Handle error
      console.error('Edit Books Error:');
    }
    reset();
  };

  return (
    <>
      <div className="flex max-w-5xl mx-auto items-center border-b border-gray-300 p-5">
        <div className="w-[40%] p-5 m-5">
          <img src={product?.image_link} alt="" />
        </div>
        <div className="w-[60%] space-y-3 p-10 border-l-4">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>

          <ul className="list-disc list-inside space-y-1 text-lg">
            <li>Category: {product?.category}</li>
            <li>Rating: {product?.popularity}</li>
            <li>Pages: {product?.pages}</li>
            <li>Language: {product?.language}</li>
          </ul>
          <div className="flex">
            <button
              className="btn"
              onClick={() => document.getElementById('my_modal_5').showModal()}
            >
              <BiEdit className="text-2xl" />
            </button>

            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action px-8 flex justify-center w-full">
                  {/* <form className="w-full">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <div className="flex justify-between items-center">
                      <label htmlFor="name">Name:</label>
                      <input
                        className="input input-bordered w-full max-w-xs m-2"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="category">Category:</label>
                      <input
                        className="input input-bordered w-full max-w-xs m-2"
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="author">Author:</label>
                      <input
                        className="input input-bordered w-full max-w-xs m-2"
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="pricing">Pricing:</label>
                      <input
                        className="input input-bordered w-full max-w-xs m-2"
                        type="number"
                        name="pricing"
                        id="pricing"
                        value={formData.pricing}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="status">Status:</label>
                      <select
                        className="input input-bordered w-full max-w-xs m-2"
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                    <button
                      className="btn btn-active btn-ghost w-full"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Submit
                    </button>
                  </form> */}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between w-full items-center my-2">
                      <label>Name</label>
                      <input
                        className="input input-bordered w-full max-w-lg"
                        {...register('name')}
                      />
                    </div>

                    <div className="flex justify-between w-full items-center my-2">
                      <label>author</label>
                      <input
                        className="input input-bordered w-full max-w-xs"
                        {...register('author')}
                      />
                    </div>
                    <div className="flex justify-between w-full items-center my-2">
                      <label>Category</label>
                      <select
                        className="input input-bordered max-w-xs"
                        {...register('category')}
                      >
                        <option value="Self-Help">Self-help</option>
                        <option value="Romantic">Romantic</option>
                        <option value="Comedy">Comedy</option>
                      </select>
                    </div>
                    <div className="flex justify-between w-full items-center my-2">
                      <label>Price</label>

                      <input
                        className="input input-bordered w-full max-w-xs"
                        {...register('pricing')}
                      />
                    </div>
                    <div className="flex justify-between w-full items-center my-2">
                      <label>Status</label>
                      <select
                        className="input input-bordered w-full max-w-xs"
                        {...register('status')}
                      >
                        <option value="true">On Stock</option>
                        <option value="false">No Stock</option>
                      </select>
                    </div>

                    <input type="submit" className="btn btn-primary w-full" />
                  </form>
                </div>
              </div>
            </dialog>
            <button className="btn btn-active ml-2">
              <AiFillDelete className="text-2xl"></AiFillDelete>
            </button>
          </div>
        </div>
      </div>
      <ProductReview id={_id!} />
    </>
  );
}
