import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import RNFS from 'react-native-fs';

import { launchImageLibrary } from 'react-native-image-picker';
import SpiralImage, { formatFileSize, Image } from 'react-native-spiral-image';

export default function ImageInspectorScreen() {
  const [asset, setAsset] = useState<any>();
  const [reload, setReload] = useState(0);

  const pickAndResize = async () => {
    try {
      const picker = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      const assetResult = picker.assets?.[0];

      if (!assetResult?.uri) {
        return;
      }
      setAsset(assetResult);
      const output = `${assetResult.uri.replace('.jpg', '_resize.jpg')}`;
      const resizeResult = SpiralImage.resize({
        input: assetResult.uri,
        output,
        width: 1080,
        height: 1920,
        quality: 80,
        format: 'jpeg',
      });

      console.log({
        ...resizeResult,
        fileSize: formatFileSize(resizeResult.size),
      });
    } catch (error) {
      console.error('Resize error:', error);
    }
  };

  const deleteCache = async () => {
    const exists = await RNFS.exists(asset.uri);
    console.log(asset);

    if (!exists) {
      console.log('Cache file not found');
      return;
    }

    await RNFS.unlink(asset.uri);

    console.log('Cache deleted');
  };
  console.log(asset);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Chọn ảnh từ Album" onPress={pickAndResize} />

      {asset && (
        <>
          {reload % 2 === 0 && (
            <Image source={{ uri: asset.uri }} style={styles.image} />
          )}
          <View style={styles.info}>
            <Text>URI:</Text>
            <Text selectable>{asset.uri}</Text>

            <Text>File Name:</Text>
            <Text>{asset.fileName}</Text>

            <Text>Width:</Text>
            <Text>{asset.width}px</Text>

            <Text>Height:</Text>
            <Text>{asset.height}px</Text>

            <Text>File Size:</Text>
            <Text>
              {asset.fileSize
                ? `${(asset.fileSize / 1024 / 1024).toFixed(2)} MB`
                : '-'}
            </Text>

            <Text>Type:</Text>
            <Text>{asset.type}</Text>

            <Button
              title="Delete Cache File"
              onPress={async () => await deleteCache()}
            />
            <Button
              title="Reload"
              onPress={() => {
                setReload((e) => e + 1);
              }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 350,
    marginTop: 20,
    borderRadius: 12,
  },
  info: {
    marginTop: 20,
    gap: 4,
  },
});
