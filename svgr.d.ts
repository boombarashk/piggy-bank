declare module "*.svg" {
  import { FC, SVGAttributes /*, SVGProps*/ } from "react";
  const content: FC<SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: unknown;
  export default content;
}
