import {
  TextureLoader,
  LoadingManager,
  NearestFilter,
  ColorManagement,
} from "three";

const loadingManager = new LoadingManager();
const textureLoader = new TextureLoader(loadingManager);

const diamondTexture = textureLoader.load("/diamond.png");
const emeraldTexture = textureLoader.load("/emerald.png");
const goldTexture = textureLoader.load("/gold.png");
const ironTexture = textureLoader.load("/iron.png");
const lapisTexture = textureLoader.load("/lapis.png");
const redstoneTexture = textureLoader.load("/redstone.png");
const coalTexture = textureLoader.load("/coal.png");
const copperTexture = textureLoader.load("/copper.png");

copperTexture.magFilter = NearestFilter;
lapisTexture.magFilter = NearestFilter;
redstoneTexture.magFilter = NearestFilter;
coalTexture.magFilter = NearestFilter;
diamondTexture.magFilter = NearestFilter;
emeraldTexture.magFilter = NearestFilter;
goldTexture.magFilter = NearestFilter;
ironTexture.magFilter = NearestFilter;

ColorManagement.enabled = false;

export {
  copperTexture,
  coalTexture,
  ironTexture,
  goldTexture,
  emeraldTexture,
  diamondTexture,
  lapisTexture,
  redstoneTexture,
  loadingManager,
  textureLoader,
};
