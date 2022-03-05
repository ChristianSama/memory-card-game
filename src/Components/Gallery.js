import { useState, useEffect, useRef } from 'react';
import '../css/Gallery.css';

function Gallery(props) {

  const galleryChars = props.characters.map((char) => {
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


export default Gallery;