function Gallery(props) {
  //get random sample of a particular size
  const gallerySize = 12;
  const characters = shuffle(...props.characters).slice(0, gallerySize);

  const galleryChars = characters.map((char) => {
    return <img onClick={props.handleClick} src={char.image} key={char.id} id={char.id}/>
  });

  return (
    <div className="gallery">
      {galleryChars}
    </div>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default Gallery;