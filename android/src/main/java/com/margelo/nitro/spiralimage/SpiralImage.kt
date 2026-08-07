package com.margelo.nitro.spiralimage

import com.facebook.proguard.annotations.DoNotStrip
import com.margelo.nitro.core.Promise
import com.margelo.nitro.spiralimage.pipeline.ImagePipeline
import java.io.File

@DoNotStrip
class SpiralImage : HybridSpiralImageSpec() {

    override fun process(
        options: ProcessOptions
    ): Promise<ImageResult> {

        return Promise.async {

            val outputPath =
                options.output?.path
                    ?: throw IllegalArgumentException("output.path is required")

            val cacheDir =
                File(outputPath).parentFile
                    ?: throw IllegalArgumentException("Invalid output.path")

            ImagePipeline.process(
                cacheDir,
                options
            )
        }
    }
}