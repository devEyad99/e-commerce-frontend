//..
import { useEffect, useMemo } from 'react';
import {
  actGetCategories,
  cleanUpCategoriesRecords,
} from '../store/categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../store/categories/hooks';

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { categories, error, loading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(cleanUpCategoriesRecords());
    };
  }, [dispatch]);

  const title = useMemo(() => 'Categories', []);
  return {
    categories,
    title,
    error,
    loading,
  };
};

export default useCategories;
