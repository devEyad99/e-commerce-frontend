import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import { actGetCategories } from "../store/categories/categoriesSlice"; 
import { Loading } from "../components/feedback";
import Category from "../components/eCommerce/Category/Category";
import { useEffect } from "react";
import { GridList, Heading } from "../components/common";

export default function Categories() {
  const dispatch = useAppDispatch();
  const {categories, error, loading} = useAppSelector((state) => state.categories);

  useEffect(() => {
    if(!categories.length){
      dispatch(actGetCategories());
    }
    
  }, [dispatch, categories]);


  return (
    <> 
    <Heading>Categories</Heading>
    <Loading loading={loading} error={error}>
    <GridList  records={categories} renderItem={(category) => <Category title={category.title} img={category.img} prefix={category.prefix}/>}/>
    </Loading>
    </>
  );
}

