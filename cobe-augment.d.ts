/** cobe supports onRender at runtime; package typings omit it (see createGlobe usage). */
import "cobe";

declare module "cobe" {
  interface COBEOptions {
    onRender?: (state: {
      phi: number;
      width: number;
      height: number;
    }) => void;
  }
}
