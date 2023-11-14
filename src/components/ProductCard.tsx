import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  // console.log(product);
  const dispatch = useDispatch();
  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="text-center rounded-2xl h-[510px] flex flex-col  justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link
          to={`/product-details/${product?._id}`}
          className="w-full flex flex-col justify-center items-center"
        >
          <img src={product?.image_link} alt="product" className="w-52 h-64" />
          <h1 className="text-xl font-semibold">{product?.name}</h1>
        </Link>
        <p className="text-center">Rating: {product?.popularity}</p>
        <p className="text-sm text-center ">
          Availability: {product?.status ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">Price: {product?.pricing}</p>
        <p className="text-sm">Category : {product?.category}</p>
        <Button variant="default" onClick={() => handleAddProduct(product)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
