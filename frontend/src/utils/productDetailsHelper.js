import { Box, Cable, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export const getProductHighlights = (product) => {
  const name = (product?.name || "").toLowerCase();
  const category = (product?.category?.name || "").toLowerCase();

  if (category.includes("electronics") || category.includes("tech") || name.includes("wireless") || name.includes("phone") || name.includes("headphone") || name.includes("laptop")) {
    return [
      `High-performance ${product?.name || "device"} with precision engineering`,
      "Extended battery life with intelligent power management",
      "Seamless wireless connectivity & instant multi-device pairing",
      "Ergonomic lightweight design built for all-day comfort",
      "Official 1-year brand warranty & dedicated customer support",
    ];
  }

  if (category.includes("furniture") || category.includes("home") || name.includes("chair") || name.includes("table")) {
    return [
      `Crafted with high-grade premium materials for ${product?.name || "your home"}`,
      "Ergonomic design providing maximum structural support & comfort",
      "Scratch-resistant, water-repellent, and easy-to-clean surface",
      "Hassle-free assembly with included step-by-step guide & tools",
      "Multi-year structural warranty & quality assurance guarantee",
    ];
  }

  if (category.includes("bag") || category.includes("apparel") || category.includes("fashion") || name.includes("backpack") || name.includes("shoes")) {
    return [
      `Premium grade material with reinforced double-line stitching`,
      "Lightweight, breathable, and designed for versatile daily use",
      "Water-resistant exterior keeping your belongings safe",
      "Multiple organized compartments for maximum utility",
      "100% authentic original product with brand authenticity tag",
    ];
  }

  return [
    `Premium build quality crafted with durable top-tier materials`,
    "Ergonomically designed for comfort, utility, and modern aesthetic",
    "Rigorously tested for long-lasting durability and reliability",
    "Includes all essential accessories and user instructions in the box",
    "Comprehensive 1-year manufacturer warranty & customer support",
  ];
};

export const getProductSpecifications = (product) => {
  const nameParts = (product?.name || "ShopEase Product").split(" ");
  const brand = nameParts[0] || product?.category?.name || "ShopEase";
  const model = nameParts.slice(1).join(" ") || `SE-${product?.id || 101}`;

  return [
    { label: "Brand", value: brand },
    { label: "Model / Item", value: model },
    { label: "Category", value: product?.category?.name || "General Goods" },
    { label: "Condition", value: "Brand New (Original Factory Sealed)" },
    { label: "SKU Code", value: `SE-PRD-${String(product?.id || "001").padStart(4, "0")}` },
    { label: "Availability", value: product?.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock" },
    { label: "Warranty", value: "1 Year Official Brand Warranty" },
    { label: "Return Policy", value: "7 Days Easy Replacement Guarantee" },
  ];
};

export const getInTheBoxItems = (product) => {
  const category = (product?.category?.name || "").toLowerCase();
  const isTech = category.includes("electronics") || category.includes("tech") || category.includes("audio");

  return [
    {
      name: product?.name || "Main Product Unit",
      subtext: "(1x Unit)",
      icon: Box,
    },
    {
      name: isTech ? "Charging Cable" : "Accessory Kit",
      subtext: isTech ? "USB-C Fast Cable" : "Standard Accessories",
      icon: isTech ? Cable : Box,
    },
    {
      name: "User Manual",
      subtext: "& Quick Start Guide",
      icon: FileText,
    },
    {
      name: "Warranty Card",
      subtext: "1 Year Certificate",
      icon: ShieldCheck,
    },
  ];
};

export const getSampleReviews = (product) => {
  const productName = product?.name || "product";

  return [
    {
      id: 1,
      name: "Rahul Mehta",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "2 days ago",
      comment: `Absolutely worth the purchase! The build quality of this ${productName} is top-notch and it works exactly as described. Fast shipping too.`,
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "5 days ago",
      comment: `Exceeded my expectations! The ${productName} feels very premium, sturdy, and well-designed. Highly recommend!`,
    },
    {
      id: 3,
      name: "Aman Verma",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "1 week ago",
      comment: `Great value for money. Super happy with the overall performance and quality of this product.`,
    },
  ];
};
