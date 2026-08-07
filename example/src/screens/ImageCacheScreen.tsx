import { useState } from 'react';
import RNFS from 'react-native-fs';
import { launchImageLibrary, type Asset } from 'react-native-image-picker';

import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import SpiralImage, { Image } from 'react-native-spiral-image';

export default function ImageCacheScreen() {
  const [asset, setAsset] = useState<Asset | null>(null);

  const [displayUri, setDisplayUri] = useState<string>();

  const [logs, setLogs] = useState<string[]>([]);

  const [processedResult, setProcessedResult] = useState<any>(null);

  const [originalInfo, setOriginalInfo] = useState({
    exists: false,
    size: '-',
    modified: '-',
    created: '-',
  });

  const [cacheInfo, setCacheInfo] = useState({
    exists: false,
    path: '-',
    size: '-',
  });

  const [pipelineInfo, setPipelineInfo] = useState({
    status: 'Idle',
    cacheHit: '-',
    loadTime: '-',
    decodeTime: '-',
    resizeTime: '-',
  });

  const addLog = (message: string) => {
    const now = new Date();

    const time =
      now.getHours().toString().padStart(2, '0') +
      ':' +
      now.getMinutes().toString().padStart(2, '0') +
      ':' +
      now.getSeconds().toString().padStart(2, '0');

    setLogs((prev) => [`[${time}] ${message}`, ...prev]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const formatFileSize = (size?: number) => {
    if (!size) {
      return '-';
    }

    const units = ['B', 'KB', 'MB', 'GB'];

    let value = size;
    let index = 0;

    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index++;
    }

    return `${value.toFixed(2)} ${units[index]}`;
  };

  const formatPath = (path?: string) => {
    if (!path) {
      return '-';
    }

    return path.replace('file://', '');
  };

  const normalizeFsPath = (path?: string) => {
    if (!path) {
      return '';
    }

    return path.replace('file://', '');
  };

  const toFileUri = (path?: string) => {
    if (!path) {
      return undefined;
    }

    return path.startsWith('file://') ? path : `file://${path}`;
  };

  //
  // Pick
  //
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeExtra: true,
    });

    if (result.didCancel) {
      addLog('User cancelled.');
      return;
    }

    if (result.errorCode) {
      addLog(result.errorMessage ?? 'Unknown error');
      return;
    }

    const image = result.assets?.[0];

    if (!image) {
      return;
    }

    setAsset(image);

    setDisplayUri(image.uri);

    addLog('Image selected.');
    addLog(image.uri ?? '-');
  };

  const downloadOnlineImage = async () => {
    try {
      const url = 'https://picsum.photos/1536/2048';

      const localPath = `${RNFS.CachesDirectoryPath}/online-${Date.now()}.jpg`;

      addLog('⬇️ Downloading image...');

      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: localPath,
      }).promise;

      if (result.statusCode !== 200) {
        addLog(`❌ Download failed (${result.statusCode})`);
        return;
      }

      const stat = await RNFS.stat(localPath);

      const image: Asset = {
        uri: `file://${localPath}`,
        fileName: localPath.split('/').pop(),
        width: 1536,
        height: 2048,
        fileSize: Number(stat.size),
        type: 'image/jpeg',
      };

      setAsset(image);
      setDisplayUri(image.uri);

      addLog('✅ Online image downloaded');
      addLog(image.uri ?? '-');
    } catch (e) {
      addLog(String(e));
    }
  };

  //
  // Original
  //
  const checkOriginal = async () => {
    if (!asset?.uri) {
      addLog('No image selected.');
      return;
    }

    try {
      const originalPath = normalizeFsPath(asset.uri);

      const exists = await RNFS.exists(originalPath);

      if (!exists) {
        setOriginalInfo({
          exists: false,
          size: '-',
          modified: '-',
          created: '-',
        });

        addLog('❌ Original not found');

        return;
      }

      const stat = await RNFS.stat(originalPath);

      setOriginalInfo({
        exists: true,
        size: formatFileSize(Number(stat.size)),
        modified: stat.mtime?.toLocaleString() ?? '-',
        created: stat.ctime?.toLocaleString() ?? '-',
      });

      addLog('✅ Original Exists');
    } catch (e) {
      addLog(String(e));
    }
  };

  //
  // Nitro Process
  //
  const processImage = async () => {
    if (!asset?.uri) {
      addLog('No image selected');

      return;
    }

    try {
      setPipelineInfo({
        status: 'Processing',
        cacheHit: 'NO',
        loadTime: '-',
        decodeTime: '-',
        resizeTime: '-',
      });

      const start = Date.now();

      const sourcePath = normalizeFsPath(asset.uri);
      const outputPath = `${RNFS.CachesDirectoryPath}/spiral-image/debug-${Date.now()}.jpg`;

      const result = await SpiralImage.process({
        path: sourcePath,
        resize: {
          width: asset.width,
          height: asset.height,
        },
        output: {
          path: outputPath,
          quality: 90,
          format: 'jpeg',
          keepExif: true,
        },
      });

      const time = Date.now() - start;

      setProcessedResult(result);

      setDisplayUri(toFileUri(result.path));

      addLog('✅ Process success');

      addLog(JSON.stringify(result, null, 2));

      setPipelineInfo({
        status: 'Completed',

        cacheHit: 'NO',

        loadTime: `${time} ms`,

        decodeTime: 'native',

        resizeTime: 'native',
      });

      setCacheInfo({
        exists: true,

        path: result.path,

        size: formatFileSize(result.size),
      });
    } catch (e) {
      addLog('❌ ' + String(e));

      setPipelineInfo((prev) => ({
        ...prev,
        status: 'Error',
      }));
    }
  };
  //
  // Cache
  //
  const checkCache = async () => {
    const path = normalizeFsPath(processedResult?.path);

    if (!path) {
      addLog('No processed image');

      return;
    }

    try {
      const exists = await RNFS.exists(path);

      const stat = exists ? await RNFS.stat(path) : null;

      setCacheInfo({
        exists,

        path,

        size: stat ? formatFileSize(Number(stat.size)) : '-',
      });

      addLog(exists ? '✅ Cache Exists' : '❌ Cache Missing');
    } catch (e) {
      addLog(String(e));
    }
  };

  const deleteCache = async () => {
    const path = normalizeFsPath(processedResult?.path);

    if (!path) {
      addLog('No cache');

      return;
    }

    try {
      if (await RNFS.exists(path)) {
        await RNFS.unlink(path);
      }

      setCacheInfo({
        exists: false,

        path,

        size: '-',
      });

      addLog('🗑 Cache deleted');
    } catch (e) {
      addLog(String(e));
    }
  };

  const reloadImage = async () => {
    const path = normalizeFsPath(processedResult?.path);

    if (!path) {
      addLog('No processed cache');

      return;
    }

    try {
      if (!(await RNFS.exists(path))) {
        addLog('❌ Cache empty');

        return;
      }

      setDisplayUri(toFileUri(path));

      addLog('🔄 Reload from cache');
    } catch (e) {
      addLog(String(e));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Spiral Image Cache Debug</Text>

      <View style={styles.preview}>
        {displayUri ? (
          <Image source={{ uri: displayUri }} style={styles.image} />
        ) : (
          <Text style={styles.previewText}>No Image Selected</Text>
        )}
      </View>

      <View style={styles.actions}>
        <Button title="🌐 Download Image" onPress={downloadOnlineImage} />

        <View style={styles.space} />
        <Button title="📷 Pick Image" onPress={pickImage} />

        <View style={styles.space} />

        <Button title="🔍 Check Original" onPress={checkOriginal} />

        <View style={styles.space} />

        <Button title="⚡ Process Image" onPress={processImage} />

        <View style={styles.space} />

        <Button title="🗂 Check Cache" onPress={checkCache} />

        <View style={styles.space} />

        <Button title="🗑 Delete Cache" onPress={deleteCache} />

        <View style={styles.space} />

        <Button title="🔄 Reload Image" onPress={reloadImage} />

        <View style={styles.space} />

        <Button title="🧹 Clear Logs" onPress={clearLogs} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Image Information</Text>

        <InfoRow label="File Name" value={asset?.fileName ?? '-'} />

        <InfoRow label="Width" value={asset?.width?.toString() ?? '-'} />

        <InfoRow label="Height" value={asset?.height?.toString() ?? '-'} />

        <InfoRow label="Size" value={formatFileSize(asset?.fileSize)} />

        <InfoRow label="Mime" value={asset?.type ?? '-'} />

        <InfoRow label="URI" value={formatPath(asset?.uri)} multiline />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Original File</Text>

        <InfoRow
          label="Exists"
          value={originalInfo.exists ? '✅ YES' : '❌ NO'}
        />

        <InfoRow label="Size" value={originalInfo.size} />

        <InfoRow label="Modified" value={originalInfo.modified} />

        <InfoRow label="Created" value={originalInfo.created} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cache</Text>

        <InfoRow label="Exists" value={cacheInfo.exists ? '✅ YES' : '❌ NO'} />

        <InfoRow label="Size" value={cacheInfo.size} />

        <InfoRow label="Path" value={formatPath(cacheInfo.path)} multiline />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Processed Result</Text>

        <InfoRow label="ID" value={processedResult?.id ?? '-'} />

        <InfoRow
          label="Path"
          value={formatPath(processedResult?.path)}
          multiline
        />

        <InfoRow
          label="Permanent Path"
          value={formatPath(processedResult?.permanentPath)}
          multiline
        />

        <InfoRow label="Width" value={String(processedResult?.width ?? '-')} />

        <InfoRow
          label="Height"
          value={String(processedResult?.height ?? '-')}
        />

        <InfoRow label="Size" value={formatFileSize(processedResult?.size)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pipeline</Text>

        <InfoRow label="Status" value={pipelineInfo.status} />

        <InfoRow label="Cache Hit" value={pipelineInfo.cacheHit} />

        <InfoRow label="Load Time" value={pipelineInfo.loadTime} />

        <InfoRow label="Decode Time" value={pipelineInfo.decodeTime} />

        <InfoRow label="Resize Time" value={pipelineInfo.resizeTime} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Logs</Text>

        <View style={styles.logBox}>
          {logs.length === 0 ? (
            <Text style={styles.log}>Ready...</Text>
          ) : (
            logs.map((item, index) => (
              <Text key={index} style={styles.log}>
                {item}
              </Text>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text selectable numberOfLines={multiline ? 0 : 1} style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },

  preview: {
    height: 260,
    borderRadius: 12,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  previewText: {
    color: '#666',
  },

  actions: {
    marginBottom: 20,
  },

  space: {
    height: 10,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  row: {
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },

  value: {
    fontSize: 14,
    color: '#222',
  },

  logBox: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 12,
    minHeight: 150,
  },

  log: {
    color: '#00FF66',
    fontSize: 12,
    fontFamily: 'Courier',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
