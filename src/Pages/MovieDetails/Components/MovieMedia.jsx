import Masonry from "react-masonry-css";

const MovieMedia = ({ media }) => {

  return (
    <div className=" flex flex-col my-6 mx-6 ml-10">
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={{
          default: 4,
          3000: 6,
          1900: 5,
          1500: 4,
          1200: 3,
          1000: 2,
          500: 1,
        }}
      >
        {media.map((item, index) => (
          <div
            key={item.id}
            className={`shadow-sm mr-8 ${index % 2 === 0 ? "mb-10" : "mb-6"}`}
          >
            <iframe
              className="rounded-2xl h-52  w-full object-cover"
              src={`https://www.youtube.com/embed/${item.key}`}
              frameborder="0"
              title={item.name}
            ></iframe>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default MovieMedia;
