import type { ProductInfo } from "../types";

export const info: ProductInfo = {
  route: {
    path: "/tanium",
    component: () => import("./MainView.vue"),
  },
  name: "Tanium™ Mapping",
  description: "Tanium visual mapping experimentation",
  productId: "tanium-mapping",
  menu: {
    name: "Tanium™ Mapping",
    description: "Tanium visual mapping experimentation",
    thumbnail:
      "https://imageio.forbes.com/specials-images/imageserve/66b199ebae7ae7aa53789325/Dan-Streetman-and-Orion-Hindawi-3/0x0.jpg?format=jpg&height=1333&width=2000",
    category: "sandbox",
  },
};

export default info;
