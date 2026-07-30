package com.margelo.nitro.spiralimage.pipeline

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import java.io.File

object Decoder {

    fun decode(
        path: String
    ): Bitmap {

        val realPath = when {
            path.startsWith("file://") -> {
                path.removePrefix("file://")
            }

            else -> path
        }

        val file = File(realPath)

        if (!file.exists()) {
            throw IllegalArgumentException(
                "Image does not exist: $path"
            )
        }

        return BitmapFactory.decodeFile(
            file.absolutePath
        ) ?: throw IllegalArgumentException(
            "Cannot decode image: $path"
        )
    }
}