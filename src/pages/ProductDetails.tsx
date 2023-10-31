import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetSpecificBooksQuery } from '@/redux/api/apiSlice';
import { useParams } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

export default function ProductDetails() {
  const { _id } = useParams();
  // console.log(_id);
  const { data: product } = useGetSpecificBooksQuery(_id);
  // console.log(product);

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
            <button className="btn btn-active mr-2">
              <BiEdit className="text-2xl" />
            </button>
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
