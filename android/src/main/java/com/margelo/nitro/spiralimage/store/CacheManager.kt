package com.margelo.nitro.spiralimage.store
 
import java.io.File


object CacheManager {

    fun directory(
        cacheDir: File
    ): File {

        val dir = File(cacheDir, "spiral-image")

        if (!dir.exists()) {
            dir.mkdirs()
        }

        return dir
    }

    fun createFile(
        cacheDir: File,
        imageId: String,
        extension: String
    ): File {

        return File(
            directory(cacheDir),
            "$imageId.$extension"
        )
    }
}