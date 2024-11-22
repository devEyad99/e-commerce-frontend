
// type GridListProps<T> = {
//   records: T[];
//   renderItem: (record: T) => React.ReactNode;
// }

// type HasId = { id?: number};

//  const GridList = <T extends HasId>({records, renderItem}: GridListProps<T>) => {
  
//   const categoriesList = records.length > 0 ? records.map((category) => {
//     return (
//       <div key={category.id} className="flex justify-center items-center mb-5 mt-2">
//         {renderItem(category)}
//       </div>
//     );
//   }) : 'there are no categories';

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
//     {categoriesList}
//   </div>
//   )
// }

// export default GridList;

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type HasId = { id?: number };

const GridList = <T extends HasId>({
  records,
  renderItem,
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
      <p className="text-center text-gray-500">There are no categories</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
      {categoriesList}
    </div>
  );
};

export default GridList;
