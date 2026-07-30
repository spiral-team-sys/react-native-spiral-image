package com.margelo.nitro.spiralimage.model

import com.margelo.nitro.spiralimage.model.ImageFormat

data class ResizeOptions(
    val input: String,
    val output: String,
    val width: Int? = null,
    val height: Int? = null,
    val quality: Int = 90,
    val format: ImageFormat = ImageFormat.JPEG,
    val keepAspectRatio: Boolean = true
)