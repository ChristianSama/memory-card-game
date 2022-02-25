import uniqid from 'uniqid';

function Gallery(props) {
  const imageElements = props.images.map((imgSrc) =>
    <img src={imgSrc} key={uniqid()} />
  );

  return (
    <div className="gallery">
      {imageElements}
    </div>
  );
}

export default Gallery;