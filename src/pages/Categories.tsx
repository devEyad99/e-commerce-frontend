import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import { actGetCategories, cleanUpCategoriesRecords } from "../store/categories/categoriesSlice"; 
import { Loading } from "../components/feedback";
import Category from "../components/eCommerce/Category/Category";
import { useEffect, useMemo } from "react";
import { GridList, Heading } from "../components/common";

export default function Categories() {
  const dispatch = useAppDispatch();
  const { categories, error, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(cleanUpCategoriesRecords());
    };
  }, [dispatch]);

  const title = useMemo(() => "Categories", []);

  return (
    <> 
      <Heading title={title} />
      <Loading loading={loading} error={error}>
        <GridList records={categories} renderItem={(category) => <Category title={category.title} img={category.img} prefix={category.prefix} />} />
      </Loading>
    </>
  );
}
