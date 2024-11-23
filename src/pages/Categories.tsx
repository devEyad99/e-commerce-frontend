import useCategories from "../hooks/useCategories";
import { Loading } from "../components/feedback";
import Category from "../components/eCommerce/Category/Category";
import { GridList, Heading } from "../components/common";

export default function Categories() {
  
  const { categories, title, loading, error } = useCategories();

  return (
    <> 
      <Heading title={title} />
      <Loading loading={loading} error={error} type="category">
        <GridList emptyMessage="there are no categoies" records={categories} renderItem={(category) => <Category title={category.title} img={category.img} prefix={category.prefix} />} />
      </Loading>
    </>
  );
}
