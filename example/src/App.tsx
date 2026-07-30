import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import SpiralImage, { formatFileSize } from 'react-native-spiral-image';

export default function App() {
  const [originalUri, setOriginalUri] = useState<string>();
  const [resizeUri, setResizeUri] = useState<string>();
  const [result, setResult] = useState<any>();

  const pickAndResize = async () => {
    try {
      const picker = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      const asset = picker.assets?.[0];

      if (!asset?.uri) {
        return;
      }

      setOriginalUri(asset.uri);

      const output = `${asset.uri.replace('.jpg', '_resize.jpg')}`;

      console.log('Input:', asset.uri);
      console.log('Output:', output);

      const resizeResult = SpiralImage.resize({
        input: asset.uri,
        output,
        width: 1080,
        height: 1920,
        quality: 80,
        format: 'jpeg',
      });

      console.log('Resize result:', resizeResult);

      setResizeUri(`file://${resizeResult.path}`);
      setResult({
        ...resizeResult,
        fileSize: formatFileSize(resizeResult.size),
      });
    } catch (error) {
      console.error('Resize error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick & Resize Image" onPress={pickAndResize} />

      {result && (
        <View>
          <Text>
            Size: {result.width} x {result.height}
          </Text>

          <Text>File: {result.fileSize}</Text>
        </View>
      )}

      {originalUri && (
        <>
          <Text>Original</Text>

          <Image source={{ uri: originalUri }} style={styles.image} />
        </>
      )}

      {resizeUri && (
        <>
          <Text>Resize</Text>

          <Image source={{ uri: resizeUri }} style={styles.image} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 12,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
