import uniqid from 'uniqid';

function Gallery(props) {
  const characters = props.characters.map((char) => {
    const key = uniqid();
    return <img onClick={props.handleClick} src={char.image} key={char.id} id={char.id}/>
  });

  return (
    <div className="gallery">
      {characters}
    </div>
  );
}

export default Gallery;