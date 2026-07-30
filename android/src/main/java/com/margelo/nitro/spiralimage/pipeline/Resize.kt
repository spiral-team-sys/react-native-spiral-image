package com.margelo.nitro.spiralimage.pipeline

import android.graphics.Bitmap
import kotlin.math.min
import kotlin.math.roundToInt

object Resize {

    fun execute(
        bitmap: Bitmap,
        options: com.margelo.nitro.spiralimage.ResizeOptions
    ): Bitmap {

        val srcWidth = bitmap.width
        val srcHeight = bitmap.height

        val targetWidth = options.width?.toInt()
        val targetHeight = options.height?.toInt()

        // Không resize
        if (targetWidth == null && targetHeight == null) {
            return bitmap
        }

        val (newWidth, newHeight) = when {

            // Chỉ truyền width
            targetWidth != null && targetHeight == null -> {
                val scale = targetWidth.toFloat() / srcWidth
                Pair(
                    targetWidth,
                    (srcHeight * scale).roundToInt()
                )
            }

            // Chỉ truyền height
            targetWidth == null && targetHeight != null -> {
                val scale = targetHeight.toFloat() / srcHeight
                Pair(
                    (srcWidth * scale).roundToInt(),
                    targetHeight
                )
            }

            // Có cả width và height -> giữ aspect ratio (contain)
            else -> {
                val scaleX = targetWidth!!.toFloat() / srcWidth
                val scaleY = targetHeight!!.toFloat() / srcHeight
                val scale = min(scaleX, scaleY)

                Pair(
                    (srcWidth * scale).roundToInt(),
                    (srcHeight * scale).roundToInt()
                )
            }
        }

        if (
            newWidth == srcWidth &&
            newHeight == srcHeight
        ) {
            return bitmap
        }

        return Bitmap.createScaledBitmap(
            bitmap,
            newWidth,
            newHeight,
            true
        )
    }
}