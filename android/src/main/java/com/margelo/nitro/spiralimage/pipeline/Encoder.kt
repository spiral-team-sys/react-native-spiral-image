package com.margelo.nitro.spiralimage.pipeline

import android.graphics.Bitmap
import android.os.Build
import com.margelo.nitro.spiralimage.ImageFormat
import java.io.File
import java.io.FileOutputStream

object Encoder {

    fun encode(
        bitmap: Bitmap,
        output: File,
        format: ImageFormat,
        quality: Int
    ): Double {

        output.parentFile?.mkdirs()

        FileOutputStream(output).use { stream ->

            val compressFormat = when (format) {
                ImageFormat.JPEG ->
                    Bitmap.CompressFormat.JPEG

                ImageFormat.PNG ->
                    Bitmap.CompressFormat.PNG

                ImageFormat.WEBP ->
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                        Bitmap.CompressFormat.WEBP_LOSSY
                    } else {
                        @Suppress("DEPRECATION")
                        Bitmap.CompressFormat.WEBP
                    }
            }

            bitmap.compress(
                compressFormat,
                quality.coerceIn(0, 100),
                stream
            )
        }

        return output.length().toDouble()
    }
}