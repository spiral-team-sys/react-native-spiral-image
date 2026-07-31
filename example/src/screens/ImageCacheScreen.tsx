import { useState } from 'react';
import RNFS from 'react-native-fs';
import { launchImageLibrary, type Asset } from 'react-native-image-picker';
import { Image } from 'react-native-spiral-image';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ImageCacheScreen() {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [_originalExists, setOriginalExists] = useState('-');
  const [logs, setLogs] = useState<string[]>([]);
  const [originalInfo, setOriginalInfo] = useState({
    exists: false,
    size: '-',
    modified: '-',
    created: '-',
  });

  // helper
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

  //

  // pick image
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

    setOriginalExists('-');

    addLog('Image selected.');
    addLog(image.uri ?? '-');
  };
  //

  const checkOriginal = async () => {
    if (!asset?.uri) {
      addLog('No image selected.');
      return;
    }

    try {
      const exists = await RNFS.exists(asset.uri);

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

      const stat = await RNFS.stat(asset.uri);

      const info = {
        exists: true,
        size: formatFileSize(Number(stat.size)),
        modified: stat.mtime?.toLocaleString() ?? '-',
        created: stat.ctime?.toLocaleString() ?? '-',
      };

      setOriginalInfo(info);

      addLog('✅ Original Exists');
      addLog(`Size : ${info.size}`);
    } catch (e) {
      addLog(String(e));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Spiral Image Cache Debug</Text>

      {/* Preview */}
      <View style={styles.preview}>
        {asset?.uri ? (
          <Image source={{ uri: asset.uri }} style={styles.image} />
        ) : (
          <Text style={styles.previewText}>No Image Selected</Text>
        )}
      </View>
      {/* Actions */}
      <View style={styles.actions}>
        <Button title="📷 Pick Image" onPress={pickImage} />

        <View style={styles.space} />

        <Button title="🔍 Check Original" onPress={checkOriginal} />

        <View style={styles.space} />

        <Button
          title="🗂 Check Cache"
          onPress={() => addLog('Coming soon...')}
        />

        <View style={styles.space} />

        <Button
          title="🗑 Delete Cache"
          onPress={() => addLog('Coming soon...')}
        />

        <View style={styles.space} />

        <Button
          title="🔄 Reload Image"
          onPress={() => addLog('Coming soon...')}
        />

        <View style={styles.space} />

        <Button title="🧹 Clear Logs" onPress={clearLogs} />
      </View>

      {/* Image Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Image Information</Text>

        <InfoRow label="File Name" value={asset?.fileName ?? '-'} />

        <InfoRow label="Width" value={asset?.width?.toString() ?? '-'} />

        <InfoRow label="Height" value={asset?.height?.toString() ?? '-'} />

        <InfoRow label="File Size" value={formatFileSize(asset?.fileSize)} />

        <InfoRow label="Mime Type" value={asset?.type ?? '-'} />

        <InfoRow label="URI" value={formatPath(asset?.uri)} multiline />
      </View>

      {/* Original */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Original File</Text>

        <InfoRow
          label="Exists"
          value={originalInfo.exists ? '✅ YES' : '❌ NO'}
        />

        <InfoRow label="Size" value={originalInfo.size} />

        <InfoRow label="Modified" value={originalInfo.modified} />

        <InfoRow label="Created" value={originalInfo.created} />

        <InfoRow label="Path" value={formatPath(asset?.uri)} multiline />
      </View>

      {/* Cache */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cache</Text>

        <InfoRow label="Exists" value="-" />
        <InfoRow label="Source" value="-" />
        <InfoRow label="Cache Path" value="-" multiline />
      </View>

      {/* Pipeline */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pipeline</Text>

        <InfoRow label="Status" value="Idle" />
        <InfoRow label="Cache Hit" value="-" />
        <InfoRow label="Load Time" value="-" />
        <InfoRow label="Decode Time" value="-" />
        <InfoRow label="Resize Time" value="-" />
      </View>

      {/* Logs */}
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
