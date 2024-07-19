import nature from "../imgs/nature.png";
import img1 from "../imgs/img1.jpg";
import ppt1 from "../imgs/ppt1.png";
import kun from "../imgs/kun.png";
import counter from "../imgs/counter.png";
import test from "../imgs/test.png";
import news from "../imgs/news.png";
import movieexample from "../imgs/movieexample.png";
import magazine1 from "../imgs/magazine1.png";
import video from '../video/video.mp4'



const works = [
  {
    category: "Web",
    video: video,
    title: "This site for IT teaching academy",
  },
  {
    category: "Web",
    img: news,
    title: "This landpage for example for news !",
    link: "https://newsdemo05.netlify.app/"
  },
  {
    category: "Web",
    img: movieexample,
    title: "Movie landing page example"
  },
  {
    category: "Web",
    img: magazine1,
    title: "This sites magazine example"
  },
  {
    category: "Web",
    img: test,
    title: "Test for developer but only css questions",
    link: "https://testdemo005.netlify.app/"
  },
  {
    category: "Web",
    img: kun,
    title: "Kun uz site demo version",
    link: "https://kunuzdemo.netlify.app/"
  },
  {
    category: "Web",
    img: counter,
    title: "Counter Example",
    link: "https://counterexample05.netlify.app/"
  },
  {
    category: "Web",
    img: nature,
    title: "About saving nature",
    link: "https://dashing-alpaca-3afa5d.netlify.app",
  },
  {
    category: "Video",
    img: img1,
    title: "Video for hard working",
    link: "https://www.instagram.com/reel/C6L7GAYCAe6/?igsh=ZGM4aWhnbGR3Y3Fs",
  },
  {
    category: "Other",
    img: ppt1,
    title: "Presentation for perfume product",
    link: "/PPT Perfume.pptx",
    isDownload: true,
  },
];

export default works;
