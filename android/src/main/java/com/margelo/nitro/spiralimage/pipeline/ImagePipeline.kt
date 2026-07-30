package com.margelo.nitro.spiralimage.pipeline

import com.margelo.nitro.NitroModules
import com.margelo.nitro.spiralimage.ImageFormat
import com.margelo.nitro.spiralimage.ImageResult
import com.margelo.nitro.spiralimage.ResizeOptions
import com.margelo.nitro.spiralimage.store.ImageStore
import com.margelo.nitro.spiralimage.utils.ExifUtils

object ImagePipeline {

    fun execute(
        options: ResizeOptions
    ): ImageResult {

        val context = requireNotNull(
            NitroModules.applicationContext
        ) {
            "NitroModules.applicationContext is not initialized."
        }

        var bitmap = Decoder.decode(
            options.input
        )

        try {

            bitmap = ExifUtils.fixOrientation(
                bitmap,
                options.input
            )

            bitmap = Resize.execute(
                bitmap,
                options
            )

            val store = ImageStore.prepare(
                context,
                options
            )

            val size = Encoder.encode(
                bitmap = bitmap,
                output = store.cacheFile,
                format = options.format ?: ImageFormat.JPEG,
                quality = (options.quality ?: 90.0).toInt()
            )

            // Backup sang permanent storage
            ImageStore.persist(store)

            return ImageResult(
                id = store.id,
                path = "file://${store.cacheFile.absolutePath}",
                permanentPath = "file://${store.permanentFile.absolutePath}",
                width = bitmap.width.toDouble(),
                height = bitmap.height.toDouble(),
                size = size.toDouble()
            )

        } finally {

            if (!bitmap.isRecycled) {
                bitmap.recycle()
            }

        }
    }
}