# react-native-spiral-image

High-performance native image processing for React Native powered by Nitro Modules.

This package exposes a native `SpiralImage` hybrid object for processing local images and a React Native `Image` wrapper that resolves sources through the library cache/pipeline.

## Features

- 🚀 Built with Nitro Modules
- 📷 Native image processing
- 📐 Resize support
- 🗜️ JPEG / PNG / WebP output
- 🔄 EXIF preservation support
- 💾 Cache-aware image resolution
- ⚡ Works with the React Native New Architecture

---

## Installation

Install the package together with Nitro Modules:

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

## API

### Default export

```ts
import SpiralImage from 'react-native-spiral-image';
```

The default export is the Nitro hybrid object created from the native module:

```ts
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
```

### Process options

```ts
interface ProcessOptions {
  path: string;
  resize?: {
    width?: number;
    height?: number;
  };
  output?: {
    path: string;
    quality?: number;
    format?: 'jpeg' | 'png' | 'webp';
    keepExif?: boolean;
  };
}
```

#### `ResizeOptions`

| Property | Type     | Description |
| -------- | -------- | ----------- |
| width    | `number` | Target width |
| height   | `number` | Target height |

#### `OutputOptions`

| Property | Type | Description |
| -------- | ---- | ----------- |
| path | `string` | Output file path |
| quality | `number` | JPEG/WebP quality, usually `0-100` |
| format | `'jpeg' \| 'png' \| 'webp'` | Output format |
| keepExif | `boolean` | Preserve EXIF metadata |

### Result

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

## Example: process an image

```tsx
import SpiralImage from 'react-native-spiral-image';

async function processImage() {
  const result = await SpiralImage.process({
    path: '/storage/emulated/0/DCIM/sample.jpg',
    resize: {
      width: 1200,
      height: 1200,
    },
    output: {
      path: '/storage/emulated/0/Pictures/sample-processed.jpg',
      quality: 85,
      format: 'jpeg',
      keepExif: true,
    },
  });

  console.log('processed:', result);
}
```

---

## Image component

The package also exports a React Native `Image` wrapper that resolves the source through the internal cache/pipeline.

```tsx
import { Image } from 'react-native-spiral-image';

export function Example() {
  return (
    <Image
      source={{ uri: 'https://example.com/image.jpg' }}
      style={{ width: 200, height: 200 }}
    />
  );
}
```

This component accepts standard React Native image props and uses the library's internal `useSpiralImage` + cache manager flow.

---

## Cache and pipeline helpers

The package exports cache and pipeline utilities from the top-level index, including:

```ts
import {
  CacheManager,
  ImagePipeline,
  NativePipeline,
  SpiralImage,
} from 'react-native-spiral-image';
```

These helpers are used internally to resolve, cache, and process image sources.

---

## Platform support

| Platform | Supported |
| -------- | --------- |
| Android | ✅ |
| iOS | ✅ |

---

## Notes

The library is actively evolving. Some advanced pipeline features such as crop, rotate, blur, preloading, and metadata inspection are planned but not yet fully implemented in the current source tree.

---

## License

MIT

---

Built with ❤️ using Nitro Modules.
