import { useState, useEffect, useRef } from 'react';
import '../css/Gallery.css';

function Gallery(props) {

  //get random sample of a particular size
  const shuffledChars = shuffle([...props.characters]).slice(0, props.gallerySize);

  const galleryChars = shuffledChars.map((char) => {
    return <img onLoad={props.imageLoad} onClick={props.handleClick} src={char.image} key={char.id} id={char.id}/>
  });

  const spinner = <h2>LOADING...</h2>

  return (
    <div>
      <div style={{display: props.isLoading ? "block" : "none"}}>{spinner}</div>
      <div className="gallery" style={{display: props.isLoading ? "none" : "grid"}}>{galleryChars}</div>
    </div>
  );
}

function shuffle(array) {
  //[1, 2, 3]
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default Gallery;