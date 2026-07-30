package com.margelo.nitro.spiralimage.store

import android.content.Context
import java.io.File

object CacheManager {

    private const val DIRECTORY = "spiral-image"

    fun directory(
        context: Context
    ): File {

        val dir = File(
            context.cacheDir,
            DIRECTORY
        )

        if (!dir.exists()) {
            dir.mkdirs()
        }

        return dir
    }

    fun createFile(
        context: Context,
        imageId: String,
        extension: String
    ): File {

        return File(
            directory(context),
            "$imageId.$extension"
        )
    }
}