import { LottieHandler } from "../../feedback";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
};

type HasId = { id?: number };

const GridList = <T extends HasId>({
  records,
  renderItem,
  emptyMessage,
}: GridListProps<T>) => {
  const categoriesList =
    records.length > 0 ? (
      records.map((category) => (
        <div
          key={category.id}
          className="flex justify-center items-center mb-5 mt-2"
        >
          {renderItem(category)}
        </div>
      ))
    ) : (
      <div className="flex justify-center items-center mb-5 mt-2">
        <LottieHandler type="shoppingError" message={emptyMessage}/>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
      {categoriesList}
    </div>
  );
};

export default GridList;
