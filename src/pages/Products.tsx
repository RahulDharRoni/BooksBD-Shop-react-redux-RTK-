import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useGetBooksQuery } from '@/redux/api/apiSlice';

import {
  filterCategory,
  filterPriceRange,
  updateStatus,
} from '@/redux/features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';

export default function Products() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  console.log(data);

  const { status, priceRange, category } = useAppSelector(
    (store) => store.filter
  );

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const handleSlider = (value: number[]) => {
    console.log(value);
    dispatch(filterPriceRange(value[0]));
  };

  const handleCategory = (event: string) => {
    console.log(event.target.value);
    dispatch(filterCategory(event.target.value));
  };

  let productsData;
  const filterdCategory = data?.data?.filter(
    (item: { status: boolean; pricing: number; category: string }) =>
      item.category !== category
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

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className=" bg-slate-50 col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
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
              defaultValue={[150]}
              max={150}
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
        <div></div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
