import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

import {
  useAddNewProductMutation,
  useGetBooksQuery,
} from '@/redux/api/apiSlice';
import { AiFillFileAdd } from 'react-icons/ai';

import {
  filterCategory,
  filterPriceRange,
  updateStatus,
} from '@/redux/features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

enum GenderEnum {
  selfhelp = 'Self-Help',
  Romantic = 'Romantic',
  Comedy = 'Comedy',
}

interface IFormInput {
  name: string;
  category: GenderEnum;
  author: string;
  pricing: number;
  status: string | number | readonly string[] | undefined;
  image_link: string;
  language: string;
  pages: number;
  popularity: number;
}

export default function Products() {
  const { data } = useGetBooksQuery(undefined);
  const { register, handleSubmit, reset, control } = useForm<IFormInput>();
  const [addNewProduct] = useAddNewProductMutation();
  console.log(data?.data);

  const { status, priceRange, category } = useAppSelector(
    (store) => store.filter
  );

  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    console.log(value);
    dispatch(filterPriceRange(value[0]));
  };

  const handleCategory = (event: any) => {
    console.log(event.target.value);
    dispatch(filterCategory(event.target.value));
  };

  let productsData;

  const filterdCategory = data?.data?.filter(
    (item: { category: string }) => item.category !== category
  );

  if (status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; pricing: number; category: string }) =>
        item.status === true &&
        item.pricing < priceRange &&
        item.category === category
    );
  } else if (!status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; pricing: number; category: string }) =>
        item.status === false &&
        item.pricing < priceRange &&
        item.category === category
    );
  } else if (priceRange > 0 && filterdCategory) {
    productsData = data?.data?.filter(
      (item: { status: boolean; pricing: number; category: string }) =>
        item.pricing < priceRange
    );
  } else {
    productsData = data?.data;
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    addNewProduct(data);
    reset();
  };

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
      {/* filter area */}
      <div className=" flex flex-col bg-slate-50 col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch id="in-stock" onClick={() => dispatch(updateStatus())} />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[500]}
              max={500}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Category </span>
          </label>
          <select className="select select-bordered" onChange={handleCategory}>
            <option disabled selected>
              All Category
            </option>
            <option>Poetry</option>
            <option>Self-Help</option>
            <option>Romance</option>
            <option>Fantasy</option>
            <option>Dystopian</option>
            <option>Classic</option>
          </select>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col bg-slate-300 p-4 rounded">
          <h1 className="text-2xl uppercase mb-2">Add Product</h1>
          <button
            className="btn btn-accent text-white"
            onClick={() => {
              const modalElement = document.getElementById(
                'my_modal_5'
              ) as HTMLDialogElement;
              if (modalElement) {
                modalElement.showModal();
              }
            }}
          >
            <AiFillFileAdd className="text-2xl" /> Add Product
          </button>

          <dialog
            id="my_modal_5"
            className=" modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg uppercase text-center">
                Add Product On Our Shop!
              </h3>
              <p className="py-2 text-center">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action px-2 flex justify-center w-full">
                <form
                  className="w-full max-w-md mx-auto p-3 bg-white rounded-lg shadow-md flex flex-wrap"
                  onSubmit={handleSubmit(onSubmit)}
                  method="dialog"
                >
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="name" className="text-gray-600">
                      Name
                    </label>
                    <input
                      id="name"
                      className="input input-bordered w-full"
                      {...register('name')}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="author" className="text-gray-600">
                      Author
                    </label>
                    <input
                      id="author"
                      className="input input-bordered w-full"
                      {...register('author')}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="category" className="text-gray-600">
                      Category
                    </label>
                    <select
                      id="category"
                      className="input input-bordered w-full"
                      {...register('category')}
                    >
                      <option value="Self-Help">Self-help</option>
                      <option value="Romantic">Romantic</option>
                      <option value="Comedy">Comedy</option>
                    </select>
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="pricing" className="text-gray-600">
                      Price
                    </label>
                    <input
                      id="pricing"
                      className="input input-bordered w-full"
                      {...register('pricing')}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="status" className="text-gray-600">
                      Status
                    </label>

                    <Controller
                      name="status"
                      control={control}
                      defaultValue="false" // Set the default value
                      render={({ field }) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            {...field}
                            id="status"
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <label
                            htmlFor="status"
                            className="ml-2 text-gray-700"
                          >
                            In Stock
                          </label>
                        </div>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="image_link" className="text-gray-600">
                      Image Link
                    </label>
                    <input
                      id="image_link"
                      className="input input-bordered w-full"
                      {...register('image_link')}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="pages" className="text-gray-600">
                      Pages
                    </label>
                    <input
                      id="pages"
                      className="input input-bordered w-full"
                      {...register('pages')}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="popularity" className="text-gray-600">
                      Popularity
                    </label>
                    <input
                      id="popularity"
                      className="input input-bordered w-full"
                      {...register('popularity')}
                    />
                  </div>
                  <div className="w-full md:w-full px-2 mb-4">
                    <label htmlFor="category" className="text-gray-600">
                      Language
                    </label>
                    <select
                      id="category"
                      className="input input-bordered w-full"
                      {...register('category')}
                    >
                      <option value="Self-Help">English</option>
                      <option value="Romantic">Bangla</option>
                      <option value="Romantic">Hindi</option>
                      <option value="Romantic">French</option>
                      <option value="Romantic">Spanish</option>
                    </select>
                  </div>

                  <div className="w-full px-2 mb-4">
                    <button type="submit" className="btn btn-primary w-full">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* product listing  */}

      {/* Products  */}
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
