package com.margelo.nitro.spiralimage.store

import android.content.Context
import com.margelo.nitro.spiralimage.ImageFormat
import com.margelo.nitro.spiralimage.ProcessOptions
import java.io.File

data class ImageStoreResult(
    val id: String,
    val cacheFile: File,
    val permanentFile: File
)

object ImageStore {

    fun prepare(
        context: Context,
        options: ProcessOptions
    ): ImageStoreResult {

        val id = ImageIdGenerator.generate(options.path)

        val format = options.output?.format ?: ImageFormat.JPEG

        val extension = when (format) {
            ImageFormat.JPEG -> "jpg"
            ImageFormat.PNG -> "png"
            ImageFormat.WEBP -> "webp"
        }

        return ImageStoreResult(
            id = id,

            cacheFile = CacheManager.createFile(
                cacheDir = context.cacheDir,
                imageId = id,
                extension = extension
            ),

            permanentFile = FileManager.createResizeFile(
                context = context,
                imageId = id,
                extension = extension
            )
        )
    }

    fun persist(
        result: ImageStoreResult
    ) {
        result.cacheFile.copyTo(
            target = result.permanentFile,
            overwrite = true
        )
    }
}