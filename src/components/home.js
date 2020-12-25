// import React, { Component} from "react";
// import { Link } from 'react-router-dom';
import React, {  useEffect} from "react";

import axios from 'axios';
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardTitle,MDBView, MDBCarouselCaption
} from "mdbreact";

// Sources:
// https://mdbootstrap.com/docs/jquery/javascript/carousel/ 
// https://mdbootstrap.com/docs/jquery/navigation/footer/
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function HomePage() {
  // an array with image objects
  var images = [
    { title: "Stitch", component: "stitch", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1606887811/22_Stay_weird_rsqaja.svg" },
    { title: "Ariel", component: "ariel", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607121425/ariel_sxslax.svg" },
    { title: "R2D2", component: "r2d2", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607214128/Easy-R2D2-Coloring-Page_wwuxuv.svg" },
    { title: "Cheshire", component: "cheshire", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607214926/cat_bgi2bo.svg" },
    { title: "Yoda", component: "yoda", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607215338/Baby_Yodaa_x3tqzb.svg" },
    { title: "Minnie", component: "minnie", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607215930/minnie_xgilc6.svg" },
    { title: "Olaf", component: "olaf", svg_url: "https://res.cloudinary.com/pacplumeria/image/upload/v1607726765/OlafandSven_junavj.svg" },
    { title: "Mandala", component: "mandala", svg_url: "https://res.cloudinary.com/pacplumeria/image/upload/v1607236437/11_np2pjd.svg" },
    { title: "Pooh", component: "pooh", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607254945/bear_winnie_mpfj2l.svg" },
    { title: "Belle", component: "belle", svg_url: "https://res.cloudinary.com/pacplumeria/image/upload/v1607591469/Belle_ci22g1.svg" },
    { title: "Alien", component: "alien", svg_url: "https://res.cloudinary.com/pacplumeria/image/upload/v1607591459/alien22_oian8i.svg" },
    { title: "Alice", component: "alice", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607482010/alice_ofymqg.svg" },
    { title: "Dumbo", component: "dumbo", svg_url: "https://res.cloudinary.com/drqctijmr/image/upload/v1607562065/dumbo3_olwk0v.svg" },
  ];
  
  var start = 0;
  var end = 3;

  // when webpage loads, putItems function uses post route to add images to the database
  useEffect(() => {
    const putItems = async () => {
      images.map(async (image, i) => {
        console.log(image);
        const response = await axios.post(
          "http://localhost:5000/image/add",
          image,
        )
        console.log(response);
      })
    }
    putItems();
  });

  // Carousel with images 
  return (
    <div>
      <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-2" slide>
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1" id="carousel">

            <MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Wish Upon a Star</h3>
              </MDBCarouselCaption>
              <img
                className="d-block w-100"
                src="https://cdn.wallpapersafari.com/53/37/ImJf8o.jpg"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>

          <MDBCarouselItem itemId="2" id="carousel">
            <MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Express Yourself By Coloring Characters You Love</h3>
              </MDBCarouselCaption>
              <img
                className="d-block w-100"
                src="https://res.cloudinary.com/devjzx2qq/image/upload/v1607407049/Mickey-Mouse-on-Paint-Tube-Wallpaper_pmntal.jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>

          <MDBCarouselItem itemId="3" id="carousel">
            <MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Experience the Magic of Disney</h3>
              </MDBCarouselCaption>
              <img
                className="d-block w-100"
                src="https://wallpaperaccess.com/full/250147.jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>

      <h2>Enjoy Coloring These Images</h2>

      <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} className="z-depth-2">
        <MDBCarouselInner>

          {images.map((image, i) => {
            if (i !== 0) {
              start = end;
              end = start + 3;
            }
            return (
              <MDBCarouselItem itemId={i + 1}>
                {/* {i} */}
                <MDBRow id="carousel-card">
                  {images.slice(start, end).map((image) => {
                    return (
                      <MDBCol md="4">
                        {/* {start}
                          {end} */}
                        <MDBCard className="mb-2">
                          <MDBCardTitle>{image.title}</MDBCardTitle>
                          <MDBCardImage className="img-fluid" alt="disney" src={image.svg_url} />
                        </MDBCard>
                      </MDBCol>
                    )
                  })}
                </MDBRow>
              </MDBCarouselItem>
            )
          })}
        </MDBCarouselInner>
      </MDBCarousel>
    </div>
  )
}
