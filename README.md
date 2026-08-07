# react-native-spiral-image

High-performance native image processing for React Native powered by **Nitro Modules**.

`react-native-spiral-image` provides a fast, lightweight image processing pipeline implemented in **Swift** and **Kotlin**. It supports image resizing, compression, EXIF orientation correction, and local caching while exposing a simple JavaScript API.

## Features

* 🚀 Built with Nitro Modules
* 📷 Native image processing
* 📐 Image resize
* 🗜️ JPEG / PNG / WebP encoding
* 🔄 Automatic EXIF orientation correction
* 💾 Local cache support
* ⚡ High-performance native implementation
* 📱 Compatible with the React Native New Architecture

---

## Installation

Install the library together with Nitro Modules:

```sh
npm install react-native-spiral-image react-native-nitro-modules
```

### iOS

```sh
cd ios
pod install
```

> `react-native-nitro-modules` is required because this library is built on top of Nitro Modules.

---

## Usage

### Process an image

```tsx
import SpiralImage from 'react-native-spiral-image';

const result = await SpiralImage.process({
  path: '/storage/emulated/0/DCIM/image.jpg',

  resize: {
    width: 1080,
    height: 1080,
  },

  output: {
    path: '/storage/emulated/0/Pictures/output.jpg',
    quality: 90,
    format: 'jpeg',
    keepExif: true,
  },
});

console.log(result);
```

---

## Process Options

### ProcessOptions

| Property | Type            | Description          |
| -------- | --------------- | -------------------- |
| path     | `string`        | Original image path  |
| resize   | `ResizeOptions` | Resize configuration |
| output   | `OutputOptions` | Output configuration |

### ResizeOptions

| Property | Type     | Description   |
| -------- | -------- | ------------- |
| width    | `number` | Target width  |
| height   | `number` | Target height |

### OutputOptions

| Property | Type                        | Description               |
| -------- | --------------------------- | ------------------------- |
| path     | `string`                    | Output image path         |
| quality  | `number`                    | JPEG/WebP quality (0-100) |
| format   | `'jpeg' \| 'png' \| 'webp'` | Output format             |
| keepExif | `boolean`                   | Preserve EXIF metadata    |

---

## Image Result

```ts
interface ImageResult {
  id: string;
  path: string;
  permanentPath: string;
  width: number;
  height: number;
  size: number;
}
```

---

## Image Component

The library also provides a native `<Image />` component with automatic image processing and cache support.

```tsx
import { Image } from 'react-native-spiral-image';

<Image
  source={{
    uri: imageUrl,
  }}
  style={{
    width: 200,
    height: 200,
  }}
/>;
```

---

## Roadmap

### Phase 1

* ✅ Native image processing
* ✅ Resize
* ✅ JPEG / PNG / WebP encoding
* ✅ EXIF orientation correction
* ✅ Android
* ✅ iOS
* ✅ Nitro Modules integration

### Phase 2

* 🚧 Smart cache manager
* 🚧 Image preloading
* 🚧 Metadata API
* 🚧 Cache inspection
* 🚧 Disk cache management

### Phase 3

* Crop
* Rotate
* Flip
* Watermark
* Blur
* Thumbnail generation

### Phase 4

* HEIC support
* AVIF support
* Animated WebP
* Progressive decoding
* GPU acceleration

---

## Platform Support

| Platform | Supported |
| -------- | --------- |
| Android  | ✅         |
| iOS      | ✅         |

---

## Contributing

Contributions are welcome.

Please read:

* Development workflow
* Pull request guidelines
* Code of conduct

---

## License

MIT

---

Built with ❤️ using **Nitro Modules**.
