// //..
// import ContentLoader from "react-content-loader"


// export default function CategorySkeletons() {
//   return (
//     <ContentLoader 
//     speed={2}
//     width={476}
//     height={124}
//     viewBox="0 0 476 124"
//     backgroundColor="#f0eaea"
//     foregroundColor="#cfa5a5"

//   >
//     <rect x="7" y="114" rx="3" ry="3" width="139" height="5" /> 
//     <circle cx="74" cy="52" r="50" />
//   </ContentLoader>
//   )
// }

import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, idx) => (
      <div
        key={idx}
        className="flex justify-center items-center mb-5 mt-2"
      >
        <ContentLoader
          speed={2}
          width={200}
          height={200}
          viewBox="0 0 200 200"
          backgroundColor="#f0f0f0"
          foregroundColor="#ffffff"
        >
          <rect x="61" y="179" rx="3" ry="3" width="85" height="6" />
          <circle cx="104" cy="84" r="70" />
        </ContentLoader>
      </div>
    ));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {renderSkeletons}
    </div>
  );
};

export default CategorySkeleton;
