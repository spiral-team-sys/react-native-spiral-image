package com.margelo.nitro.spiralimage.pipeline

import com.margelo.nitro.spiralimage.*
import com.margelo.nitro.spiralimage.store.CacheManager
import com.margelo.nitro.spiralimage.store.ImageIdGenerator
import java.io.File

object ImagePipeline {

    fun process(
        cacheDir: File,
        options: ProcessOptions
    ): ImageResult {

        val start = System.currentTimeMillis()

        val inputPath =
            options.path.removePrefix("file://")

        val id =
            ImageIdGenerator.generate(inputPath)

        val outputConfig =
            options.output

        val resizeConfig =
            options.resize

        val extension = when (outputConfig?.format) {
            ImageFormat.PNG -> "png"
            ImageFormat.WEBP -> "webp"
            else -> "jpg"
        }

        val outputFile =
            outputConfig?.path
                ?.let { File(it.removePrefix("file://")) }
                ?: CacheManager.createFile(
                    cacheDir,
                    id,
                    extension
                )

        val bitmap =
            Decoder.decode(inputPath)

        val resized =
            Resize.execute(
                bitmap,
                resizeConfig?.width?.toInt(),
                resizeConfig?.height?.toInt()
            )

        val size =
            Encoder.encode(
                resized,
                outputFile,
                outputConfig?.format ?: ImageFormat.JPEG,
                outputConfig?.quality?.toInt() ?: 90
            )

        if (bitmap !== resized) {
            bitmap.recycle()
        }
        resized.recycle()

        val _elapsed = System.currentTimeMillis() - start

        return ImageResult(
            id = id,
            path = outputFile.absolutePath,
            permanentPath = outputFile.absolutePath,
            width = resized.width.toDouble(),
            height = resized.height.toDouble(),
            size = size
        )
    }
}