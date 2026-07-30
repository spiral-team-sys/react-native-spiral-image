# react-native-spiral-image

High-performance image processing library for React Native powered by Nitro Modules.

`react-native-spiral-image` provides fast native image processing with a simple JavaScript API. It is designed for applications that need efficient image resizing, compression, orientation correction, and local image caching on both Android and iOS.

## Features

* 🚀 Built with Nitro Modules
* 📷 Native image resize
* 🗜️ JPEG/PNG/WebP encoding
* 📐 Keep aspect ratio support
* 🔄 Automatic EXIF orientation correction
* 💾 Local cache and permanent storage
* ⚡ High performance native implementation (Swift + Kotlin)
* 📱 React Native New Architecture compatible

---

## Installation

Install the library together with Nitro Modules:

```sh
npm install react-native-spiral-image react-native-nitro-modules
```

Then install iOS dependencies:

```sh
cd ios
pod install
```

> **Note**
>
> `react-native-nitro-modules` is required because this library is built on top of Nitro Modules.

---

## Usage

```tsx
import { SpiralImage } from 'react-native-spiral-image';

const result = SpiralImage.resize({
  input: '/path/to/input.jpg',
  output: '',
  width: 1080,
  quality: 80,
  format: 'jpeg',
  keepAspectRatio: true,
});

console.log(result);
```

### Resize Options

| Property        | Type                        | Description                    |
| --------------- | --------------------------- | ------------------------------ |
| input           | string                      | Input image path               |
| output          | string                      | Output directory or file path  |
| width           | number                      | Target width                   |
| height          | number                      | Target height                  |
| quality         | number                      | JPEG/WebP quality (0-100)      |
| format          | `'jpeg' \| 'png' \| 'webp'` | Output image format            |
| keepAspectRatio | boolean                     | Preserve original aspect ratio |

### Image Result

```ts
{
  id: string;
  path: string;
  permanentPath: string;
  width: number;
  height: number;
  size: number;
}
```

---

## Roadmap

### Phase 1

* ✅ Resize image
* ✅ Compress image
* ✅ JPEG / PNG / WebP support
* ✅ EXIF orientation correction
* ✅ Cache & permanent storage
* ✅ Android
* ✅ iOS

### Phase 2

* 🚧 `<Image />` component
* 🚧 Image preload
* 🚧 Cache manager
* 🚧 Metadata API

### Phase 3

* Crop
* Rotate
* Watermark
* Thumbnail generation
* Blur
* Progressive image loading

### Phase 4

* HEIC support
* AVIF support
* Animated WebP
* GPU accelerated image processing

---

## Platform Support

| Platform | Status |
| -------- | ------ |
| Android  | ✅      |
| iOS      | ✅      |

---

## Contributing

Contributions are welcome.

Please read:

* [Development workflow](CONTRIBUTING.md#development-workflow)
* [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
* [Code of conduct](CODE_OF_CONDUCT.md)

---

## License

MIT

---

Built with ❤️ using **Nitro Modules** and **create-react-native-library**.
