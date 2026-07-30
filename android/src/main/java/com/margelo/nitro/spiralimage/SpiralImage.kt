package com.margelo.nitro.spiralimage

import com.facebook.proguard.annotations.DoNotStrip
import com.margelo.nitro.spiralimage.pipeline.ImagePipeline

@DoNotStrip
class SpiralImage : HybridSpiralImageSpec() {

    override fun resize(
        options: ResizeOptions
    ): ImageResult {
        return ImagePipeline.execute(options)
    }
}