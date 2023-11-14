import { Button } from '@/components/ui/button';

import './css/home.css';

import catgallarge from '@/assets/images/cat-gal-large.webp';
import catgalmid from '@/assets/images/cat-gal-mid.webp';
import catgalsmall from '@/assets/images/cat-gal-small.webp';
import catgalsmall2 from '@/assets/images/cat-gal-small-2.webp';
import catgalmid2 from '@/assets/images/cat-gal-mid-2.webp';
import books1 from '@/assets/images/books1.png';
import books2 from '@/assets/images/books2.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/style.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';

export default function Home() {
  return (
    <>
      {' '}
      {/* Home hero section  */}
      <Swiper
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide className="slider-slide">
          <div className="flex justify-between items-center px-72 slideBg ">
            <div className="basis-2/3">
              <div
                className="font-extrabold text-6xl"
                data-swiper-parallax="-300"
              >
                <h1> Lorem Ipsum</h1>
              </div>
              <div className="font-bold text-4xl" data-swiper-parallax="-200">
                <h3> Simply dummy text</h3>
              </div>
              <div className="" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
                <button className="btn btn-warning mt-6 font-extrabold">
                  Shop
                </button>
              </div>
            </div>
            <div className="basis-1/3 flex justify-center">
              <img src={books1} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide">
          <div className="flex justify-between items-center px-72 secondSliderBg">
            <div className="basis-2/3">
              <div
                className="font-extrabold text-6xl"
                data-swiper-parallax="-300"
              >
                <h1> Lorem Ipsum </h1>
              </div>
              <div className="font-bold text-4xl" data-swiper-parallax="-200">
                <h3> Simply dummy text</h3>
              </div>
              <div className="" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
                <button className="btn btn-secondary mt-6 font-extrabold">
                  Shop
                </button>
              </div>
            </div>
            <div className="basis-1/3 flex justify-center">
              <img src={books2} alt="" className="h-full w-full" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Home Category Gallery */}
      <section className="pt--30 section-margin my-10 bg-[#EEEEEE] pb-10">
        <h2 className="sr-only">Category Gallery Section</h2>
        <div className="container">
          <div className="category-gallery-block">
            <a href="#" className="single-block hr-large">
              <img src={catgallarge} alt="" />
            </a>
            <div className="single-block inner-block-wrapper">
              <a href="#" className="single-image mid-image">
                <img src={catgalmid} alt="" />
              </a>
              <a href="#" className="single-image small-image">
                <img src={catgalsmall} alt="" />
              </a>
              <a href="#" className="single-image small-image">
                <img src={catgalsmall2} alt="" />
              </a>
              <a href="#" className="single-image mid-image">
                <img src={catgalmid2} alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* End of Home Category Gallery  */}
      <div className="mb-44">
        <div>
          <img className="mx-auto" src={books1} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            The future of Books is here
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/products">Brows all products</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
