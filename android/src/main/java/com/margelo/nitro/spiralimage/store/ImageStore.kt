package com.margelo.nitro.spiralimage.store

import android.content.Context
import com.margelo.nitro.spiralimage.ImageFormat
import com.margelo.nitro.spiralimage.ResizeOptions

import java.io.File

data class ImageStoreResult(
    val id: String,
    val cacheFile: File,
    val permanentFile: File
)

object ImageStore {

    fun prepare(
        context: Context,
        options: ResizeOptions
    ): ImageStoreResult {

        val id = ImageIdGenerator.generate()

        val format = options.format ?: ImageFormat.JPEG

        val extension = when (format) {
            ImageFormat.JPEG -> "jpg"
            ImageFormat.PNG -> "png"
            ImageFormat.WEBP -> "webp"
        }

        return ImageStoreResult(
            id = id,

            cacheFile = CacheManager.createFile(
                context = context,
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