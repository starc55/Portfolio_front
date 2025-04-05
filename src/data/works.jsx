import naturesite from "../imgs/naturesite.png";
import ppt1 from "../imgs/ppt1.png";
import ppt2 from "../imgs/ppt2.png";
import ppt3 from "../imgs/ppt3.png";
import ppt4 from "../imgs/ppt4.png";
import kunsite from "../imgs/kunsite.png";
import homesite from "../imgs/homesite.png";
import testsite from "../imgs/testsite.png";
import newssite from "../imgs/newssite.png";
import moviesite from "../imgs/moviesite.png";
import magazinesite from "../imgs/magazinesite.png";
import threedsiteme from "../imgs/threedsite.png";
import video from "../video/video.mp4";
import video2 from "../video/video2.mp4";
import video3 from "../video/video3.mp4";
import video4 from "../video/video4.mp4";
import video5 from "../video/video5.mp4";
import video6 from "../video/video6.mp4";
import video7 from "../video/video7.mp4";
import testNewsite from "../imgs/testNewsite.png";
import gamesite from "../imgs/gamesite.png";
import okstick from "../imgs/okstick.png";
import pandastick from "../imgs/pandastick.png";
import taraweehstick from "../imgs/taraweeh.png";
import nomoodstick from "../imgs/nomood.png";
import catstick from "../imgs/cat.png";
import goodstick from "../imgs/good.png";
import lolstick from "../imgs/lol.png";
import balancestick from "../imgs/balance.png";
import habystick from "../imgs/haby.png";
import happydogstick from "../imgs/happydog.png";
import tgweb1 from "../imgs/game.png";
import cat2 from "../imgs/cat2.png";
import shelby from "../imgs/shelby.png";
import starc from "../imgs/starc.png";

const works = [
  {
    category: "Web",
    video: video,
    title: "This site for IT teaching academy",
    tags: [
      "React",
      "JavaScript",
      "CSS",
      "HTML5",
      "Ant design",
      "Strapi",
      "Other react libraries",
    ],
  },
  {
    category: "Stickers",
    img: balancestick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: newssite,
    title: "This landpage for example for news !",
    link: "https://newsdemo05.netlify.app/",
    tags: ["React", "JavaScript", "CSS", "HTML5"],
  },
  {
    category: "Web",
    img: threedsiteme,
    title: "This is 3D site overview",
    tags: ["Three.js", "JavaScript", "CSS", "HTML5"],
  },
  {
    category: "Stickers",
    img: taraweehstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: tgweb1,
    title: "This is telegram web site(Games(Only open in telegram))",
    link: "https://t.me/ad_linkbot",
    tags: [
      "Telegram",
      "React",
      "CSS",
      "HTML5",
      "JavaScript",
      "Api",
      "Strapi",
      "Telegram Api",
    ],
  },
  {
    category: "Video",
    video: video2,
    title: "Video by me",
    tags: ["Video editing", "Cap Cut"],
  },
  {
    category: "Stickers",
    img: catstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: moviesite,
    title: "Movie landing page example",
    tags: ["React", "JavaScript", "CSS", "HTML5", "Strapi", "Api"],
  },
  {
    category: "Stickers",
    img: habystick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: magazinesite,
    title: "This sites magazine example",
    tags: ["React", "JavaScript", "CSS", "HTML5", "Strapi"],
  },
  {
    category: "Stickers",
    img: cat2,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: testsite,
    title: "Test for developer html and css questions",
    link: "https://testdemo005.netlify.app/",
    tags: ["HTML5", "CSS", "JavaScript", "React"],
  },
  {
    category: "Stickers",
    img: happydogstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: testNewsite,
    title: "Test for web developer html and css questions",
    link: "https://test-wheat-eta-33.vercel.app/",
    tags: ["HTML5", "CSS", "JavaScript", "React", "Vercel"],
  },
  {
    category: "Stickers",
    img: shelby,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Video",
    video: video3,
    title: "Video by me",
    tags: ["Video editing", "Cap Cut"],
  },
  {
    category: "Other",
    img: ppt2,
    title: "Presentation for science",
    link: "/tech.pptx",
    isDownload: true,
    tags: ["Canva", "Gamma", "Power Point"],
  },
  {
    category: "Video",
    video: video4,
    title: "Video by me",
    tags: ["Video editing", "Cap Cut"],
  },
  {
    category: "Stickers",
    img: okstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: kunsite,
    title: "Kun uz site demo version",
    link: "https://kunuzdemo.netlify.app/",
    tags: ["React", "JavaScript", "CSS", "HTML5"],
  },
  {
    category: "Video",
    video: video5,
    title: "Video by me",
    tags: ["Video editing", "Cap Cut"],
  },
  {
    category: "Stickers",
    img: pandastick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Web",
    img: homesite,
    title: "This site is about home desing",
    tags: ["React", "JavaScript", "CSS", "HTML5", "Bulma"],
  },
  {
    category: "Stickers",
    img: starc,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Video",
    video: video7,
    title: "Video by me",
    tags: ["Video editing", "Cap Cut"],
  },
  {
    category: "Stickers",
    img: nomoodstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Other",
    img: ppt4,
    title: "Presentation for Islamic history",
    link: "https://www.canva.com/design/DAGjwk6uFUs/WeRLHd69uK1u1dEyRE6enw/view?utm_content=DAGjwk6uFUs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h9e1d254006",
    isDownload: false,
    tags: ["Canva", "Power Point"],
  },
  {
    category: "Web",
    img: naturesite,
    title: "About saving nature",
    link: "https://dashing-alpaca-3afa5d.netlify.app",
    tags: ["HTML5", "CSS", "JavaScript"],
  },
  {
    category: "Stickers",
    img: lolstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Video",
    video: video6,
    title: "Video by me",
    tags: ["Video editing", "Cap Cut"],
  },
  {
    category: "Other",
    img: ppt3,
    title: "Presentation for History",
    link: "https://www.canva.com/design/DAGjwVMH5YY/XCu-t2AFkhhDNBut32OCkA/view?utm_content=DAGjwVMH5YY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hcf5d392ff5",
    isDownload: false,
    tags: ["Canva", "Power Point"],
  },
  {
    category: "Web",
    img: gamesite,
    title: "This site is about PS games",
    tags: ["React", "JavaScript", "CSS", "HTML5", "Bulma", "Api", "Strapi"],
  },
  {
    category: "Stickers",
    img: goodstick,
    title: "This is stickers for telegram",
    link: "https://t.me/obranostickers",
    tags: ["Canva", "Telegram", "Stickers"],
  },
  {
    category: "Other",
    img: ppt1,
    title: "Presentation for perfume product",
    link: "/PPT Perfume.pptx",
    isDownload: true,
    tags: ["Canva", "Power Point"],
  },
];

export default works;
