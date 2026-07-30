package com.margelo.nitro.spiralimage.store

import android.content.Context
import java.io.File

object FileManager {

    private const val ROOT = "spiral-image"

    fun root(
        context: Context
    ): File {

        val dir = File(
            context.filesDir,
            ROOT
        )

        if (!dir.exists()) {
            dir.mkdirs()
        }

        return dir
    }

    fun resizedDirectory(
        context: Context
    ): File {

        val dir = File(
            root(context),
            "resized"
        )

        if (!dir.exists()) {
            dir.mkdirs()
        }

        return dir
    }

    fun createResizeFile(
        context: Context,
        imageId: String,
        extension: String
    ): File {

        return File(
            resizedDirectory(context),
            "$imageId.$extension"
        )
    }
}