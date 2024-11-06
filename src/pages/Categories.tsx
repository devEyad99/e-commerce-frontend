import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import { actGetCategories } from "../store/categories/categoriesSlice"; 
import { Loading } from "../components/feedback";
import Category from "../components/eCommerce/Category/Category";
import { useEffect } from "react";

export default function Categories() {
  const dispatch = useAppDispatch();
  const {categories, error, loading} = useAppSelector((state) => state.categories);

  useEffect(() => {
    if(!categories.length){
      dispatch(actGetCategories());
    }
    
  }, [dispatch, categories]);

  const categoriesList = categories.length > 0 ? categories.map((category) => {
    return (
      <div key={category.id} className="flex justify-center items-center mb-5 mt-2">
        <Category title={category.title} img={category.img} prefix={category.prefix} />
      </div>
    );
  }) : 'there are no categories';

  return (
    <Loading loading={loading} error={error}> 
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
      {categoriesList}
    </div>
    </Loading>
  );
}

