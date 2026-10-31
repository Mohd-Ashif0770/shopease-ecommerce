import {
  Armchair,
  Laptop,
  Dumbbell,
  Keyboard,
  House,
  Glasses,
  Watch,
  Headphones,
  Backpack,
} from "lucide-react";

import furnitureImage from "../assets/categories/furniture.png";
import mobilesImage from "../assets/categories/mobiles-and-laptops.png";
import sportsImage from "../assets/categories/sports-and-outdoor.png";
import computerImage from "../assets/categories/computer-accessories.png";
import lifestyleImage from "../assets/categories/home-and-lifestyle.png";
import eyewearImage from "../assets/categories/wallets-and-eyewear.png";
import watchesImage from "../assets/categories/watches.png";
import audioImage from "../assets/categories/audio-and-tech.png";
import bagsImage from "../assets/categories/backpacks-and-bags.png";

export const categoryPresentation = {
  furniture: {
    image: furnitureImage,
    icon: Armchair,
  },
  "mobiles-and-laptops": {
    image: mobilesImage,
    icon: Laptop,
  },
  "sports-and-outdoor": {
    image: sportsImage,
    icon: Dumbbell,
  },
  "computer-accessories": {
    image: computerImage,
    icon: Keyboard,
  },
  "home-and-lifestyle": {
    image: lifestyleImage,
    icon: House,
  },
  "wallets-and-eyewear": {
    image: eyewearImage,
    icon: Glasses,
  },
  watches: {
    image: watchesImage,
    icon: Watch,
  },
  "audio-and-tech": {
    image: audioImage,
    icon: Headphones,
  },
  "backpacks-and-bags": {
    image: bagsImage,
    icon: Backpack,
  },
};